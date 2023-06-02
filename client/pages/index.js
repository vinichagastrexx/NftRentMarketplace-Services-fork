import { ConnectWallet } from "@thirdweb-dev/react";
import { Button, Container, Flex, Heading, Stack } from "@chakra-ui/react"
import NextLink from 'next/link'

export default function Home() {
  return (
    <Container maxW={"1200px"}>
      <Flex h={"80vh"} alignItems={"center"} justifyContent={"center"}>
        <Stack spacing={4} align={"center"}>
          <Heading>Marketplace</Heading>
          <Button as={NextLink} href='/rent'>
            Rent NFTs
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
}
