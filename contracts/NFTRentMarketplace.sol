// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract NFTRentMarketplace is VRFConsumerBaseV2, ConfirmedOwner {
    //VRF Settings
    VRFCoordinatorV2Interface public VRFCoordinator;
    uint64 private VRFSubscriptionId;
    bytes32 internal VRFkeyHash;
    uint32 private VRFCallbackGasLimit = 100000;
    uint16 private VRFRequestConfirmations = 3;
    uint32 private VRFNumWordsRequested = 1;
    uint256 public VRFRandomNumberResult;

    //VRF Events
    event VRFRequestSent(uint256 requestId, uint32 numWords);
    event VRFRequestFulfilled(uint256 requestId, uint256[] randomWords);

    //VRF Data
    struct VRFRequestStatus {
        bool fulfilled;
        bool exists;
        uint256[] randomWords;
    }
    uint256[] public VRFRequestIds;
    uint256 public VRFLastRequestId;

    //VRF Mappings
    mapping(uint256 => VRFRequestStatus) public VRFRequests;

    constructor(
        uint64 _VRFSubscriptionId,
        address _VRFCoordinator,
        bytes32 _VRFkeyHash
    ) VRFConsumerBaseV2(_VRFCoordinator) ConfirmedOwner(msg.sender) {
        VRFCoordinator = VRFCoordinatorV2Interface(_VRFCoordinator);
        VRFSubscriptionId = _VRFSubscriptionId;
        VRFkeyHash = _VRFkeyHash;
    }

    function requestRandomNumbers()
        external
        onlyOwner
        returns (uint256 requestId)
    {
        requestId = VRFCoordinator.requestRandomWords(
            VRFkeyHash,
            VRFSubscriptionId,
            VRFRequestConfirmations,
            VRFCallbackGasLimit,
            VRFNumWordsRequested
        );
        VRFRequests[requestId] = VRFRequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        VRFRequestIds.push(requestId);
        VRFLastRequestId = requestId;
        emit VRFRequestSent(requestId, VRFNumWordsRequested);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        VRFRequests[_requestId].fulfilled = true;
        VRFRequests[_requestId].randomWords = _randomWords;
        emit VRFRequestFulfilled(_requestId, _randomWords);
    }
}
