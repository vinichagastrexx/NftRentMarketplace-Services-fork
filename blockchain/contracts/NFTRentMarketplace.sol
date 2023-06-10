// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTRentMarketplace is VRFConsumerBaseV2, ConfirmedOwner, IERC721Receiver {
  //MarketVolumeFactorUpdater
  address internal marketVolumeFactorUpdaterContract;

  //PriceFeed
  AggregatorV3Interface internal dataFeed;

  //VRF Settings
  VRFCoordinatorV2Interface public vrfCoordinator;
  uint64 private vrfSubscriptionId;
  bytes32 internal vrfkeyHash;
  uint32 private vrfCallbackGasLimit = 500000;
  uint16 private vrfRequestConfirmations = 3;
  uint32 private vrfNumWordsRequested = 10;

  //VRF Events
  event vrfRequestSent(uint256 requestId, uint32 numWords);
  event vrfRequestFulfilled(uint256 requestId);

  //VRF Data
  struct vrfRequestStatus {
    bool exists;
    bool fulfilled;
    uint256 requestId;
  }
  uint256[] public randomNumberList;
  mapping(uint256 => vrfRequestStatus) public randomNumberRequests;

  //Marketplace
  using Counters for Counters.Counter;
  using SafeMath for uint256;
  Counters.Counter private _itemIds;
  Counters.Counter private _rentsIds;
  uint256 public marketVolumeFactor = 1 * 10 ** 18;

  struct Item {
    uint256 id;
    uint256 nftId;
    bool isRented;
    uint256 categoryId;
    address payable owner;
    address rentee;
    bool isInPool;
  }

  struct Pool {
    uint256 categoryId;
    bool isActive;
    uint256 basePrice;
    uint256[] availableItems;
    uint256[] rentedItems;
  }

  struct Rent {
    uint256 id;
    uint256 initDate;
    uint256 expirationDate;
    uint256 finishDate;
    uint256 price;
    address owner;
    address rentee;
    uint256 poolId;
    uint256 randomNumber;
    uint256 itemNftId;
    RentStatus status;
  }

  enum RentStatus {
    ACTIVE,
    FINISHED
  }

  //Mappings
  mapping(uint256 => Pool) private pools;
  mapping(uint256 => Item) private items;
  mapping(uint256 => Rent) public rents;
  mapping(uint256 => uint256) private nftIdToItemId;

  //Rent Events
  event RentStarted(
    uint256 indexed rentId,
    uint256 poolId,
    address rentee,
    uint256 itemNftId,
    uint256 initDate,
    uint256 expirationDate,
    uint256 price,
    address owner
  );
  event RentFinished(uint256 indexed rentId, uint256 finishDate);

  //Pool Events
  event PoolEnabled(uint256 poolId);
  event PoolDisabled(uint256 poolId);
  event PoolCreated(uint256 indexed poolId, uint256 basePrice);

  //Item Events
  event ItemAddedToPool(uint256 indexed nftId, uint256 poolId);
  event ItemRemovedFromPool(uint256 indexed itemId, uint256 poolId);
  event ItemCreated(uint256 indexed nftId, uint256 categoryId, address owner);
  address public nftContractAddress;

  constructor(
    uint64 _vrfSubscriptionId,
    address _vrfCoordinator,
    bytes32 _vrfkeyHash,
    address _nftContractAddress,
    address _dataFeed
  ) VRFConsumerBaseV2(_vrfCoordinator) ConfirmedOwner(msg.sender) {
    vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
    vrfSubscriptionId = _vrfSubscriptionId;
    vrfkeyHash = _vrfkeyHash;
    nftContractAddress = _nftContractAddress;
    dataFeed = AggregatorV3Interface(_dataFeed);
  }

  modifier onlyNftOwner(uint256 _itemNftId) {
    ERC721 erc721 = ERC721(nftContractAddress);
    require(msg.sender == erc721.ownerOf(_itemNftId), "Only the NFT owner can perform this operation");
    _;
  }

  modifier onlyItemOwnerOrContractOwner(uint256 _itemNftId) {
    uint256 itemId = nftIdToItemId[_itemNftId];
    Item storage item = items[itemId];
    require(
      msg.sender == item.owner || msg.sender == owner(),
      "Only the item owner or the contract owner can perform this operation"
    );
    _;
  }

  modifier onlyRenteeOrContractOwner(uint256 rentId) {
    Rent storage rent = rents[rentId];
    require(
      msg.sender == rent.rentee || msg.sender == owner(),
      "Only the Rentee or the contract owner can perform this operation"
    );
    _;
  }

  modifier onlyMarketVolumeUpdaterOrOwner() {
    require(
      msg.sender == marketVolumeFactorUpdaterContract || msg.sender == owner(),
      "Only the market volume factor updater or the owner can update the contract"
    );
    _;
  }

  function setMarketVolumeFactorUpdaterContract(address _marketVolumeFactorUpdaterContract) public onlyOwner {
    marketVolumeFactorUpdaterContract = _marketVolumeFactorUpdaterContract;
  }

  function getLatestPrice() public view returns (int, uint8) {
    (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) = dataFeed
      .latestRoundData();
    uint8 decimal = dataFeed.decimals();
    return (answer, decimal);
  }

  function fillRandomNumberList() public onlyOwner {
    uint256 requestId = vrfCoordinator.requestRandomWords(
      vrfkeyHash,
      vrfSubscriptionId,
      vrfRequestConfirmations,
      vrfCallbackGasLimit,
      vrfNumWordsRequested
    );
    randomNumberRequests[requestId] = vrfRequestStatus({exists: true, fulfilled: false, requestId: requestId});
    emit vrfRequestSent(requestId, vrfNumWordsRequested);
  }

  function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
    require(randomNumberRequests[_requestId].exists, "request not found");
    for (uint256 i = 0; i < _randomWords.length; i++) {
      randomNumberList.push(_randomWords[i]);
    }
    randomNumberRequests[_requestId].fulfilled = true;
    emit vrfRequestFulfilled(_requestId);
  }

  function createPool(uint256 _categoryId, uint256 _basePrice) public onlyOwner {
    require(_categoryId > 0, "category ID must be greater than 0");
    require(pools[_categoryId].categoryId == 0, "Pool with this category ID already exists");

    Pool storage newPool = pools[_categoryId];
    newPool.categoryId = _categoryId;
    newPool.basePrice = _basePrice;
    newPool.isActive = true;

    emit PoolCreated(_categoryId, newPool.basePrice);
  }

  function disablePool(uint256 _categoryId) public onlyOwner {
    require(pools[_categoryId].isActive, "Pool already inactive");
    pools[_categoryId].isActive = false;
    emit PoolDisabled(_categoryId);
  }

  function enablePool(uint256 _categoryId) public onlyOwner {
    require(pools[_categoryId].isActive == false, "Pool already inactive");
    pools[_categoryId].isActive = true;
    emit PoolEnabled(_categoryId);
  }

  function createItem(uint256 _nftId, uint256 _categoryId) public onlyNftOwner(_nftId) {
    require(nftIdToItemId[_nftId] == 0, "Item with this NFT ID already exists");

    _itemIds.increment();
    uint256 newItemId = _itemIds.current();

    items[newItemId] = Item({
      id: newItemId,
      nftId: _nftId,
      owner: payable(msg.sender),
      categoryId: _categoryId,
      rentee: address(0),
      isRented: false,
      isInPool: false
    });
    nftIdToItemId[_nftId] = newItemId;
    emit ItemCreated(_nftId, _categoryId, msg.sender);
  }

  function getRent(uint256 rentId) public view returns (Rent memory) {
    return rents[rentId];
  }

  function getItem(uint256 itemId) public view returns (Item memory) {
    return items[itemId];
  }

  function getPool(uint256 categoryId) public view returns (Pool memory) {
    return pools[categoryId];
  }

  function getRentQuote(
    uint256 categoryId,
    uint256 rentTime
  ) public view returns (uint256 rentQuoteMatic, uint256 rentQuoteDollar) {
    Pool storage pool = pools[categoryId];
    require(pool.isActive, "Pool with the given category ID does not exist or is not active");

    uint256 basePrice = pool.basePrice;
    uint256 poolSupply = pool.availableItems.length;

    rentQuoteMatic = calculateRentPrice(basePrice, rentTime);
    (int answer, uint8 decimal) = getLatestPrice();
    rentQuoteDollar = (uint256(answer) * rentQuoteMatic) / (10 ** decimal);

    return (rentQuoteMatic, rentQuoteDollar);
  }

  function getItemByNftId(uint256 _nftId) public view returns (Item memory) {
    uint256 itemId = nftIdToItemId[_nftId];
    require(itemId != 0, "Item with the given NFT ID does not exist");
    return items[itemId];
  }

  function addItemToPool(uint256 _nftId) public onlyNftOwner(_nftId) {
    uint256 itemId = nftIdToItemId[_nftId];
    Item storage item = items[itemId];
    Pool storage pool = pools[item.categoryId];

    require(item.id != 0, "Item does not exist");
    require(pool.isActive, "Pool with the given category ID does not exist or is not active");
    require(items[item.id].isInPool == false, "Item is already in a pool");

    // Update the owner of the item if the current owner is not the sender
    if (item.owner != msg.sender) {
      item.owner = payable(msg.sender);
    }

    ERC721 erc721 = ERC721(nftContractAddress);
    erc721.safeTransferFrom(msg.sender, address(this), item.nftId);
    pools[item.categoryId].availableItems.push(item.id);
    item.isInPool = true;
    emit ItemAddedToPool(item.nftId, item.categoryId);
  }

  function removeItemFromPool(uint256 _nftId) public onlyItemOwnerOrContractOwner(_nftId) {
    uint256 itemId = nftIdToItemId[_nftId];
    Item storage item = items[itemId];
    uint256 poolId = item.categoryId;
    Pool storage pool = pools[poolId];

    require(item.id != 0, "Item does not exist");
    require(item.isRented == false, "Item is rented and cannot be removed from pool");
    require(item.isInPool == true, "Item is not in Pool");

    uint256 availableIndex = findIndex(pool.availableItems, item.id);
    require(availableIndex < pool.availableItems.length, "Item not found in available items");
    pool.availableItems[availableIndex] = pool.availableItems[pool.availableItems.length - 1];
    pool.availableItems.pop();
    ERC721 erc721 = ERC721(nftContractAddress);
    erc721.safeTransferFrom(address(this), msg.sender, item.nftId);
    item.isInPool = false;
    emit ItemRemovedFromPool(item.id, poolId);
  }

  function onERC721Received(address, address, uint256, bytes calldata) public pure override returns (bytes4) {
    return this.onERC721Received.selector;
  }

  function startRent(uint256 _categoryId, uint256 _duration) public payable {
    Pool storage pool = pools[_categoryId];
    require(pool.isActive, "Pool with the given category ID does not exist or is not active");
    require(pool.availableItems.length > 0, "Pool with the given category ID has no available items to rent");
    require(randomNumberList.length > 0, "There is no random number available to select item");

    //check if the pool is made by items of the sender
    bool allItemsSameOwner = checkAllItemsSameOwner(msg.sender, _categoryId);
    require(!allItemsSameOwner, "All items belong to the same owner");

    uint256 rentPrice = calculateRentPrice(pool.basePrice, _duration);

    require(msg.value == rentPrice, "The price must be equal to the quote. Get quote again!");

    (Item storage item, uint256 itemRandomIndex, uint256 randomNumber) = getRandomItemNotOwnedBy(
      msg.sender,
      _categoryId
    );
    item.isRented = true;
    item.rentee = msg.sender;

    updatePoolAfterRent(pool, item.id, itemRandomIndex);
    createNewRent(_categoryId, _duration, rentPrice, randomNumber, item);
  }

  function createNewRent(
    uint256 _categoryId,
    uint256 _duration,
    uint256 rentPrice,
    uint256 randomNumber,
    Item storage item
  ) private {
    _rentsIds.increment();
    uint256 newRentId = _rentsIds.current();

    Rent memory newRent = Rent({
      id: newRentId,
      initDate: block.timestamp,
      expirationDate: block.timestamp + (_duration * 86400),
      finishDate: 0,
      owner: item.owner,
      rentee: msg.sender,
      price: rentPrice,
      poolId: _categoryId,
      itemNftId: item.nftId,
      randomNumber: randomNumber,
      status: RentStatus.ACTIVE
    });

    rents[newRentId] = newRent;
    emit RentStarted(
      newRentId,
      _categoryId,
      msg.sender,
      item.nftId,
      newRent.initDate,
      newRent.expirationDate,
      rentPrice,
      item.owner
    );
  }

  function checkAllItemsSameOwner(address owner, uint256 _categoryId) private view returns (bool) {
    Pool storage pool = pools[_categoryId];

    for (uint256 i = 0; i < pool.availableItems.length; i++) {
      if (items[pool.availableItems[i]].owner != owner) {
        return false;
      }
    }
    return true;
  }

  function getRandomItemNotOwnedBy(
    address owner,
    uint256 _categoryId
  ) private returns (Item storage item, uint256 itemRandomIndex, uint256 randomNumber) {
    Pool storage pool = pools[_categoryId];
    uint256 selectedItemId;
    do {
      randomNumber = getRandomNumber();
      itemRandomIndex = randomNumber % pool.availableItems.length;
      selectedItemId = pool.availableItems[itemRandomIndex];
      item = items[selectedItemId];
    } while (item.owner == owner);
    return (item, itemRandomIndex, randomNumber);
  }

  function getRandomNumber() private returns (uint256 randomNumber) {
    randomNumber = randomNumberList[randomNumberList.length - 1];
    randomNumberList.pop();
    if (randomNumberList.length < 5) {
      fillRandomNumberList();
    }
    return randomNumber;
  }

  function updatePoolAfterRent(Pool storage pool, uint256 selectedItemId, uint256 index) private {
    pool.rentedItems.push(selectedItemId);
    pool.availableItems[index] = pool.availableItems[pool.availableItems.length - 1];
    pool.availableItems.pop();
  }

  function finishRent(uint256 rentId) public onlyRenteeOrContractOwner(rentId) {
    require(rents[rentId].status == RentStatus.ACTIVE, "This Rent is not Active");
    Rent storage rent = rents[rentId];
    uint256 itemId = nftIdToItemId[rent.itemNftId];
    Item storage item = items[itemId];
    Pool storage pool = pools[rent.poolId];

    require(item.isRented, "Item is not currently rented");

    uint256 rentedIndex = findIndex(pool.rentedItems, item.id);
    require(rentedIndex < pool.rentedItems.length, "Item not found in rented items");

    pool.rentedItems[rentedIndex] = pool.rentedItems[pool.rentedItems.length - 1];
    pool.rentedItems.pop();
    pool.availableItems.push(item.id);
    item.isRented = false;
    item.rentee = address(0);
    rent.status = RentStatus.FINISHED;
    rent.finishDate = block.timestamp;
    //todo -> check the amount consumed and return change
    payable(item.owner).transfer(rent.price);
    emit RentFinished(rent.id, rent.finishDate);
  }

  function calculateRentPrice(uint256 basePrice, uint256 rentTime) internal view returns (uint256) {
    uint256 timeAdjustedPrice = basePrice.mul(rentTime).mul(marketVolumeFactor) / 10 ** 18;
    return timeAdjustedPrice;
  }

  function adjustMarketVolumeFactor(uint256 newFactor) public onlyMarketVolumeUpdaterOrOwner {
    marketVolumeFactor = newFactor;
  }

  function findIndex(uint256[] storage array, uint256 value) internal view returns (uint256) {
    for (uint256 i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return i;
      }
    }
    return array.length;
  }
}
