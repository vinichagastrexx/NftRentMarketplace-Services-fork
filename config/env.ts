import dotenv from 'dotenv';
dotenv.config();


export const env = {
  walletPvKey: process.env.WALLET_PV_KEY ?? '',
  mumbaiRpcUrl: process.env.MUMBAI_RPC_URL ?? '',
  nftContractAddress: process.env.NFT_CONTRACT ?? '',
  vrfKeyHash: process.env.VRF_KEY_HASH ?? '',
  vrfCoordinatorContractAddress: process.env.VRF_COORDINATOR_CONTRACT ?? '',
  vrfSubId: Number(process.env.VRF_SUB_ID) ?? 0,
};