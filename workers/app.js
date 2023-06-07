const { NFTRentMarketplaceEventWorker } = require('./nftRentMarketplaceEventWorker')
const { NFTGameEventWorker } = require('./nftGameEventWorker')
const nftWorker = new NFTGameEventWorker();
const nftRentMarketplaceWorker = new NFTRentMarketplaceEventWorker();

try {
  nftWorker.init();
  nftRentMarketplaceWorker.init();
  console.log('app listening')
} catch (e) {
  console.error(e)
}
