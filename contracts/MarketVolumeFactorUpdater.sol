// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Functions, FunctionsClient} from "./dev/functions/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import {NFTRentMarketplace} from "./NFTRentMarketplace.sol";

contract MarketVolumeFactorUpdater is FunctionsClient, ConfirmedOwner, AutomationCompatibleInterface {
  using Functions for Functions.Request;

  bytes public marketVolumeUpdateRequest;
  bytes32 public currentRequestId;
  bytes public latestMarketVolumeUpdate;
  bytes public latestMarketVolumeUpdateError;
  uint64 public subscriptionId;
  uint32 public gasLimit;
  uint256 public marketVolumeUpdateInterval;
  uint256 public lastMarketVolumeUpdateTimeStamp;
  uint256 public marketVolumeUpdateCounter;
  uint256 public marketVolumeUpdateResponseCounter;
  NFTRentMarketplace public rentMarketplace;
  event MarketVolumeUpdateResponse(bytes32 indexed requestId, bytes result, bytes err);

  constructor(
    address oracle,
    uint64 _subscriptionId,
    uint32 _fulfillGasLimit,
    uint256 _updateInterval,
    address _rentMarketplaceContract
  ) FunctionsClient(oracle) ConfirmedOwner(msg.sender) {
    rentMarketplace = NFTRentMarketplace(_rentMarketplaceContract);
    marketVolumeUpdateInterval = _updateInterval;
    subscriptionId = _subscriptionId;
    gasLimit = _fulfillGasLimit;
    lastMarketVolumeUpdateTimeStamp = block.timestamp;
  }

  function generateMarketVolumeUpdateRequest(
    string calldata source,
    bytes calldata secrets,
    string[] calldata args
  ) public pure returns (bytes memory) {
    Functions.Request memory req;
    req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, source);
    if (secrets.length > 0) {
      req.addRemoteSecrets(secrets);
    }
    if (args.length > 0) req.addArgs(args);

    return req.encodeCBOR();
  }

  function setMarketVolumeUpdateRequest(
    uint64 _subscriptionId,
    uint32 _fulfillGasLimit,
    uint256 _updateInterval,
    bytes calldata newRequestCBOR
  ) external onlyOwner {
    marketVolumeUpdateInterval = _updateInterval;
    subscriptionId = _subscriptionId;
    gasLimit = _fulfillGasLimit;
    marketVolumeUpdateRequest = newRequestCBOR;
  }

  function checkUpkeep(bytes memory) public view override returns (bool upkeepNeeded, bytes memory) {
    upkeepNeeded = (block.timestamp - lastMarketVolumeUpdateTimeStamp) > marketVolumeUpdateInterval;
  }

  function performUpkeep(bytes calldata) external override {
    (bool updateNeeded, ) = checkUpkeep("");
    require(updateNeeded, "Time interval not met");
    lastMarketVolumeUpdateTimeStamp = block.timestamp;
    marketVolumeUpdateCounter = marketVolumeUpdateCounter + 1;

    bytes32 requestId = s_oracle.sendRequest(subscriptionId, marketVolumeUpdateRequest, gasLimit);

    s_pendingRequests[requestId] = s_oracle.getRegistry();
    emit RequestSent(requestId);
    currentRequestId = requestId;
  }

  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    latestMarketVolumeUpdate = response;
    latestMarketVolumeUpdateError = err;
    marketVolumeUpdateResponseCounter = marketVolumeUpdateResponseCounter + 1;
    uint256 volumeFactor = uint256(bytes32(response));
    rentMarketplace.adjustMarketVolumeFactor(volumeFactor);
    emit MarketVolumeUpdateResponse(requestId, response, err);
  }

  function updateOracleAddress(address oracle) public onlyOwner {
    setOracle(oracle);
  }
}
