require("@nomiclabs/hardhat-waffle")

const env = {
  AVALANCHE_PRIVATE_KEY: "9bcdcecec956d01178a1320ff0cbe362eb59f8fe711642703b7419966320df52",
  FUJI_RPC_URL:
    "https://avalanche-fuji.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a",
    LACHAIN_PRIVATE_KEY: "9d7aaed6be947661b1ef2610a21e21fe3299fbd838c06de11ac244b88a5dae43"
}

module.exports = {
  defaultNetwork: "fuji",
  networks: {
    hardhat: {},
    fuji: {
      url: env.FUJI_RPC_URL,
      accounts: [`0x${env.AVALANCHE_PRIVATE_KEY}`],
      gasPrice: 225000000000,
      chainId: 43113,
    },
    lachain: {
      url: "https://rpc1.mainnet.lachain.network/",
      chainId: 274,
      accounts: [`0x${env.LACHAIN_PRIVATE_KEY}`],
    }
  },
  solidity: "0.8.18",
}
