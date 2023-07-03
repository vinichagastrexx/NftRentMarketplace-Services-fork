require("dotenv").config();

module.exports = {
  nftContractAddress: process.env.NFT_CONTRACT ?? "",
  nftRentMarketplaceContract: process.env.NFT_RENT_MARKETPLACE_CONTRACT ?? "",
  pgUser: process.env.PG_USER ?? "",
  pgPwd: process.env.PG_PWD ?? "",
  pgUri: process.env.PG_URI ?? "",
  pgPort: process.env.PG_PORT ?? "",
  pgDb: process.env.PG_DATABASE ?? "",
};
