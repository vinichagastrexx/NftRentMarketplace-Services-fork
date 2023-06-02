import { Container, Heading, Text } from '@chakra-ui/react';
import { useContract, useOwnedNFTs, useAddress } from '@thirdweb-dev/react';
import React from 'react';
import NFTGrid from '../components/NFTGrid';
import { NFT_ADDRESS } from '../const/addresses';

export default function Inventory() {
  const address = useAddress();
  const { contract: nftCollection } = useContract(NFT_ADDRESS);
  const { data: ownedNfts, isLoading } = useOwnedNFTs(
    nftCollection,
    address
  );

  return (
    <Container maxW={"75%"} p={5}>
      <Heading fontSize={50} fontFamily={"Bayon"}>Inventory</Heading>
      <Text fontSize={25} fontFamily={"Big Shoulders Text"}>Here are your Game Items. Add them to a pool and earn some money!</Text>
      <NFTGrid
        isLoading={isLoading}
        data={ownedNfts}
        emptyText={"You have no Items"}
      />
    </Container>
  )
}