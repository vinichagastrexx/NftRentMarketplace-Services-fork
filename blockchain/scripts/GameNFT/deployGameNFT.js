const { ethers } = require("hardhat")

async function main() {
  const NFTRentMarketplace = await ethers.getContractFactory("GameNFT")
  const nftRentMarketplace = await NFTRentMarketplace.deploy(
    "GameNFT",
    "TGG",
    "0x64B6D0Df31a5435fca0F00cf210E909b2d91c603",
    0
  )

  await nftRentMarketplace.deployed()
  console.log(`GameNFT Deployed to: ${nftRentMarketplace.address}`)
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
