import { Box, Button, Container, Flex, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { ThirdwebNftMedia, useContract } from "@thirdweb-dev/react";
import { ThirdwebSDK, } from "@thirdweb-dev/sdk";
import React from "react";
import {
  NFT_RENT_MARKETPLACE_ADDRESS
} from "../../const/addresses";


export default function PoolPage({ pool }) {
  const { NFTRentMarketplace } = useContract(NFT_RENT_MARKETPLACE_ADDRESS);

  const rentItem = async () => {
    // Aqui você pode adicionar a lógica para interagir com o contrato NFTRentMarketplace
    // e adicionar um item à pool.
  };

  return (
    <Container maxW={"1200px"} p={5} my={5}>
      <SimpleGrid columns={2} spacing={6}>
        <Stack spacing={"20px"}>
          <Box borderRadius={"6px"} overflow={"hidden"}>
            {pool.IMAGEURL}
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Description:</Text>
            <Text>{pool.description}</Text>
          </Box>
        </Stack>
      </SimpleGrid>
      <Button onClick={rentItem}>Rent Item</Button>
    </Container >
  )
};

export const getStaticProps = async (context) => {
  const poolId = context.params?.poolId;
  const response = await fetch(`http://localhost:3001/pools/${poolId}`);
  const { pool } = await response.json();
  return {
    props: {
      pool,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const response = await fetch('http://localhost:3001/pools/get-all');
  const data = await response.json()
  const paths = data?.pools?.map((pool) => {
    return {
      params: {
        poolId: String(pool.ID),
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
