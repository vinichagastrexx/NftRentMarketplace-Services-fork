import React from 'react';
import { NFT } from '@thirdweb-dev/sdk';
import { NFT_RENT_MARKETPLACE_ADDRESS, NFT_ADDRESS } from '../const/addresses'
import { ThirdwebNftMedia, useContract, useNFT } from '@thirdweb-dev/react';
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';

export default function NFTCard({ nft }) {
  const { contract, isContractLoading } = useContract(NFT_ADDRESS, "nft-collection");

  return (
    <Flex direction={"column"} justifyContent={"center"}>
      <Box overflow={"hidden"}>
        <ThirdwebNftMedia metadata={nft.metadata} height={"100%"} width={"100%"} />
      </Box>
      <Text>Token ID #</Text>
      <Text>{nft.metadata.name}</Text>
    </Flex>
  )
}