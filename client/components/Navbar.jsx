import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";
import { Link, Text, Box, Flex, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Button } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { darken } from "@chakra-ui/theme-tools"

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recommendation, setRecommendation] = useState(null);
  const address = useAddress();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (address) {
        try {
          const response = await fetch(`http://localhost:3001/recommendations/${address}`);
          const data = await response.json();
          if (data.recommendations.length > 0) {
            setRecommendation(data.recommendations[0]);
            onOpen();
          }
        } catch (error) {
          console.error('Failed to fetch recommendations:', error);
        }
      }
    };
    fetchRecommendations();
  }, [address]);

  return (
    <Box maxW={"1280px"} m={"auto"} py={"10px"} px={"40px"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Link as={NextLink} href={'/'}>
          <Image objectFit="contain" src="/logo_bbg.png" obj alt="Logo" boxSize="100px" mr="20px" width={"100%"} />
        </Link>
        <Flex direction={"row"}>
          <Link as={NextLink} href={'/pools'} mx={2.5} fontFamily={"Bayon"} fontSize={"22"}>
            <Text>Pools</Text>
          </Link>
          <Link as={NextLink} href={'/inventory'} mx={2.5} fontFamily={"Bayon"} fontSize={"22"}>
            <Text>Inventory</Text>
          </Link>
          <Link as={NextLink} href={'https://boomboogers.com.br/'} mx={2.5} fontFamily={"Bayon"} fontSize={"22"}>
            <Text>Know the game!</Text>
          </Link>
        </Flex>
        <Flex direction={"row"} alignItems={"center"}>
          <ConnectWallet />
        </Flex>
      </Flex>

      {recommendation && <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent padding={4}>
          <ModalHeader
            fontSize="xl"
            fontWeight="bold"
            fontFamily={"Bayon"}
            mb={1}
          >Welcome back, Gamer!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontSize="lg"
              fontFamily={"Bayon"}
              mb={1}
            >We've analyzed your profile and found some personalized recommendations for you:</Text>
            <Text
              marginTop={4}
              fontSize="m"
              fontFamily={"Big Shoulders Text"}
              mb={1}
            >{recommendation.text}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              _hover={{ bg: darken('#FBAA0B', 15), transition: 'background-color 0.2s' }}
              _active={{
                transform: 'scale(0.98)'
              }}
              backgroundColor={'#FBAA0B'}
              fontFamily={"Bayon"}
              color={"white"}
              mr={3}
              as={NextLink}
              href={recommendation.type === 3 ? '/inventory' : '/pools'}
              onClick={onClose}
            >
              {recommendation.callToAction}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >}
    </Box >
  );
}