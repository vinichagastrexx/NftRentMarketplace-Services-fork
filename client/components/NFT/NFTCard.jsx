import React from 'react';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export default function NFTCard({ nft }) {
  const boxShadowColor = useColorModeValue('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)');
  const background = nft?.metadata?.attributes[3]?.value === 'common' ?
    'linear-gradient(to right, #523b26 0%, #b55d0b 100%)' :
    'linear-gradient(to right, #265eed 0%, #01164d 100%)';
  return (
    <Flex
      overflow={'hidden'}
      borderRadius={'10px'}
      border={'1px'}
      direction={'column'}
      maxWidth={200}
      justifyContent={'center'}
      transition="0.3s"
      boxShadow={`0px 10px 15px ${boxShadowColor}`}
      _hover={{ transform: 'scale(1.05)' }}
    >
      <Box>
        <ThirdwebNftMedia
          width="200px"
          height="150px"
          style={{}}
          metadata={nft.metadata}
        />
      </Box>
      <Box textAlign={'center'} background={background} p={4}>
        <Text fontSize="m" color={'white'} fontWeight="bold" fontFamily={'Bayon'} mb={1}>
          {nft.metadata.name}
        </Text>
      </Box>
    </Flex>
  );
}
