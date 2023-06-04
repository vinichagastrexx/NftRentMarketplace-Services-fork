import { Container, Heading, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, SimpleGrid, Skeleton, Button } from '@chakra-ui/react';
import { useContract, useOwnedNFTs, useAddress, useNFT } from '@thirdweb-dev/react';
import React from 'react';
import NFTGrid from '../components/NFT/NFTGrid';
import NFTCard from '../components/NFT/NFTCard';
import NFTRentedOrder from '../components/NFT/NFTRentedOrder';
import { NFT_ADDRESS } from '../const/addresses';
import useSWR from 'swr';
import NextLink from 'next/link'

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function RentedNFT({ nftId, rentData, isLoading }) {
  const { contract: nftCollection } = useContract(NFT_ADDRESS);
  const { data: rentedNft } = useNFT(nftCollection, nftId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return rentedNft ? (
    <>
      <div onClick={onOpen}>
        <NFTCard key={rentedNft.metadata.id} nft={rentedNft} />
      </div>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>NFT Details</DrawerHeader>
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
  const { data: ownedNfts, isLoading } = useOwnedNFTs(
    nftCollection,
    address
  );
  const { data: rentedItems, isLoading: rentedItemsLoading } = useSWR(`http://localhost:3001/rents/get-active-by-rentee/${address}`, fetcher);
  return (
    <Container maxW={"75%"} p={5}>
      <Heading fontSize={40} fontFamily={"Bayon"}>Your Items</Heading>
      {ownedNfts ? (
        <Text fontSize={25} fontFamily={"Big Shoulders Text"}>Here are your Game Items. Add them to a pool and earn some money!</Text>
      ) : (
        <div>
          <Text fontSize={25} fontFamily={"Big Shoulders Text"}>You don't have any Items! Check the available Pools and Rent some items to play!</Text>
          <Button marginTop={5} size={'lg'} as={NextLink} href='/pools'>
            Rent incredible Items
          </Button>
        </div>)}
      <NFTGrid
        isLoading={isLoading}
        data={ownedNfts}
      />
      <Heading fontSize={40} fontFamily={"Bayon"}>Items that you Rented</Heading>
      {rentedItems?.rents.length > 0 ? <Text fontSize={25} fontFamily={"Big Shoulders Text"}>Here are Items that you have rented and can use in game</Text> : <></>}
      <SimpleGrid minChildWidth='200px' spacing={2} maxW={"100%"} padding={2} my={4}>
        {rentedItemsLoading ? [...Array(3)].map((_, index) => (
          <Skeleton key={index} height={"150px"} width={"250px"} />
        )) : rentedItems?.rents.length > 0 ? rentedItems?.rents?.map(rentedItem => <RentedNFT key={rentedItem.NFTID} nftId={rentedItem.NFTID} rentData={rentedItem} isLoading={rentedItemsLoading} />) : (<Text fontSize={24} fontFamily={"Big Shoulders Text"}>0 items found</Text>)}
      </SimpleGrid>
    </Container >
  )
}
