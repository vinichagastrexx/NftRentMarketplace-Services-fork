require("dotenv").config()

module.exports = {
  walletPvKey: process.env.WALLET_PV_KEY ?? "",
  blockchainRpcUrl: process.env.BLOCKCHAIN_RPC_URL ?? "",
  nftContractAddress: process.env.NFT_CONTRACT ?? "",
  nftRentMarketplaceContract: process.env.NFT_RENT_MARKETPLACE_CONTRACT ?? "",
  nftRentMarketplaceApi: process.env.NFT_RENT_MARKETPLACE_API ?? ""
}
