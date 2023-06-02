import { SimpleGrid, Skeleton, Link } from "@chakra-ui/react";
import NFTCard from "./NFTCard";
import NextLink from "next/link"
import { NFT_ADDRESS } from "../const/addresses";

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehaviour,
  emptyText = "No NFTs found"
}) {
  return (
    <SimpleGrid columns={4} spacing={6} w={"100%"} padding={2.5} my={5}>
      {isLoading ? (
        [...Array(20)].map((_, index) => (
          <Skeleton key={index} height={"312px"} width={"100%"} />
        ))
      ) : data && data.length > 0 ? (
        data.map((nft) => !overrideOnclickBehaviour ? (
          <Link href={`/token/${NFT_ADDRESS}/${nft.metadata.id}`} key={nft.metadata.id}>
            <NFTCard nft={nft}></NFTCard>
          </Link>
        ) : (
          <div key={nft.metadata.id} onClick={() => overrideOnclickBehaviour(nft)}>
            <NFTCard nft={nft}></NFTCard>
          </div>
        ))
      ) : (
        <Text>{emptyText}</Text>
      )}
    </SimpleGrid>
  )
}