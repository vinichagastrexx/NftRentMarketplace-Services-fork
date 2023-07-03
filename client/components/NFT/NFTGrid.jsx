import {
  SimpleGrid,
  Skeleton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Text,
} from '@chakra-ui/react';
import NFTCard from './NFTCard';
import NFTOwnedOrder from './NFTOwnedOrder';
import { useState } from 'react';

export default function NFTGrid({ isLoading, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNft, setSelectedNft] = useState(null);

  const handleNFTClick = (nft) => {
    setSelectedNft(nft);
    onOpen();
  };
  return (
    <>
      <SimpleGrid
        justifyItems="center"
        justifyContent="center"
        columns={[1, 2, 5]}
        spacing={2}
        maxW={'100%'}
        padding={2}
        my={5}
      >
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <Skeleton key={index} height={'150px'} width={'250px'} />
          ))
        ) : data && data.length > 0 ? (
          data.map((nft) => (
            <div key={nft.metadata.id} onClick={() => handleNFTClick(nft)}>
              <NFTCard nft={nft}></NFTCard>
            </div>
          ))
        ) : (
          <Text fontSize={24} fontFamily={'Manrope'}>
            0 items found
          </Text>
        )}
      </SimpleGrid>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
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
  );
}
