import { Box, Button, Container, Image, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK, } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import {
  NFT_RENT_MARKETPLACE_ADDRESS,
  NFT_RENT_MARKETPLACE_ABI,
  NFT_ADDRESS
} from "../../const/addresses";
import { config } from '../../config'
import NFTCard from "../../components/NFTCard";

export default function PoolPage({ pool }) {
  const signer = useSigner();
  let sdk;
  if (signer) {
    sdk = ThirdwebSDK.fromSigner(signer);
  }
  const [isLoading, setIsLoading] = useState(false);
  const [nft, setNft] = useState(null);
  const [poolPrice, setPoolPrice] = useState(0);

  const rentItem = async () => {
    setIsLoading(true);
    const contract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS, NFT_RENT_MARKETPLACE_ABI)
    const price = await contract.call("getRentQuote", [1, 1]);
    setPoolPrice(Number(`${price._hex}`))
    const result = await contract.call("startRent", [1, 1], { value: price });
    console.log(result);
    const nftId = result.receipt.events[1].args.itemNftId.toNumber();
    const nft = await getNft(nftId);
    setNft(nft);
    setIsLoading(false);
  };

  const getNft = async (nftId) => {
    const contract = await sdk.getContract(NFT_ADDRESS);
    const nft = await contract.erc721.get(nftId);
    return nft;
  }

  return (
    <Container maxW={"1200px"} p={5} my={5}>
      <SimpleGrid columns={2} spacing={6}>
        <Box>
          <Image src={pool.IMAGEURL} alt={pool.NAME} borderRadius={"6px"} />
          <Heading size="lg" mt={2}>{pool.NAME}</Heading>
        </Box>
        <Box>
          <Text fontSize={40} fontFamily={"Bayon"} fontWeight={"bold"}>Description:</Text>
          <Text fontFamily={"Big Shoulders Text"}>{pool.DESCRIPTION}</Text>
          <Text fontSize={40} fontFamily={"Bayon"} fontWeight={"bold"} mt={2}>Base Price:</Text>
          <Text fontFamily={"Big Shoulders Text"}>{pool.BASEPRICE}</Text>
          <Text fontSize={40} fontFamily={"Bayon"} fontWeight={"bold"} mt={2}>Current Price:</Text>
          <Text fontFamily={"Big Shoulders Text"}>{poolPrice}</Text>
          <Button fontFamily={"Bayon"} isLoading={isLoading} colorScheme="teal" size="md" mt={4} onClick={rentItem}>Rent Item</Button>
        </Box>
      </SimpleGrid>
      {nft && <NFTCard nft={nft} />}
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
