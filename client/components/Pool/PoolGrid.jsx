import { SimpleGrid, Skeleton, Text, useDisclosure } from '@chakra-ui/react';
import PoolCard from './PoolCard';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from '@chakra-ui/react';
import { useState } from 'react';
import PoolOrder from './PoolOrder';

export default function PoolGrid({ isLoading, data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPool, setSelectedPool] = useState(null);

  const handlePoolClick = (pool) => {
    setSelectedPool(pool);
    onOpen();
  };

  return (
    <>
      <SimpleGrid
        justifyItems="center"
        justifyContent="center"
        columns={[1, 2, 3]}
        spacing={10}
        maxW={'100%'}
        padding={4}
        my={2}
      >
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <Skeleton key={index} height={'150px'} width={'250px'} />
          ))
        ) : data && data.length > 0 ? (
          data.map((pool) => (
            <div key={pool.categoryid} onClick={() => handlePoolClick(pool)}>
              <PoolCard pool={pool}></PoolCard>
            </div>
          ))
        ) : (
          <Text fontSize={25} fontFamily={'Manrope'}>
            0 pools found
          </Text>
        )}
      </SimpleGrid>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              {selectedPool && <PoolOrder pool={selectedPool} />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
