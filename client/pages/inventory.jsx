import { Container, Heading, Text } from '@chakra-ui/react';
import { useContract, useOwnedNFTs, useAddress, useNFT } from '@thirdweb-dev/react';
import React, { useState, useEffect } from 'react';
import NFTGrid from '../components/NFTGrid';
import NFTCard from '../components/NFTCard';
import { NFT_ADDRESS } from '../const/addresses';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Inventory() {
  const address = useAddress();
  const { contract: nftCollection } = useContract(NFT_ADDRESS);
  const { data: ownedNfts, isLoading } = useOwnedNFTs(
    nftCollection,
    address
  );
  const [rentedNfts, setRentedNfts] = useState(null);
  const { data: rentedItem, isLoading: getRentedItems } = useSWR(`http://localhost:3001/rents/get-by-rentee/${address}`, fetcher);

  const rentedNftId = rentedItem?.rents[0]?.NFTID;
  const { data: rentedNftsData } = useNFT(nftCollection, rentedNftId);

  useEffect(() => {
    if (rentedNftsData) {
      setRentedNfts(rentedNftsData);
    }
  }, [rentedNftsData]);

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
      {rentedNfts && <NFTCard
        nft={rentedNfts}
      />}
    </Container>
  )
}