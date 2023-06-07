import {
  Container,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Box,
  Skeleton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stat,
  StatLabel,
  StatNumber,
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

  const { data: rentedOutItems, isLoading: rentedOutItemsLoading } = useSWR(
    `http://localhost:3001/items/get-rented/${address}`,
    fetcher,
  );

  const { data: inPoolItems, isLoading: inPoolItemsLoading } = useSWR(
    `http://localhost:3001/items/get-in-pool/${address}`,
    fetcher,
  );

  const { data: ownedItems, isLoading: ownedItemsLoading } = useSWR(
    `http://localhost:3001/items/get-owned/${address}`,
    fetcher,
  );

  return (
    <Container maxW={'90%'} p={5}>
      <SimpleGrid padding={10} columns={5} spacing={5}>
        <Stat>
          <StatLabel fontSize={30} fontFamily={'Bayon'}>
            Items in Pools
          </StatLabel>
          {inPoolItemsLoading ? (
            <Spinner />
          ) : (
            <StatNumber fontSize={30} fontFamily={'Bayon'}>
              {inPoolItems?.itemsInPool?.length}
            </StatNumber>
          )}
        </Stat>
        <Stat>
          <StatLabel fontSize={30} fontFamily={'Bayon'}>
            Items Rented Out
          </StatLabel>
          {rentedOutItemsLoading ? (
            <Spinner />
          ) : (
            <StatNumber fontSize={30} fontFamily={'Bayon'}>
              {rentedOutItems?.itemsRented?.length}
            </StatNumber>
          )}
        </Stat>
        <Stat>
          <StatLabel fontSize={30} fontFamily={'Bayon'}>
            Owned Items
          </StatLabel>
          {ownedItemsLoading ? (
            <Spinner />
          ) : (
            <StatNumber fontSize={30} fontFamily={'Bayon'}>
              {ownedItems?.itemsOwned?.length}
            </StatNumber>
          )}
        </Stat>
        {/* <Stat>
          <StatLabel fontSize={30} fontFamily={'Bayon'}>Total Earnings</StatLabel>
          <StatNumber fontSize={30} fontFamily={'Bayon'}>100</StatNumber>
        </Stat> */}
      </SimpleGrid>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton
            _hover={{
              bg: '#FBAA0B',
              transition: 'background-color 0.2s',
              color: 'white',
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
              {rentedOutItemsLoading ? (
                [...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={'150px'} width={'250px'} />
                ))
              ) : rentedOutItems?.itemsRented?.length > 0 ? (
                rentedOutItems?.itemsRented?.map((rentedItem) => (
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
              color: 'white',
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
              {inPoolItemsLoading ? (
                [...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={'150px'} width={'250px'} />
                ))
              ) : inPoolItems?.itemsInPool?.length > 0 ? (
                inPoolItems?.itemsInPool?.map((poolItem) => (
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
    </Container>
  );
}
