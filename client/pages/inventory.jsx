import { Container, Heading, Text, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useContract, useOwnedNFTs, useAddress, useNFT } from '@thirdweb-dev/react';
import React from 'react';
import NFTGrid from '../components/NFT/NFTGrid';
import NFTCard from '../components/NFT/NFTCard';
import NFTRentedOrder from '../components/NFT/NFTRentedOrder';
import { NFT_ADDRESS } from '../const/addresses';
import useSWR from 'swr';

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
  const { data: rentedItems, isLoading: rentedItemsLoading } = useSWR(`http://localhost:3001/rents/get-by-rentee/${address}`, fetcher);
  return (
    <Container maxW={"75%"} p={5}>
      <Heading fontSize={40} fontFamily={"Bayon"}>Your Items</Heading>
      <Text fontSize={25} fontFamily={"Big Shoulders Text"}>Here are your Game Items. Add them to a pool and earn some money!</Text>
      <NFTGrid
        isLoading={isLoading}
        data={ownedNfts}
        emptyText={"You have no Items"}
      />
      <Heading fontSize={40} fontFamily={"Bayon"}>Items that you Rented</Heading>
      <Text fontSize={25} fontFamily={"Big Shoulders Text"}>Here are Items that you have rented and can use in game</Text>
      <SimpleGrid columns={[5, null, 3]} spacing={6} maxW={"1280px"} padding={2.5} my={5}>
        {rentedItemsLoading ? [...Array(3)].map((_, index) => (
          <Skeleton key={index} height={"312px"} width={"100%"} />
        )) : rentedItems?.rents.map(rentedItem => <RentedNFT key={rentedItem.NFTID} nftId={rentedItem.NFTID} rentData={rentedItem} isLoading={rentedItemsLoading} />)}
      </SimpleGrid>
    </Container>
  )
}
