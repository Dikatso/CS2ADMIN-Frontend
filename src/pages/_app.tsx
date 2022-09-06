import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from 'react-query';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <MantineProvider>
          <Component {...pageProps} />;
        </MantineProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
