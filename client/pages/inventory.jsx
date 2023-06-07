import {
  Container,
  Heading,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  SimpleGrid,
  Skeleton,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import {
  useContract,
  useOwnedNFTs,
  useAddress,
  useNFT,
} from '@thirdweb-dev/react';
import React from 'react';
import NFTGrid from '../components/NFT/NFTGrid';
import NFTCard from '../components/NFT/NFTCard';
import NFTRentedOrder from '../components/NFT/NFTRentedOrder';
import { NFT_ADDRESS } from '../const/addresses';
import useSWR from 'swr';
import NextLink from 'next/link';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function RentedNFT({ nftId, rentData }) {
  const { contract: nftCollection } = useContract(NFT_ADDRESS);
  const { data: rentedNft } = useNFT(nftCollection, nftId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return rentedNft ? (
    <>
      <div onClick={onOpen}>
        <NFTCard key={rentedNft.metadata.id} nft={rentedNft} />
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <NFTRentedOrder nft={rentedNft} rentId={rentData.ID} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  ) : null;
}
export default function Inventory() {
  const address = useAddress();
  const { contract: nftCollection } = useContract(NFT_ADDRESS);
  const { data: ownedNfts, isLoading } = useOwnedNFTs(nftCollection, address);
  const { data: rentedItems, isLoading: rentedItemsLoading } = useSWR(
    `http://localhost:3001/rents/get-active-by-rentee/${address}`,
    fetcher,
  );
  return (
    <Container maxW={'90%'} p={5}>
      <Accordion allowToggle>
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
                Your Owned Items
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel paddingLeft={10} pb={4}>
            {isLoading ? (
              <></>
            ) : ownedNfts?.length > 0 ? (
              <Text fontSize={25} fontFamily={'Big Shoulders Text'}>
                These are the game items you own. Put them in a pool and start
                generating income!
              </Text>
            ) : (
              <div>
                <Text fontSize={25} fontFamily={'Big Shoulders Text'}>
                  You don't have any Items! Check the available Pools and rent
                  some items to play!
                </Text>
                <Button
                  letterSpacing={0.5}
                  marginTop={5}
                  size={'lg'}
                  as={NextLink}
                  colorScheme="teal"
                  href="/pools"
                  color={'white'}
                >
                  Rent incredible Items
                </Button>
              </div>
            )}
            <NFTGrid isLoading={isLoading} data={ownedNfts} />
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
                Your Rented Items
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel paddingLeft={10} pb={4}>
            {rentedItems?.rents.length > 0 ? (
              <Text fontSize={25} fontFamily={'Big Shoulders Text'}>
                These are the items you are currently renting from other players
                for use in the game.
              </Text>
            ) : (
              <></>
            )}
            <SimpleGrid
              justifyItems='center'
              justifyContent="center"
              columns={[1, 2, 5]}
              spacing={2}
              maxW={'100%'}
              padding={2}
              my={5}
            >
              {rentedItemsLoading ? (
                [...Array(3)].map((_, index) => (
                  <Skeleton key={index} height={'150px'} width={'250px'} />
                ))
              ) : rentedItems?.rents.length > 0 ? (
                rentedItems?.rents?.map((rentedItem) => (
                  <RentedNFT
                    key={rentedItem.NFTID}
                    nftId={rentedItem.NFTID}
                    rentData={rentedItem}
                  />
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
