import {
  Box,
  Heading,
  Container,
  Flex,
  SimpleGrid,
  Button,
  Stack,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { darken } from '@chakra-ui/theme-tools';
import { ThirdwebNftMedia } from '@thirdweb-dev/react';
import { useSigner } from '@thirdweb-dev/react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import {
  NFT_RENT_MARKETPLACE_ADDRESS,
  NFT_ADDRESS,
} from '../../const/addresses';
import React, { useState } from 'react';


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
    try {
      //todo -> improve to not send two tx
      const nftContract = await sdk.getContract(NFT_ADDRESS, 'nft-collection');
      await nftContract.call('approve', [NFT_RENT_MARKETPLACE_ADDRESS, parseInt(nft.metadata.id)])
      const marketplaceContract = await sdk.getContract(NFT_RENT_MARKETPLACE_ADDRESS);
      await marketplaceContract.call('addItemToPool', [parseInt(nft.metadata.id)]);
      toast({
        title: 'Success',
        description: 'Your item is in pool for rent!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Unable to add item to pool.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error adding item to pool:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack align="stretch" padding={'10px'} columns={2} spacing={6}>
      <Box marginTop={'10%'}>
        <Heading textAlign={'center'} fontFamily={'Bayon'} size="xl" mt={2}>
          {nft.metadata.name}
        </Heading>
      </Box>
      <Stack spacing={'20px'}>
        <Box borderRadius={'6px'} overflow={'hidden'}>
          <ThirdwebNftMedia
            metadata={nft.metadata}
            width="100%"
            height="100%"
          />
        </Box>
        <Button
          _hover={{
            bg: darken('#FBAA0B', 15),
            transition: 'background-color 0.2s',
          }}
          _active={{
            transform: 'scale(0.98)',
          }}
          backgroundColor={'#FBAA0B'}
          fontFamily={'Bayon'}
          fontSize={20}
          letterSpacing={0.5}
          isLoading={isLoading}
          color={'white'}
          size="md"
          mt={4}
          onClick={addItemToPool}
        >
          Add Item to Pool
        </Button>
        <Box>
          <Text fontFamily={'bayon'} fontSize={20} fontWeight={'bold'}>
            Description:
          </Text>
          <Text fontFamily={'big shoulders text'} mb={1} fontSize={16}>
            {nft.metadata.description}
          </Text>
        </Box>
        <Box>
          <Text
            marginBottom={4}
            fontFamily={'bayon'}
            fontSize={20}
            fontWeight={'bold'}
          >
            Traits:
          </Text>
          <SimpleGrid columns={2} spacing={4}>
            {Object.entries(nft?.metadata?.attributes || {}).map(
              ([key, value]) => (
                <Flex
                  key={key}
                  direction={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderWidth={1}
                  p={'8px'}
                  borderRadius={'4px'}
                >
                  <Text
                    letterSpacing={0.3}
                    fontSize={'small'}
                    fontFamily={'Bayon'}
                    fontWeight={'bold'}
                    textTransform={'capitalize'}
                  >
                    {value.trait_type}
                  </Text>
                  <Text
                    fontFamily={'big shoulders text'}
                    fontSize={'medium'}
                    textTransform={'uppercase'}
                  >
                    {value.value}
                  </Text>
                </Flex>
              ),
            )}
          </SimpleGrid>
        </Box>
      </Stack>
    </VStack>
  );
}

export const getStaticProps = async (context) => {
  const tokenId = context.params?.tokenId;
  const sdk = new ThirdwebSDK('mumbai');
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
  const sdk = new ThirdwebSDK('mumbai');
  const contract = await sdk.getContract(NFT_ADDRESS, 'nft-collection');
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
    fallback: 'blocking',
  };
};
