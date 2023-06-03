import { Box, Button, Container, Image, Heading, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useSigner, useAddress } from "@thirdweb-dev/react";
import { ThirdwebSDK, } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import {
  NFT_RENT_MARKETPLACE_ADDRESS,
  NFT_RENT_MARKETPLACE_ABI
} from "../../const/addresses";
import { config } from '../../config'

export default function PoolPage({ pool }) {
  const signer = useSigner();
  let sdk;
  if (signer) {
    sdk = ThirdwebSDK.fromSigner(signer);
  }
  const [isLoading, setIsLoading] = useState(false);
  // const [nft, setNft] = useState(null);

  const rentItem = async () => {
    setIsLoading(true);
    const contract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS, NFT_RENT_MARKETPLACE_ABI)
    const result = await contract.call("startRent", [1, 1]);
    console.log(result);
    setIsLoading(false);
  };

  return (
    <Container maxW={"1200px"} p={5} my={5}>
      <SimpleGrid columns={2} spacing={6}>
        <Box>
          <Image src={pool.IMAGEURL} alt={pool.NAME} borderRadius={"6px"} />
          <Heading size="lg" mt={2}>{pool.NAME}</Heading>
        </Box>
        <Box>
          <Text fontWeight={"bold"}>Description:</Text>
          <Text>{pool.DESCRIPTION}</Text>
          <Text fontWeight={"bold"} mt={2}>Base Price:</Text>
          <Text>{pool.BASEPRICE}</Text>
          <Button isLoading={isLoading} colorScheme="teal" size="md" mt={4} onClick={rentItem}>Rent Item</Button>
        </Box>
      </SimpleGrid>
      {/* {nft && <NFTCard nft={nft} />} */}
    </Container >
  )
};

export const getStaticProps = async (context) => {
  const poolId = context.params?.poolId;
  const response = await fetch(`${config.apiBaseUrl}pools/${poolId}`);
  const { pool } = await response.json();

  return {
    props: {
      pool,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const response = await fetch(`${config.apiBaseUrl}pools/get-all`);
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
