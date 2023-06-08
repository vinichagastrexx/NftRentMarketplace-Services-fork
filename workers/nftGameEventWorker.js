const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { Mumbai } = require('@thirdweb-dev/chains');
const env = require('../config/env');

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
    this.nftContract = await this.sdk.getContract(this.nftContractAddress, 'nft-collection');
    this.nftRentMarketplaceContract = await this.sdk.getContract(this.nftRentMarketplaceContractAddress);
    this.nftContract.events.addEventListener('Transfer', this.onTransfer.bind(this));
  }

  async onTransfer(event) {
    console.log(event);
    const tokenId = Number(`${event.data.tokenId._hex}`);
    try {
      const nft = await this.nftContract.get(tokenId);
      console.log(nft);
      const categoryAttribute = Object.entries(nft?.metadata?.attributes || {}).find(
        ([_, value]) => value.trait_type === 'categoryId'
      );
      const categoryId = categoryAttribute ? categoryAttribute[1].value : null;
      console.log(categoryId);
      await this.nftRentMarketplaceContract.call("createItem", [tokenId, Number(categoryId[0])]);
      //todo -> update owner in Database
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}

module.exports = { NFTGameEventWorker };
