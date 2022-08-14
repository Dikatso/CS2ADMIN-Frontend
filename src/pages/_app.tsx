import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MantineProvider>
        <Component {...pageProps} />;
      </MantineProvider>
    </ChakraProvider>
  );
}
