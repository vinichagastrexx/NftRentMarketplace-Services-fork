import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from "../components/Navbar";
import Head from 'next/head'

const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <Head>
          <title>BBGMarketplace</title>
          <meta property="og:title" content="BBGMarketplace" key="title" />
          <link rel="icon" href="/icons/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
