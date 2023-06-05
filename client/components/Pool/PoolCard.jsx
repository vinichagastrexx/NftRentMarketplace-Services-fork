import React from 'react';
import { Image, Box, Flex, Text, Divider } from '@chakra-ui/react';

export default function PoolCard({ pool }) {
  return (
    <Flex
      overflow={'hidden'}
      borderRadius={'10px'}
      border={'1px'}
      direction={'column'}
      maxWidth={200}
      justifyContent={'center'}
    >
      <Box>
        <Image
          src={pool.IMAGEURL}
          alt={pool.ID}
          width={'100%'}
          objectFit="cover"
        />
      </Box>
      <Box background="linear-gradient(to right, #FFFFFF, #48E3C8)" p={4}>
        <Text fontSize="m" fontWeight="bold" fontFamily={'Bayon'} mb={1}>
          {pool.CATEGORYTYPE} Pool
        </Text>
        <Text fontSize="m" fontFamily={'big shoulders text'} mb={1}>
          Base Price: {pool.BASEPRICE}
        </Text>
        <Text fontSize="m" fontFamily={'big shoulders text'} mb={1}>
          Rarity: {pool.RARITY}
        </Text>
      </Box>
    </Flex>
  );
}
