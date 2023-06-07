const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Mumbai } = require('@thirdweb-dev/chains');
const env = require('../config/env');
const { NFT_RENT_MARKETPLACE_ABI } = require('../config/abi');

class NFTGameEventWorker {
  constructor() {
    this.nftRentMarketplaceContractAddress = env.nftRentMarketplaceContract;
    this.nftContractAddress = env.nftContractAddress;
    this.privateKey = env.walletPvKey;
    this.provider = env.mumbaiRpcUrl;
    this.init();
  }

  async init() {
    this.sdk = await ThirdwebSDK.fromPrivateKey(this.privateKey, { ...Mumbai, rpc: [this.provider] });
    this.nftContract = await this.sdk.getContract(this.nftContractAddress);
    this.nftRentMarketplaceContract = await this.sdk.getContract(this.nftRentMarketplaceContractAddress, NFT_RENT_MARKETPLACE_ABI);
    this.nftContract.events.addEventListener('Transfer', this.onTransfer.bind(this));
  }

  async onTransfer(event) {
    const tokenId = Number(`${event.data.tokenId._hex}`);
    try {
      await this.nftRentMarketplaceContract.call("createItem", [tokenId, 1]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}

module.exports = { NFTGameEventWorker };
