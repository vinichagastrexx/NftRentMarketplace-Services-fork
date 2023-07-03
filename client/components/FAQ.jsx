import {
  VStack,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Flex,
  Heading
} from '@chakra-ui/react';

export default function FAQ() {
  return (
    <VStack minH={'50vh'} align='start' p={8}>
      <Text fontSize='5xl' marginLeft={'40px'} fontFamily={'Dela Gothic One'} fontWeight='bold' color={'black'}>
        Frequently Asked Questions
      </Text>
      <Container marginTop={'40px'} maxW={'95%'}>
        <Accordion allowToggle >
          <AccordionItem>
            <AccordionButton _hover={{
              bg: '#66E383',
              transition: 'background-color 0.2s',
              color: 'white',
            }}
              padding={8}>
              <Flex alignItems={'center'} textAlign="left">
                <Box minW={280}>
                  <Text fontSize={20} fontFamily={'Manrope'}>
                    How does the NFT rental process work?
                  </Text>
                </Box>
                <Box marginLeft={10}>
                  <AccordionIcon boxSize={8} />
                </Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Text padding={5} fontSize={16} fontFamily={'Manrope'}>
                Our platform facilitates the secure rental of NFTs between users with smart contracts ensuring safety and transparency.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton _hover={{
              bg: '#66E383',
              transition: 'background-color 0.2s',
              color: 'white',
            }}
              padding={8}>
              <Flex alignItems={'center'} textAlign="left">
                <Box minW={280}>
                  <Text fontSize={20} fontFamily={'Manrope'}>
                    Are there any rental fees involved?
                  </Text>
                </Box>
                <Box marginLeft={10}>
                  <AccordionIcon boxSize={8} />
                </Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Text padding={5} fontSize={16} fontFamily={'Manrope'}>
                Yes, our platform charges a nominal fee on each transaction to maintain the quality and security of the marketplace.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton _hover={{
              bg: '#66E383',
              transition: 'background-color 0.2s',
              color: 'white',
            }}
              padding={8}>
              <Flex alignItems={'center'} textAlign="left">
                <Box minW={280}>
                  <Text fontSize={20} fontFamily={'Manrope'}>
                    Is my NFT safe when it’s rented?
                  </Text>
                </Box>
                <Box marginLeft={10}>
                  <AccordionIcon boxSize={8} />
                </Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Text padding={5} fontSize={16} fontFamily={'Manrope'}>
                Absolutely! Our smart contracts ensure that your NFT remains secure and returns to your possession after the rental period.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton _hover={{
              bg: '#66E383',
              transition: 'background-color 0.2s',
              color: 'white',
            }}
              padding={8}>
              <Flex alignItems={'center'} textAlign="left">
                <Box minW={280}>
                  <Text fontSize={20} fontFamily={'Manrope'}>
                    Can I rent multiple NFTs at once?
                  </Text>
                </Box>
                <Box marginLeft={10}>
                  <AccordionIcon boxSize={8} />
                </Box>
              </Flex>
            </AccordionButton>
            <AccordionPanel>
              <Text padding={5} fontSize={16} fontFamily={'Manrope'}>
                Yes, you can rent as many NFTs as you need, provided they are available in the rental pool.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Container>
    </VStack>
  );
}
