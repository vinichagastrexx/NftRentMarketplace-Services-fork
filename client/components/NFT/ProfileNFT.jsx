import NFTCard from '../../components/NFT/NFTCard';
import { useContract, useNFT } from '@thirdweb-dev/react';

export default function ProfileNFT({ nftId, nftContractAddress }) {
  const { contract: nftCollection } = useContract(nftContractAddress);
  const { data: nft } = useNFT(nftCollection, nftId);

  return nft ? <NFTCard key={nft.metadata.id} nft={nft} /> : null;
}