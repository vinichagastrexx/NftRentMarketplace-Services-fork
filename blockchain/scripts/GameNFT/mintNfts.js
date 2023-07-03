const env = require("../../config/env")
const { ethers } = require("hardhat")

async function main() {
  const [owner] = await ethers.getSigners()
  const GameNFT = await ethers.getContractFactory("GameNFT")
  const gameNFT = await GameNFT.attach(env.nftContractAddress)
  await gameNFT.connect(owner)
  for (let i = 0; i < 5; i++) {
    const tx = await gameNFT.mintTo(env.walletAddress, "")
    console.log("NFT minted:", tx)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
