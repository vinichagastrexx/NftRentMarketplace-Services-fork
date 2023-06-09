const { NFTRentMarketplaceEventWorker } = require('./nftRentMarketplaceEventWorker')
const nftRentMarketplaceWorker = new NFTRentMarketplaceEventWorker();

try {
  nftRentMarketplaceWorker.init();
  console.log('app listening')
} catch (e) {
  console.error(e)
}
