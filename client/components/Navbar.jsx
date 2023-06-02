import { ConnectWallet } from "@thirdweb-dev/react";
import NextLink from "next/link";
import { Link, Text, Box, Flex, Heading, Image } from "@chakra-ui/react";

export function Navbar() {
  return (
    <Box maxW={"1280px"} m={"auto"} py={"10px"} px={"40px"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Link as={NextLink} href={'/'}>
          <Image src="/logo_bbg.png" alt="Logo" boxSize="100px" mr="20px" width={"100%"} />
        </Link>
        <Flex direction={"row"}>
          <Link as={NextLink} href={'/pools'} mx={2.5} fontFamily={"Bayon"} fontSize={"30"}>
            <Text>Pools</Text>
          </Link>
          <Link as={NextLink} href={'/inventory'} mx={2.5} fontFamily={"Bayon"} fontSize={"30"}>
            <Text>Inventory</Text>
          </Link>
        </Flex>
        <Flex direction={"row"} alignItems={"center"}>
          <ConnectWallet />
        </Flex>
      </Flex>
    </Box>
  );
}