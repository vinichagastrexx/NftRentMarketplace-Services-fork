import { ConnectWallet } from "@thirdweb-dev/react";
import NextLink from "next/link";
import { Link, Text, Box, Flex, Heading, Image } from "@chakra-ui/react";

export function Navbar() {
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
    </Box>
  );
}