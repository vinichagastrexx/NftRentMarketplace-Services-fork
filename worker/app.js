const { NFTRentMarketplaceEventWorker } = require('./nftRentMarketplaceEventWorker')
const nftRentMarketplaceWorker = new NFTRentMarketplaceEventWorker();

try {
  nftRentMarketplaceWorker.init();
  console.log(`app listening to ${process.env.NFT_RENT_MARKETPLACE_CONTRACT} contract events`)
} catch (e) {
  console.error(e)
}
