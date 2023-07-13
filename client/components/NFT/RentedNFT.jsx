import { NFT_BBG_ADDRESS, NFT_CS_ADDRESS } from '../../const/addresses';
import { useContract, useNFT } from '@thirdweb-dev/react';
import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from '@chakra-ui/react';
import NFTCard from './NFTCard';
import NFTRentedOrder from './NFTRentedOrder';

export default function RentedNFT({ nftId, rentData }) {
  const nftAddresses = {
    1: NFT_BBG_ADDRESS,
    2: NFT_CS_ADDRESS,
  }

  const nftAddress = nftAddresses[rentData.gameid]
  const { contract: nftCollection } = useContract(nftAddress);
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
              <NFTRentedOrder nft={rentedNft} rentId={rentData.id} nftAddress={nftAddress} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  ) : null;
}