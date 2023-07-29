import { Box, Flex, Icon, Link, Text, Button } from '@chakra-ui/react';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { GiLockedChest } from 'react-icons/gi';
import { HiHome } from 'react-icons/hi';
import { magic } from '../lib/magic';
import { ethers } from 'ethers';

export function Navbar() {
  const [activeTab, setActiveTab] = useState('');
  const address = useAddress();
  const [web3, setWeb3] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initWeb3 = async () => {
      const provider = await magic.wallet.getProvider();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      setWeb3(web3Provider);
    };

    initWeb3().catch(console.error);
  }, []);

  const login = async () => {
    const accounts = await magic.wallet.connectWithUI();
    console.log('-----accounts', accounts);
    setIsConnected(true);
  };

  const logout = async () => {
    await magic.wallet.disconnect();
    setIsConnected(false);
  };

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
          {/* <ConnectWallet style={{ fontFamily: 'Manrope' }} /> */}
          {!isConnected ? (
            <Button style={{ fontFamily: 'Manrope' }} onClick={login}>
              Login
            </Button>
          ) : (
            <Button style={{ fontFamily: 'Manrope' }} onClick={logout}>
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
