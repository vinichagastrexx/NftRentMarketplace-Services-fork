// scripts/fillRandomNumberList.js

const env = require("../../config/env")
const { ethers } = require("hardhat")

async function main() {
  const [owner] = await ethers.getSigners()
  const NFTRentMarketplace = await ethers.getContractFactory("NFTRentMarketplace")
  const nftRentMarketplace = NFTRentMarketplace.attach(env.nftContractAddress)
  const tx = await nftRentMarketplace.connect(owner).fillRandomNumberList()
  console.log(tx)
  await tx.wait()

  console.log(`fillRandomNumberList chamado no contrato ${nftRentMarketplace.address}`)
  console.log("Account balance:", (await owner.getBalance()).toString())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
