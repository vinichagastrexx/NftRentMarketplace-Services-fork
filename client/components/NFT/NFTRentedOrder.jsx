import { Box, Heading, Container, Flex, SimpleGrid, Button, Stack, VStack, Text } from "@chakra-ui/react";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  NFT_RENT_MARKETPLACE_ADDRESS,
  NFT_RENT_MARKETPLACE_ABI,
  NFT_ADDRESS
} from "../../const/addresses";
import React, { useState } from "react";


export default function NFTRentedOrder({ nft, rentId }) {
  console.log(rentId)
  const signer = useSigner();
  let sdk;
  if (signer) {
    sdk = ThirdwebSDK.fromSigner(signer);
  }

  const [isLoading, setIsLoading] = useState(false);
  const addItemToPool = async () => {
    setIsLoading(true);
    const contract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS, NFT_RENT_MARKETPLACE_ABI)
    await contract.call("finishRent", [rentId]);
    setIsLoading(false);
  };

  return (
    <Container maxW={"1200px"} p={5} my={5}>
      <VStack columns={2} spacing={6}>
        <Box marginTop={"20%"}>
          <Heading fontFamily={"Bayon"} size="xl" mt={2}>{nft.metadata.name}</Heading>
        </Box>
        <Stack spacing={"20px"}>
          <Box borderRadius={"6px"} overflow={"hidden"}>
            <ThirdwebNftMedia
              metadata={nft.metadata}
              width="100%"
              height="100%"
            />
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Description:</Text>
            <Text>{nft.metadata.description}</Text>
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Traits:</Text>
            <SimpleGrid columns={2} spacing={4}>
              {Object.entries(nft?.metadata?.attributes || {}).map(
                ([key, value]) => (
                  <Flex key={key} direction={"column"} alignItems={"center"} justifyContent={"center"} borderWidth={1} p={"8px"} borderRadius={"4px"}>
                    <Text fontSize={"small"}>{value.trait_type}</Text>
                    <Text fontSize={"small"} fontWeight={"bold"}>{value.value}</Text>
                  </Flex>
                )
              )}
            </SimpleGrid>
          </Box>
        </Stack>

        <Stack spacing={"20px"}>
          <Box mx={2.5}>
            <Button fontFamily={"Bayon"} isLoading={isLoading} colorScheme="teal" size="md" mt={4} onClick={addItemToPool}>Finish Rent</Button>
          </Box>
        </Stack>
      </VStack>

    </Container >
  )
};

export const getStaticProps = async (context) => {
  const tokenId = context.params?.tokenId;
  const sdk = new ThirdwebSDK("mumbai");
  const contract = await sdk.getContract(NFT_ADDRESS);
  const nft = await contract.erc721.get(tokenId);
  return {
    props: {
      nft,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const sdk = new ThirdwebSDK("mumbai");
  const contract = await sdk.getContract(NFT_ADDRESS, "nft-collection");
  const nfts = await contract.getAll();
  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: NFT_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};