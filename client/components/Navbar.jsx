import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import NextLink from "next/link";
import { Avatar, Link, Text, Box, Flex, Heading } from "@chakra-ui/react";

export function Navbar() {
  const address = useAddress();

  return (
    <Box maxW={"1200px"} m={"auto"} py={"10px"} px={"40px"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Link as={NextLink} href={'/'}>
          <Heading>
            NFTRentMarketplace
          </Heading>
        </Link>
        <Flex direction={"row"}>
          <Link as={NextLink} href={'/rent'} mx={2.5}>
            <Text>Rent</Text>
          </Link>
          <Link as={NextLink} href={'/add-to-pool'} mx={2.5}>
            <Text>Add Item To Pool</Text>
          </Link>
        </Flex>
        <Flex direction={"row"} alignItems={"center"}>
          <ConnectWallet />
          {address && (
            <Link as={NextLink} href={`/profile/${address}`}>
              <Avatar src='https://bit.ly/broken-link' ml={"20px"} />
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}