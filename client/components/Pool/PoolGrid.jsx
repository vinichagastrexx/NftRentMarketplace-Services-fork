import { SimpleGrid, Skeleton, Text, useDisclosure } from "@chakra-ui/react";
import PoolCard from "./PoolCard";
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from "@chakra-ui/react";
import { useState } from 'react';
import PoolOrder from "./PoolOrder";

export default function PoolGrid({
  isLoading,
  data,
  overrideOnclickBehaviour,
  emptyText = "No pools found"
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPool, setSelectedPool] = useState(null);

  const handlePoolClick = (pool) => {
    setSelectedPool(pool);
    onOpen();
  };

  return (
    <>
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={'40px'} maxW={"1280px"} padding={2.5} my={5}>
        {isLoading ? (
          [...Array(12)].map((_, index) => (
            <Skeleton key={index} height={"312px"} width={"100%"} />
          ))
        ) : data && data.length > 0 ? (
          data.map((pool) => (
            <div key={pool.ID} onClick={() => handlePoolClick(pool)}>
              <PoolCard pool={pool}></PoolCard>
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
              {selectedPool && <PoolOrder pool={selectedPool} />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}
