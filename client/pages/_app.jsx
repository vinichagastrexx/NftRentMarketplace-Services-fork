import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from "../components/Navbar";


const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
