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
      <SimpleGrid minChildWidth='200px' spacing={2} maxW={"100%"} padding={2} my={4}>
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <Skeleton key={index} height={"150px"} width={"250px"} />
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
