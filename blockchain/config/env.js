require("dotenv").config()

module.exports = {
  walletAddress: process.env.WALLET_ADDRESS ?? "",
  nftContractAddress: process.env.NFT_CONTRACT ?? "",
  nftRentMarketplaceContract: process.env.NFT_RENT_MARKETPLACE_CONTRACT ?? "",
}
