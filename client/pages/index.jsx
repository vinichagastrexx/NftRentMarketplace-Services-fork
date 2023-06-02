import { ConnectWallet } from "@thirdweb-dev/react";
import { Box, Button, Container, Flex, Stack, Text } from "@chakra-ui/react"
import NextLink from 'next/link'

export default function Home() {
  return (
    <Container maxW={"100%"}>
      <Flex
        h={"80vh"}
        w={"100%"}
        backgroundImage="url('/bbg_concept.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        direction={{ base: "column", md: "row" }}
      >
        <Box flex="0.5" p="4" backgroundColor="rgba(0, 0, 0, 0.4)">
          <Text marginTop={6} letterSpacing={0.25} lineHeight={1.1} fontSize={50} color="white" fontFamily={"Bayon"}>
            Welcome to Boom Boogers Marketplace!
          </Text>
          <Text marginTop={18} fontSize={25} color="white" fontFamily={"Big Shoulders Text"}>
            Explore the ultimate NFT rental marketplace! Rent unique items to enhance your gaming experience or earn by renting out your own. Join the BBG community today!
          </Text>
        </Box>
        <Box flex="1">
          <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
            <Stack spacing={4} align={"center"}>
              <Button size={'lg'} as={NextLink} href='/pools'>
                Rent incredible Items
              </Button>
              <Button size={'lg'} as={NextLink} href='/inventory'>
                Check your game inventory
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
}
