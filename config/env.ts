import dotenv from 'dotenv';
dotenv.config();


export const env  = {
  walletPvKey: process.env.WALLET_PV_KEY ?? "",
  mumbaiRpcUrl: process.env.MUMBAI_RPC_URL ?? "",
}