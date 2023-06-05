import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  Box,
  Skeleton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useContract, useNFT, useAddress } from '@thirdweb-dev/react';
import React from 'react';
import { NFT_ADDRESS } from '../../const/addresses';
import useSWR from 'swr';
import NFTCard from '../../components/NFT/NFTCard';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function RentedNFT({ nftId }) {
  const { contract: nftCollection } = useContract(NFT_ADDRESS);
  const { data: nft } = useNFT(nftCollection, nftId);

  return nft ? <NFTCard key={nft.metadata.id} nft={nft} /> : null;
}

export default function ProfilePage() {
  const address = useAddress();

  const { data: rentedItems, isLoading: rentedItemsLoading } = useSWR(
    `http://localhost:3001/items/get-rented/${address}`,
    fetcher,
  );

  const { data: poolItems, isLoading: poolItemsLoading } = useSWR(
    `http://localhost:3001/items/get-in-pool/${address}`,
    fetcher,
  );

  return (
    <Container maxW={'75%'} p={5}>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton
            _hover={{
              bg: '#FBAA0B',
              transition: 'background-color 0.2s',
              color: 'white'
            }}
            colorScheme="teal"
            padding={10}
          >
            <Box flex="1" textAlign="left">
              <Heading fontSize={40} fontFamily={'Bayon'}>
                Your Rented Out Items
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel paddingLeft={10} pb={4}>
            <Text fontSize={25} fontFamily={'Big Shoulders Text'}>
              Items that you own and are currently rented by other players.
            </Text>
            <SimpleGrid
              minChildWidth="200px"
              spacing={2}
              maxW={'100%'}
              padding={2}
              my={4}
            >
              {rentedItemsLoading ? (
                [...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={'150px'} width={'250px'} />
                ))
              ) : rentedItems?.itemsRented?.length > 0 ? (
                rentedItems?.itemsRented?.map((rentedItem) => (
                  <RentedNFT key={rentedItem.NFTID} nftId={rentedItem.NFTID} />
                ))
              ) : (
                <Text fontSize={24} fontFamily={'Big Shoulders Text'}>
                  0 items found
                </Text>
              )}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton
            _hover={{
              bg: '#FBAA0B',
              transition: 'background-color 0.2s',
              color: 'white'
            }}
            padding={10}
          >
            <Box flex="1" textAlign="left">
              <Heading fontSize={40} fontFamily={'Bayon'}>
                Your Items in Pools
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel paddingLeft={10} pb={4}>
            <Text fontSize={25} fontFamily={'Big Shoulders Text'}>
              These are the items you've placed in pools, available for others
              to rent
            </Text>
            <SimpleGrid
              minChildWidth="200px"
              spacing={2}
              maxW={'100%'}
              padding={2}
              my={4}
            >
              {poolItemsLoading ? (
                [...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={'150px'} width={'250px'} />
                ))
              ) : poolItems?.itemsInPool?.length > 0 ? (
                poolItems?.itemsInPool?.map((poolItem) => (
                  <RentedNFT key={poolItem.NFTID} nftId={poolItem.NFTID} />
                ))
              ) : (
                <Text fontSize={24} fontFamily={'Big Shoulders Text'}>
                  0 items found
                </Text>
              )}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container >
  );
}
