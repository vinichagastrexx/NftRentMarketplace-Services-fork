// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Functions, FunctionsClient} from "./dev/functions/FunctionsClient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract NFTRentMarketplace is VRFConsumerBaseV2, ConfirmedOwner, FunctionsClient {
  //VRF Settings
  VRFCoordinatorV2Interface public vrfCoordinator;
  uint64 private vrfSubscriptionId;
  bytes32 internal vrfkeyHash;
  uint32 private vrfCallbackGasLimit = 100000;
  uint16 private vrfRequestConfirmations = 3;
  uint32 private vrfNumWordsRequested = 1;
  uint256 public vrfRandomNumberResult;

  //vrf Events
  event VrfRequestSent(uint256 requestId, uint32 numWords);
  event VrfRequestFulfilled(uint256 requestId, uint256[] randomWords);

  //vrf Data
  struct VrfRequestStatus {
    bool fulfilled;
    bool exists;
    uint256[] randomWords;
  }
  uint256[] public vrfRequestIds;
  uint256 public vrfLastRequestId;

  //vrf Mappings
  mapping(uint256 => VrfRequestStatus) public vrfRequests;

  //CF Settings
  using Functions for Functions.Request;

  bytes32 public cflatestRequestId;
  bytes public cflatestResponse;
  bytes public cflatestError;

  event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);

  constructor(
    uint64 _vrfSubscriptionId,
    address _vrfCoordinator,
    bytes32 _vrfkeyHash,
    address _cfOracle
  ) VRFConsumerBaseV2(_vrfCoordinator) FunctionsClient(_cfOracle) ConfirmedOwner(msg.sender) {
    vrfCoordinator = VRFCoordinatorV2Interface(_vrfCoordinator);
    vrfSubscriptionId = _vrfSubscriptionId;
    vrfkeyHash = _vrfkeyHash;
  }

  function requestRandomNumbers() external onlyOwner returns (uint256 requestId) {
    requestId = vrfCoordinator.requestRandomWords(
      vrfkeyHash,
      vrfSubscriptionId,
      vrfRequestConfirmations,
      vrfCallbackGasLimit,
      vrfNumWordsRequested
    );
    vrfRequests[requestId] = VrfRequestStatus({randomWords: new uint256[](0), exists: true, fulfilled: false});
    vrfRequestIds.push(requestId);
    vrfLastRequestId = requestId;
    emit VrfRequestSent(requestId, vrfNumWordsRequested);
    return requestId;
  }

  function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
    vrfRequests[_requestId].fulfilled = true;
    vrfRequests[_requestId].randomWords = _randomWords;
    emit VrfRequestFulfilled(_requestId, _randomWords);
  }

  function executeRequest(
    string calldata source,
    bytes calldata secrets,
    string[] calldata args,
    uint64 subscriptionId,
    uint32 gasLimit
  ) public onlyOwner returns (bytes32) {
    Functions.Request memory req;
    req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, source);
    if (secrets.length > 0) {
      req.addRemoteSecrets(secrets);
    }
    if (args.length > 0) req.addArgs(args);

    bytes32 assignedReqID = sendRequest(req, subscriptionId, gasLimit);
    cflatestRequestId = assignedReqID;
    return assignedReqID;
  }

  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    cflatestResponse = response;
    cflatestError = err;
    emit OCRResponse(requestId, response, err);
  }

  function updateOracleAddress(address oracle) public onlyOwner {
    setOracle(oracle);
  }

  function addSimulatedRequestId(address oracleAddress, bytes32 requestId) public onlyOwner {
    addExternalRequest(oracleAddress, requestId);
  }
}
