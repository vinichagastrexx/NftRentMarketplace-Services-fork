import React from 'react';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function NFTCard({ nft }) {
  return (
    <Flex overflow={"hidden"} borderRadius={'10px'} border={'1px'} direction={"column"} maxWidth={200} justifyContent={"center"}>
      <Box >
        <ThirdwebNftMedia width='200px' height='150px' style={{}}
          metadata={nft.metadata} />
      </Box>
      <Box background="linear-gradient(to right, #ffafbd, #ffc3a0)" p={4}>
        <Text>Token Id: {nft.metadata.id}</Text>
        <Text>Item name: {nft.metadata.name}</Text>
      </Box>
    </Flex>
  )
}