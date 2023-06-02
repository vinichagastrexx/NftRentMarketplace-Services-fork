import { Container, Heading, Text } from '@chakra-ui/react';
import { useContract, useNFTs } from '@thirdweb-dev/react';
import React from 'react';
import NFTGrid from '../components/NFTGrid';
import { NFT_ADDRESS } from '../const/addresses';
export default function Inventory() {
  const { contract } = useContract(NFT_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <Container maxH={"1200px"} p={5}>
      <Heading>Inventory</Heading>
      <Text>Here are your Game Items. Add them to a pool and earn some money!</Text>
      <NFTGrid
        isLoading={isLoading}
        data={data}
        emptyText={"No NFTs found"}
      />
    </Container>
  )
}