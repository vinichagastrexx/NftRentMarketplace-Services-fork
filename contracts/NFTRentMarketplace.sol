// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTRentMarketplace is VRFConsumerBaseV2, ConfirmedOwner, IERC721Receiver {
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
  uint256 public marketVolumeFactor = 1;

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
    uint256 price
  );
  event RentFinished(uint256 indexed rentId, uint256 finishDate);

  //Pool Events
  event PoolEnabled(uint256 poolId);
  event PoolDisabled(uint256 poolId);
  event PoolCreated(uint256 indexed poolId, uint256 basePrice);

  //Item Events
  event ItemAddedToPool(uint256 indexed itemId, uint256 poolId);
  event ItemRemovedFromPool(uint256 indexed itemId, uint256 poolId);
  event ItemCreated(uint256 indexed itemId, uint256 indexed nftId, uint256 categoryId, address owner);
  address public nftContractAddress;

  constructor(
    uint64 _vrfSubscriptionId,
    address _vrfCoordinator,
    bytes32 _vrfkeyHash,
    address _nftContractAddress
  ) VRFConsumerBaseV2(_vrfCoordinator) ConfirmedOwner(msg.sender) {
    vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
    vrfSubscriptionId = _vrfSubscriptionId;
    vrfkeyHash = _vrfkeyHash;
    nftContractAddress = _nftContractAddress;
  }

  modifier onlyNftOwner(uint256 _itemNftId) {
    uint256 itemId = nftIdToItemId[_itemNftId];
    Item storage item = items[itemId];
    require(msg.sender == item.owner, "Only the NFT owner can perform this operation");
    _;
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

  function createItem(uint256 _nftId, uint256 _categoryId) public {
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
    emit ItemCreated(newItemId, _nftId, _categoryId, msg.sender);
  }

  function getRent(uint256 requestId) public view returns (Rent memory) {
    return rents[requestId];
  }

  function getItem(uint256 itemId) public view returns (Item memory) {
    return items[itemId];
  }

  function getPool(uint256 categoryId) public view returns (Pool memory) {
    return pools[categoryId];
  }

  function getRentQuote(uint256 categoryId, uint256 rentTime) public view returns (uint256 rentQuote) {
    Pool storage pool = pools[categoryId];
    require(pool.isActive, "Pool with the given category ID does not exist or is not active");

    uint256 basePrice = pool.basePrice;
    uint256 poolSupply = pool.availableItems.length;

    rentQuote = calculateRentPrice(basePrice, rentTime, poolSupply);
    return rentQuote;
  }

  function getItemByNftId(uint256 _nftId) public view returns (Item memory) {
    uint256 itemId = nftIdToItemId[_nftId];
    require(itemId != 0, "Item with the given NFT ID does not exist");
    return items[itemId];
  }

  function addItemToPool(uint256 _nftId, uint256 _categoryId) public {
    Pool storage pool = pools[_categoryId];
    uint256 itemId = nftIdToItemId[_nftId];
    Item storage item = items[itemId];

    require(item.id != 0, "Item does not exist");
    require(pool.isActive, "Pool with the given category ID does not exist or is not active");
    require(items[item.id].isInPool == false, "Item is already in a pool");
    require(item.owner == msg.sender, "Only item owner can add it to a pool");

    ERC721 erc721 = ERC721(nftContractAddress);
    erc721.safeTransferFrom(msg.sender, address(this), item.nftId);
    pools[_categoryId].availableItems.push(item.id);
    item.isInPool = true;
    emit ItemAddedToPool(item.id, _categoryId);
  }

  function removeItemFromPool(uint256 _nftId) public onlyNftOwner(_nftId) {
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

    uint256 rentPrice = calculateRentPrice(pool.basePrice, _duration, pool.availableItems.length);

    require(msg.value == rentPrice, "The price must be equal to the quote. Get quote again!");

    uint256 randomNumber = getRandomNumber();
    uint256 itemRandomIndex = randomNumber % pool.availableItems.length;
    uint256 selectedItemId = pool.availableItems[itemRandomIndex];

    Item storage item = items[selectedItemId];
    item.isRented = true;
    item.rentee = msg.sender;

    updatePoolAfterRent(pool, selectedItemId, itemRandomIndex);
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
      expirationDate: block.timestamp + _duration,
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
      rentPrice
    );
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

  function finishRent(uint256 rentId) public {
    require(rents[rentId].status == RentStatus.ACTIVE, "This Rent is not Active");
    Rent storage rent = rents[rentId];
    uint256 itemId = nftIdToItemId[rent.itemNftId];
    Item storage item = items[itemId];
    Pool storage pool = pools[rent.poolId];

    require(item.isRented, "Item is not currently rented");
    require(item.rentee == msg.sender, "Only the rentee can finish the rent");

    uint256 rentedIndex = findIndex(pool.rentedItems, item.id);
    require(rentedIndex < pool.rentedItems.length, "Item not found in rented items");

    pool.rentedItems[rentedIndex] = pool.rentedItems[pool.rentedItems.length - 1];
    pool.rentedItems.pop();
    pool.availableItems.push(item.id);
    item.isRented = false;
    item.rentee = address(0);
    rent.status = RentStatus.FINISHED;
    rent.finishDate = block.timestamp;
    payable(item.owner).transfer(rent.price);
    emit RentFinished(rent.id, rent.finishDate);
  }

  function calculateRentPrice(uint256 basePrice, uint256 rentTime, uint256 poolSupply) internal view returns (uint256) {
    uint256 timeAdjustedPrice = basePrice.mul(rentTime);
    uint256 supplyAdjustedPrice = timeAdjustedPrice.mul(100).mul(10 ** 20).div(poolSupply.add(100));

    supplyAdjustedPrice = supplyAdjustedPrice.div(10 ** 18);
    uint256 finalPrice = supplyAdjustedPrice.mul(marketVolumeFactor);

    return finalPrice;
  }

  function adjustMarketVolumeFactor(uint256 newFactor) public {
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
