import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import NextLink from 'next/link';
import { HiHome } from 'react-icons/hi';
import { GiLockedChest } from 'react-icons/gi';
import {
  Link,
  Icon,
  Text,
  Box,
  Flex,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { darken } from '@chakra-ui/theme-tools';

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recommendation, setRecommendation] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const address = useAddress();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (address) {
        try {
          const response = await fetch(
            `http://localhost:3001/recommendations/${address}`,
          );
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
    <Box maxW={'85%'} m={'auto'} py={'14px'} px={'35px'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Link as={NextLink} href={'/'}>
          <Image
            objectFit="contain"
            src="/logo_bbg.png"
            obj
            alt="Logo"
            boxSize="100px"
            mr="20px"
            width={'100%'}
          />
        </Link>
        <Flex direction={'row'}>
          <Link
            as={NextLink}
            href={'/'}
            mx={2.5}
            fontFamily={'Bayon'}
            fontSize={'22'}
            color={activeTab === '/' ? '#FBAA0B' : undefined}
            textDecoration={activeTab === '/' ? 'underline' : undefined}
            onClick={() => setActiveTab('/')}
            _hover={{
              color: '#FBAA0B',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Icon as={HiHome} boxSize={7} />
          </Link>
          <Link
            as={NextLink}
            color={activeTab === '/pools' ? '#FBAA0B' : undefined}
            textDecoration={activeTab === '/pools' ? 'underline' : undefined}
            onClick={() => setActiveTab('/pools')}
            href={'/pools'}
            mx={2.5}
            fontFamily={'Bayon'}
            fontSize={'22'}
            _hover={{
              color: '#FBAA0B',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Text>Pools</Text>
          </Link>
          <Link
            as={NextLink}
            color={activeTab === '/inventory' ? '#FBAA0B' : undefined}
            textDecoration={
              activeTab === '/inventory' ? 'underline' : undefined
            }
            onClick={() => setActiveTab('/inventory')}
            href={'/inventory'}
            mx={2.5}
            fontFamily={'Bayon'}
            fontSize={'22'}
            _hover={{
              color: '#FBAA0B',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Text>Inventory</Text>
          </Link>
          <Link
            as={NextLink}
            href={'https://boomboogers.com.br/'}
            mx={2.5}
            fontFamily={'Bayon'}
            fontSize={'22'}
            _hover={{
              color: '#FBAA0B',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Text>Discover BBG</Text>
          </Link>
        </Flex>
        <Flex direction={'row'} alignItems={'center'}>
          <ConnectWallet style={{ fontFamily: 'Bayon' }} />
          {address && (
            <Link as={NextLink} href={`/profile/${address}`}>
              <Icon
                as={GiLockedChest}
                boxSize={8}
                ml={'35px'}
                color={activeTab === '/profile' ? '#FBAA0B' : undefined}
                textDecoration={
                  activeTab === '/pools' ? 'underline' : undefined
                }
                onClick={() => setActiveTab('/profile')}
              />
            </Link>
          )}
        </Flex>
      </Flex>

      {recommendation !== null && (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent borderRadius={'15px'} padding={4}>
            <ModalHeader
              fontSize={28}
              fontWeight="bold"
              fontFamily={'Bayon'}
              mb={1}
            >
              Welcome back Gamer!
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontSize="lg" fontFamily={'Bayon'} mb={1}>
                We've analyzed your profile and found some personalized
                recommendations for you:
              </Text>
              <Text
                marginTop={4}
                fontSize="m"
                fontFamily={'Big Shoulders Text'}
                mb={1}
              >
                {recommendation.text}
              </Text>
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
              <Button
                _hover={{
                  bg: darken('#FBAA0B', 15),
                  transition: 'background-color 0.2s',
                }}
                _active={{
                  transform: 'scale(0.98)',
                }}
                backgroundColor={'#FBAA0B'}
                fontFamily={'Bayon'}
                color={'white'}
                mr={3}
                as={NextLink}
                letterSpacing={0.5}
                href={recommendation.type === 3 ? '/inventory' : '/pools'}
                onClick={onClose}
              >
                {recommendation.callToAction}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
