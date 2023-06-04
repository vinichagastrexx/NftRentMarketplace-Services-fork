import React from 'react';
import { Image, Box, Flex, Text, Divider } from '@chakra-ui/react';

export default function PoolCard({ pool }) {
  return (
    <Flex overflow={"hidden"} borderRadius={'10px'} border={'1px'} direction={"column"} maxWidth={200} justifyContent={"center"}>
      <Box>
        <Image src={pool.IMAGEURL} alt={pool.ID} width={"100%"} objectFit="cover" />
      </Box>
      <Box background="linear-gradient(to right, #ffafbd, #ffc3a0)" p={4}>
        <Text fontSize={18} fontFamily={"Big Shoulders Text"}>{pool.CATEGORYTYPE} Pool</Text>
        <Text fontSize={18} fontFamily={"Big Shoulders Text"}>Base Price: {pool.BASEPRICE}</Text>
        <Text fontSize={18} fontFamily={"Big Shoulders Text"}>Rarity: {pool.RARITY}</Text>
      </Box>
    </Flex >
  )
}
