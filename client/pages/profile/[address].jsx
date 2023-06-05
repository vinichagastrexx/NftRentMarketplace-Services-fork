import { Container, Heading, Text } from "@chakra-ui/react";
import { useContract, useOwnedNFTs, useAddress } from "@thirdweb-dev/react";
import React from "react";
import { NFT_RENT_MARKETPLACE_ADDRESS, NFT_ADDRESS } from "../../const/addresses";
import useSWR from 'swr';
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProfilePage() {
  const address = useAddress();
  const { data: itemsCurrentlyRented, isLoading: rentedLoading } = useSWR(`http://localhost:3001/items/get-rented/${address}`, fetcher);
  const { data: itemsInPool, isLoading: poolLoading } = useSWR(`http://localhost:3001/items/get-in-pool/${address}`, fetcher);
  console.log(itemsCurrentlyRented);
  console.log(itemsInPool);

  return (
    <Container maxW={"1200px"} p={5}>
      <Heading fontSize={40} fontFamily={"Bayon"}>Your items in Pools</Heading>
      <Text fontSize={25} fontFamily={"Big Shoulders Text"}>Here are your items in pools, waiting to be rented!</Text>
      <Heading fontSize={40} fontFamily={"Bayon"}>Your items that are Rented</Heading>
      <Text fontSize={25} fontFamily={"Big Shoulders Text"}>Here are your items that are currently rented by another player!</Text>
    </Container>
  )
}