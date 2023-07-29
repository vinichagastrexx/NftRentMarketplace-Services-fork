import { Magic } from 'magic-sdk';

const createMagic = () => {
  return (
    typeof window !== 'undefined' &&
    new Magic('pk_live_B8B9AAA09344A1AA', {
      network: {
        rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
        chainId: 80001,
      },
    })
  );
};

export const magic = createMagic();
