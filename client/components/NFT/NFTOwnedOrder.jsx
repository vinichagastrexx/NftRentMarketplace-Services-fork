import { Box, Heading, Container, Flex, SimpleGrid, Button, Stack, VStack, Text, useToast } from "@chakra-ui/react";
import { darken } from "@chakra-ui/theme-tools"
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useSigner } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  NFT_RENT_MARKETPLACE_ADDRESS,
  NFT_RENT_MARKETPLACE_ABI,
  NFT_ADDRESS
} from "../../const/addresses";
import React, { useState } from "react";


export default function NFTOwnedOrder({ nft }) {
  const toast = useToast();
  const signer = useSigner();
  let sdk;
  if (signer) {
    sdk = ThirdwebSDK.fromSigner(signer);
  }

  const [isLoading, setIsLoading] = useState(false);
  const addItemToPool = async () => {
    setIsLoading(true);
    // const contract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS, NFT_RENT_MARKETPLACE_ABI)
    try {
      const contract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS)
      await contract.call("addItemToPool", [parseInt(nft.metadata.id), 1]);
      toast({
        title: "Success",
        description: "Your item is in pool for rent!",
        status: "sucess",
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add item to pool.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      console.error('Error adding item to pool:', error);
    } finally {
      setIsLoading(false);
    }
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
            <Button
              _hover={{ bg: darken('#FBAA0B', 15), transition: 'background-color 0.2s' }}
              _active={{
                transform: 'scale(0.98)'
              }}
              backgroundColor={'#FBAA0B'}
              fontFamily={"Bayon"}
              isLoading={isLoading}
              color={"white"}
              size="md"
              mt={4}
              onClick={addItemToPool}
            >
              Add Item to Pool
            </Button>
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