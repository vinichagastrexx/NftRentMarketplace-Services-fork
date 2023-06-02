import { ConnectWallet } from "@thirdweb-dev/react";
import { Box, Button, Container, Flex, Stack } from "@chakra-ui/react"
import NextLink from 'next/link'

export default function Home() {
  return (
    <Container maxW={"100%"}>
      <Box
        h={"80vh"}
        w={"100%"}
        backgroundImage="url('/bbg_concept.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
          <Stack spacing={4} align={"center"}>
            <Button as={NextLink} href='/pools'>
              Rent incredible Items
            </Button>
            <Button as={NextLink} href='/inventory'>
              Check your game inventory
            </Button>
          </Stack>
        </Flex>
      </Box>
    </Container>
  );
}
