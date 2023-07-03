import {
  Container,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Flex,
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
import { URLS } from '../../config/urls';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function RentedNFT({ nftId }) {
  const { contract: nftCollection } = useContract(NFT_ADDRESS);
  const { data: nft } = useNFT(nftCollection, nftId);

  return nft ? <NFTCard key={nft.metadata.id} nft={nft} /> : null;
}

export default function ProfilePage() {
  const address = useAddress();

  const { data: rentedOutItems, isLoading: rentedOutItemsLoading } = useSWR(
    `${URLS.ITEMS}/get-rented/${address}`,
    fetcher,
  );
  const { data: inPoolItems, isLoading: inPoolItemsLoading } = useSWR(
    `${URLS.ITEMS}/get-in-pool/${address}`,
    fetcher,
  );
  const { data: ownedItems, isLoading: ownedItemsLoading } = useSWR(
    `${URLS.ITEMS}/get-owned/${address}`,
    fetcher,
  );

  return (
    <Container maxW={'90%'} p={5}>
      <SimpleGrid padding={10} columns={5} spacing={5}>
        <Stat>
          <StatLabel fontSize={30} fontFamily={'Manrope'}>
            Items in Pools
          </StatLabel>
          {inPoolItemsLoading ? (
            <Spinner />
          ) : (
            <StatNumber fontSize={30} fontFamily={'Manrope'}>
              {inPoolItems?.itemsInPool?.length}
            </StatNumber>
          )}
        </Stat>
        <Stat>
          <StatLabel fontSize={30} fontFamily={'Manrope'}>
            Items Rented Out
          </StatLabel>
          {rentedOutItemsLoading ? (
            <Spinner />
          ) : (
            <StatNumber fontSize={30} fontFamily={'Manrope'}>
              {rentedOutItems?.itemsRented?.length}
            </StatNumber>
          )}
        </Stat>
        <Stat>
          <StatLabel fontSize={30} fontFamily={'Manrope'}>
            Owned Items
          </StatLabel>
          {ownedItemsLoading ? (
            <Spinner />
          ) : (
            <StatNumber fontSize={30} fontFamily={'Manrope'}>
              {ownedItems?.itemsOwned?.length}
            </StatNumber>
          )}
        </Stat>
        {/* <Stat>
          <StatLabel fontSize={30} fontFamily={'Manrope'}>Total Earnings</StatLabel>
          <StatNumber fontSize={30} fontFamily={'Manrope'}>100</StatNumber>
        </Stat> */}
      </SimpleGrid>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton
            _hover={{
              bg: '#66E383',
              transition: 'background-color 0.2s',
              color: 'white',
            }}
            padding={10}
          >
            <Flex alignItems={'center'} textAlign="left">
              <Box minW={350}>
                <Heading fontSize={40} fontFamily={'Manrope'}>
                  Your Rented Out Items
                </Heading>
              </Box>
              <Box marginLeft={10}>
                <AccordionIcon boxSize={8} />
              </Box>
            </Flex>
          </AccordionButton>
          <AccordionPanel paddingLeft={10} pb={4}>
            <Text fontSize={25} fontFamily={'Manrope'}>
              Items that you own and are currently rented by other players.
            </Text>
            <SimpleGrid
              justifyItems="center"
              justifyContent="center"
              columns={[1, 2, 5]}
              spacing={2}
              maxW={'100%'}
              padding={2}
              my={5}
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
                <Text fontSize={25} fontFamily={'Manrope'}>
                  0 items found
                </Text>
              )}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton
            _hover={{
              bg: '#66E383',
              transition: 'background-color 0.2s',
              color: 'white',
            }}
            padding={10}
          >
            <Flex alignItems={'center'} textAlign="left">
              <Box minW={350}>
                <Heading fontSize={40} fontFamily={'Manrope'}>
                  Your Items in Pools
                </Heading>
              </Box>
              <Box marginLeft={10}>
                <AccordionIcon boxSize={8} />
              </Box>
            </Flex>
          </AccordionButton>
          <AccordionPanel paddingLeft={10} pb={4}>
            <Text fontSize={25} fontFamily={'Manrope'}>
              These are the items you have placed in pools, available for others
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
                <Text fontSize={24} fontFamily={'Manrope'}>
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
