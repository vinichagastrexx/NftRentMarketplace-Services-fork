import { Flex, Text, Image } from '@chakra-ui/react';

const Footer = () => (
  <Flex alignItems={'center'} justifyContent={'center'} as="footer" fontFamily={'Manrope'} role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }} >
    <Text fontSize="sm" textAlign="center">
      © 2023 Developed by Trexx. All rights reserved.
    </Text>
    <Image
      marginLeft={'10px'}
      alt='logo_bbg'
      src="/logo_bbg.png"
      maxWidth={'90px'}
      maxHeight={'90px'}
    />
  </Flex>
);

export default Footer;