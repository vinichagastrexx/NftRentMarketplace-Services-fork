import { Box, Button, Center, Container, Flex, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { BsDiscord } from 'react-icons/bs'
import { darken } from '@chakra-ui/theme-tools';

export default function Home() {
  return (
    <Container p={0} minW={'100%'}>
      <Flex
        h={'80vh'}
        w={'100%'}
        backgroundImage="url('/bbg_concept.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex
          flex="0.5"
          p={10}
          backgroundColor="rgba(0, 0, 0, 0.48)"
          direction="column"
          justifyContent="center"
          alignItems="start"
        >
          <Text
            marginTop={6}
            letterSpacing={0.25}
            lineHeight={1.1}
            fontSize={50}
            color="white"
            fontFamily={'Bayon'}
          >
            Welcome to Boom Boogers Marketplace!
          </Text>
          <Text
            marginTop={18}
            fontSize={25}
            color="white"
            fontFamily={'Big Shoulders Text'}
          >
            Explore the ultimate NFT rental marketplace! Rent unique items to
            enhance your gaming experience or earn by renting out your own.
          </Text>
          <Flex alignItems="center">
            <Text
              marginTop={18}
              fontSize={25}
              color="#FBAA0B"
              fontFamily={'Big Shoulders Text'}
            >

            </Text>
            <Link href='https://discord.gg/eYpmTe9Dde'>
              <Button
                marginTop={'15px'}
                colorScheme='purple'
                leftIcon={<BsDiscord />} >
                Join the BBG community!
              </Button>
            </Link>
          </Flex>
        </Flex>
        <Box flex="1">
          <Flex h={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Stack spacing={4} align={'center'}>
              <Button
                minW={350}
                letterSpacing={0.5}
                _hover={{
                  bg: darken('#FBAA0B', 15),
                  transition: 'background-color 0.2s',
                }}
                _active={{
                  transform: 'scale(0.98)',
                }}
                backgroundColor={'#FBAA0B'}
                fontFamily={'Bayon'}
                size={'lg'}
                as={NextLink}
                fontSize={25}
                href="/pools"
                color={'white'}
                colorScheme="teal"
              >
                Rent Items
              </Button>
              <Button
                minW={350}
                letterSpacing={0.5}
                _hover={{
                  bg: darken('#FBAA0B', 15),
                  transition: 'background-color 0.2s',
                }}
                _active={{
                  transform: 'scale(0.98)',
                }}
                fontSize={25}
                backgroundColor={'#FBAA0B'}
                fontFamily={'Bayon'}
                size={'lg'}
                as={NextLink}
                href="/inventory"
                color={'white'}
                colorScheme="teal"
              >
                Earn By Renting
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Container >
  );
}
