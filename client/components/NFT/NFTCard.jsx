import React from 'react';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function NFTCard({ nft }) {
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