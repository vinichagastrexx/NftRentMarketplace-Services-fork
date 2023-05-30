import { ethers } from "hardhat"
import { env } from "../config/env"
async function main() {
  const [owner, randomAccount1, randomAccount2] = await ethers.getSigners()
  const GameNFT = await ethers.getContractFactory("GameNFT")
  const gameNFT = await GameNFT.attach(env.nftContractAddress)

  await gameNFT.connect(owner).setNFTRentMarketplace(randomAccount1.address)
  console.log("NFTRentMarketplace address set to:", randomAccount1.address)

  const uri = "https://example.com/nft/1"
  await gameNFT.safeMint(randomAccount2.address, uri)
  console.log("NFT minted for:", randomAccount2.address)

  const approvedAddress = await gameNFT.getApproved("1")
  console.log("Approved address for NFT:", approvedAddress)

  if (approvedAddress === randomAccount1.address) {
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
