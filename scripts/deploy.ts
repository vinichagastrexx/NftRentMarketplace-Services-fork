import { ethers } from 'hardhat';
import { env } from '../config/env';

async function main() {
  const NFTRentMarketplace = await ethers.getContractFactory('NFTRentMarketplace');
  const nftRentMarketplace = await NFTRentMarketplace.deploy(env.vrfSubId, env.nftContractAddress, env.vrfCoordinatorContractAddress);

  await nftRentMarketplace.deployed();
  console.log(
    `NFTRentMarketplace Deployed to: ${nftRentMarketplace.address}`
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
