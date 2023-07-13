import {
  Box,
  Flex, Icon, Link, Text
} from '@chakra-ui/react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import NextLink from 'next/link';
import { useState } from 'react';
import { GiLockedChest } from 'react-icons/gi';
import { HiHome } from 'react-icons/hi';

export function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const address = useAddress();

  return (
    <Box maxW={'85%'} m={'auto'} py={'14px'} px={'35px'}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Flex direction={'row'}>
          <Link
            as={NextLink}
            href={'/'}
            mx={2.5}
            fontFamily={'Manrope'}
            fontSize={'22'}
            color={activeTab === '/' ? '#66E383' : undefined}
            textDecoration={activeTab === '/' ? 'underline' : undefined}
            onClick={() => setActiveTab('/')}
            _hover={{
              color: '#66E383',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Icon as={HiHome} boxSize={7} />
          </Link>
          <Link
            as={NextLink}
            color={activeTab === '/pools' ? '#66E383' : undefined}
            textDecoration={activeTab === '/pools' ? 'underline' : undefined}
            onClick={() => setActiveTab('/pools')}
            href={'/pools'}
            mx={2.5}
            fontFamily={'Manrope'}
            fontSize={'22'}
            _hover={{
              color: '#66E383',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Text>Pools</Text>
          </Link>
          <Link
            as={NextLink}
            color={activeTab === '/inventory' ? '#66E383' : undefined}
            textDecoration={
              activeTab === '/inventory' ? 'underline' : undefined
            }
            onClick={() => setActiveTab('/inventory')}
            href={'/inventory'}
            mx={2.5}
            fontFamily={'Manrope'}
            fontSize={'22'}
            _hover={{
              color: '#66E383',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Text>Inventory</Text>
          </Link>
            <Link
            as={NextLink}
            color={activeTab === `profile/${address}` ? '#66E383' : undefined}
            textDecoration={
              activeTab === `profile/${address}` ? 'underline' : undefined
            }
            onClick={() => setActiveTab(`profile/${address}`)}
            href={`profile/${address}`}
            mx={2.5}
            fontFamily={'Manrope'}
            fontSize={'22'}
            _hover={{
              color: '#66E383',
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
          >
            <Icon as={GiLockedChest} boxSize={7} />
          </Link>
        </Flex>
        <Flex direction={'row'} alignItems={'center'}>
          <ConnectWallet style={{ fontFamily: 'Manrope' }} />
        </Flex>
      </Flex>
    </Box >
  );
}
