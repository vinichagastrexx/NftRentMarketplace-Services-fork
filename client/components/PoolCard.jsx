import React from 'react';
import { Image, Box, Flex, Text, Divider } from '@chakra-ui/react';

export default function PoolCard({ pool }) {
  return (
    <Flex direction={"column"} maxWidth={250} justifyContent={"center"}>
      <Box overflow={"hidden"} >
        <Image src={pool.IMAGEURL} alt={pool.ID} width={"100%"} objectFit="cover" />
      </Box>
      <Box background="linear-gradient(to right, #ffafbd, #ffc3a0)" p={4}>
        <Text>{pool.CATEGORYTYPE} Pool</Text>
        <Text>Base Price: {pool.BASEPRICE}</Text>
        <Text>Rarity: {pool.RARITY}</Text>
      </Box>
    </Flex>
  )
}
