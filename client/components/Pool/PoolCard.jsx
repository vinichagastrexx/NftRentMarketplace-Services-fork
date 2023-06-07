import React from 'react';
import { Image, Box, Flex, Text, Divider, useColorModeValue } from '@chakra-ui/react';

export default function PoolCard({ pool }) {
  const boxShadowColor = useColorModeValue('rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)');
  const hoverTransition = 'all 0.25s ease-in-out';

  const background = pool.RARITY === 'Common'
    ? 'linear-gradient(to right, #523b26 0%, #b55d0b 100%)'
    : 'linear-gradient(to right, #265eed 0%, #01164d 100%)';

  return (
    <Flex
      overflow={'hidden'}
      borderRadius={'10px'}
      border={'0px'}
      background={background}
      direction={'column'}
      maxWidth={250}
      justifyContent={'center'}
      boxShadow={`0px 10px 15px ${boxShadowColor}`}
      transition={hoverTransition}
      _hover={{
        transform: 'scale(1.05)',
      }}
    >
      <Box backgroundColor={'white'}>
        <Image
          src={pool.IMAGEURL}
          alt={pool.ID}
          width={'100%'}
          transition={hoverTransition}
        />
      </Box>
      <Box textAlign="center" p={4}>
        <Text color={'white'} fontSize={20} fontWeight="bold" fontFamily={'Bayon'} mb={1}>
          {pool.CATEGORYTYPE}
        </Text>
        <Text color={'white'} fontSize={25} fontFamily={'big shoulders text'} mb={1}>
          {pool.RARITY}
        </Text>
      </Box>
    </Flex>
  );
}
