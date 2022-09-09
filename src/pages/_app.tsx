import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from 'react-query';
import NextNProgress from 'nextjs-progressbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <MantineProvider>
          <NextNProgress
            color="#29D"
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Component {...pageProps} />;
        </MantineProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
