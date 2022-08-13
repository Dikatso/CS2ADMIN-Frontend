import { FC } from 'react';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

export const Footer: FC = () => {
  return (
    <>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{` `}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
      ;
    </>
  );
};
