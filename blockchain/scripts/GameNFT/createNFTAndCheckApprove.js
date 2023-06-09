const env = require("../../config/env")
const { ethers } = require("hardhat")

async function main() {
  const [owner] = await ethers.getSigners()
  const GameNFT = await ethers.getContractFactory("GameNFT")
  const gameNFT = await GameNFT.attach(env.nftContractAddress)

  await gameNFT.connect(owner).setNFTRentMarketplace("0xe3A9155b9DC6Ed54752C6A00a9f8f886403783Dd")
  console.log("NFTRentMarketplace address set to:", "0xe3A9155b9DC6Ed54752C6A00a9f8f886403783Dd")

  const uri = "https://example.com/nft/1"
  await gameNFT.mintTo("0x3b3cc7a4323E101FF7B2dd16cb97BAf9fF76f028", uri)
  console.log("NFT minted for:", "0x3b3cc7a4323E101FF7B2dd16cb97BAf9fF76f028")

  const approvedAddress = await gameNFT.connect(owner).getApproved(0)
  console.log("Approved address for NFT:", approvedAddress)

  if (approvedAddress === 0xe3A9155b9DC6Ed54752C6A00a9f8f886403783Dd) {
    console.log("Approval check passed.")
  } else {
    console.log("Approval check failed.")
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
