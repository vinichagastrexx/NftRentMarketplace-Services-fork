const { ContractEvent, SmartContract, ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Mumbai } = require('@thirdweb-dev/chains');
const axios = require('axios');
const env = require('../config/env')

class NftEventWorker {
  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.privateKey = env.walletPvKey;
    this.provider = env.mumbaiRpcUrl;
    this.init();
  }

  async init() {
    this.sdk = await ThirdwebSDK.fromPrivateKey(this.privateKey, { ...Mumbai, rpc: [this.provider] });
    this.contract = await this.sdk.getContract(this.contractAddress);
    this.contract.events.addEventListener('ItemCreated', this.onItemCreated.bind(this));
    this.contract.events.addEventListener('ItemAddedToPool', this.onItemAddedToPool.bind(this));
  }

  onItemAddedToPool(event) {
    console.log(event.data);
  }

  onItemCreated(event) {
    console.log(event.data);
  }
}

module.exports = { NftEventWorker };
