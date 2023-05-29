import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { env } from './config/env';

const config: HardhatUserConfig = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: env.mumbaiRpcUrl,
      accounts: [env.walletPvKey]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

export default config;
