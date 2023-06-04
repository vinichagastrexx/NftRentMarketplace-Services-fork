import { SimpleGrid, Skeleton, Link, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from "@chakra-ui/react";
import NFTCard from "./NFTCard";
import { NFT_ADDRESS } from "../../const/addresses";
// import NFTRentedOrder from "./NFTRentedOrder";
import { useState } from 'react';
import NFTOwnedOrder from './NFTOwnedOrder'

export default function NFTGrid({
  isLoading,
  data,
  emptyText = "No NFTs found"
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);

  const handleNFTClick = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };
  return (
    <>
      <SimpleGrid columns={[5, null, 3]} spacing={6} maxW={"1280px"} padding={2.5} my={5}>
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <Skeleton key={index} height={"312px"} width={"100%"} />
          ))
        ) : data && data.length > 0 ? (
          data.map((nft) => (
            <div key={nft.metadata.id} onClick={() => handleNFTClick(nft)}>
              <NFTCard nft={nft}></NFTCard>
            </div>

          ))
        ) : (
          <Text>{emptyText}</Text>
        )}
      </SimpleGrid>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              {selectedNft && <NFTOwnedOrder nft={selectedNft} />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}