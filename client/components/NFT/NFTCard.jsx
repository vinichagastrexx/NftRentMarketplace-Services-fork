import React from 'react';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function NFTCard({ nft }) {
  return (
    <Flex
      overflow={"hidden"}
      borderRadius={'10px'}
      border={'1px'}
      direction={"column"}
      maxWidth={200}
      justifyContent={"center"}
      transition="0.3s"
      _hover={{ transform: 'scale(1.05)' }}
    >
      <Box >
        <ThirdwebNftMedia
          width='200px'
          height='150px'
          style={{}}
          metadata={nft.metadata} />
      </Box>
      <Box
        background="linear-gradient(to right, #FFFFFF, #48E3C8)"
        p={4}
      >
        <Text
          fontSize="m"
          fontWeight="bold"
          fontFamily={"Bayon"}
          mb={1}
        >Token Id: {nft.metadata.id}</Text>
        <Text
          fontSize="m"
          fontFamily={"big shoulders text"}
        >Item name: {nft.metadata.name}</Text>
      </Box>
    </Flex>
  )
}