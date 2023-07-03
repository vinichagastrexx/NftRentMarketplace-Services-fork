const env = require("../../config/env")
const { ethers } = require("hardhat")

async function main() {
  const [owner] = await ethers.getSigners()

  const NFTRentMarketplace = await ethers.getContractFactory("NFTRentMarketplaceV2")
  const nftRentMarketplace = await NFTRentMarketplace.deploy(
    env.vrfSubId,
    env.vrfCoordinatorContractAddress,
    env.vrfKeyHash,
    env.dataFeedContractAddress
  )

  await nftRentMarketplace.deployed()
  console.log(`NFTRentMarketplace Deployed to: ${nftRentMarketplace.address}`)
  console.log("Account balance:", (await owner.getBalance()).toString())
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
