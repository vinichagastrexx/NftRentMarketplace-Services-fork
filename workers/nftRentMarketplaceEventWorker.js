const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Mumbai } = require('@thirdweb-dev/chains');
const axios = require('axios');
const env = require('../config/env');
const { NFT_RENT_MARKETPLACE_ABI } = require('../config/abi');
const ethers = require('ethers');

class NFTRentMarketplaceEventWorker {
  constructor() {
    this.contractAddress = env.nftRentMarketplaceContract;
    this.privateKey = env.walletPvKey;
    this.provider = env.mumbaiRpcUrl;
    this.init();
  }

  async init() {
    this.sdk = await ThirdwebSDK.fromPrivateKey(this.privateKey, { ...Mumbai, rpc: [this.provider] });
    this.contract = await this.sdk.getContract(this.contractAddress, NFT_RENT_MARKETPLACE_ABI);
    this.contract.events.addEventListener('RentStarted', this.onRentStarted.bind(this));
    this.contract.events.addEventListener('PoolCreated', this.onPoolCreated.bind(this));
  }

  async onRentStarted(event) {
    const payload = {
      rentId: Number(`${event.data.rentId._hex}`),
      poolId: Number(`${event.data.poolId._hex}`),
      rentee: event.data.rentee,
      nftId: Number(`${event.data.itemNftId._hex}`),
      price: Number(`${event.data.price._hex}`),
      expirationDate: new Date(Number(`${event.data.expirationDate._hex}`) * 1000),
      initDate: new Date(Number(`${event.data.initDate._hex}`) * 1000),
    }
    try {
      await axios.post('http://localhost:3001/rents/start-rent', payload);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async onPoolCreated(event) {
    console.log(event.data);
    try {
      const payload = {
        poolId: Number(`${event.data.poolId._hex}`),
        basePrice: Number(`${event.data.basePrice._hex}`),
      }
      await axios.post('http://localhost:3001/pools/create-pool', payload);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}


module.exports = { NFTRentMarketplaceEventWorker };
