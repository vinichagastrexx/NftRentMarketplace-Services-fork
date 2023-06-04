import { Box, Button, VStack, Image, Heading, Text } from "@chakra-ui/react";
import { useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK, } from "@thirdweb-dev/sdk";
import React, { useState, useEffect } from "react";
import {
  NFT_RENT_MARKETPLACE_ADDRESS,
  NFT_RENT_MARKETPLACE_ABI,
  NFT_ADDRESS
} from "../../const/addresses";
import NFTCard from "../NFT/NFTCard";

export default function PoolOrder({ pool }) {
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
    <VStack spacing={6} align="stretch" padding={'10px'}>
      <Box marginTop={"20%"}>
        <Heading fontFamily={"Bayon"} size="xl" mt={2}>{pool.CATEGORYTYPE} Pool</Heading>
        <Text fontSize={20} fontFamily={"Big Shoulders Text"} fontWeight={"bold"}>Rarity: {pool.RARITY}</Text>
      </Box>
      <Box >
        <Image src={pool.IMAGEURL} alt={pool.NAME} borderRadius={"6px"} />
      </Box>
      <Box>
        <Text fontSize={20} fontFamily={"Bayon"} fontWeight={"bold"}>Description:</Text>
        <Text fontFamily={"Big Shoulders Text"}>{pool.DESCRIPTION}</Text>
        <Text fontSize={20} fontFamily={"Bayon"} fontWeight={"bold"} mt={2}>Base Price:</Text>
        <Text fontFamily={"Big Shoulders Text"}>{pool.BASEPRICE}</Text>
        <Button fontFamily={"Bayon"} isLoading={isLoading} colorScheme="teal" size="sm" mt={2} onClick={rentItem}>Rent Item</Button>
      </Box>
      {nft && <NFTCard nft={nft} />}
    </VStack>
  )
};
