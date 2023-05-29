import { ethers } from 'hardhat';

async function main() {
  const NFTRentMarketplace = await ethers.getContractFactory('GameNFT');
  const nftRentMarketplace = await NFTRentMarketplace.deploy();

  await nftRentMarketplace.deployed();
  console.log(
    `GameNFT Deployed to: ${nftRentMarketplace.address}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
