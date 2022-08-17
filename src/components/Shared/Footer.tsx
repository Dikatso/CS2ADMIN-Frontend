import { FC } from 'react';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';
import styles from '@/styles/Home.module.css';

export const Footer: FC = () => {
  return (
    <>
      <Box
        display="flex"
        flex={1}
        position="fixed"
        bottom={0}
        width="100%"
        borderTop="1px"
        borderColor="#eaeaea"
        justifyContent="center"
        alignItems="center"
        padding="1rem"
      >
        <a
          // href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{` BN x DM x LM `}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Box>
      ;
    </>
  );
};
