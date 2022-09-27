/* eslint-disable import/extensions */
import { ConvenerPageHeader } from '@/components/Convener/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import { FileDropZone } from '@/components/Convener/FileDropZone';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth/Auth';

/**
 * UI Function component showing nextjs page for convener analysis
 * @returns {JSX.Element} JSX Element
 */
const ConvenerAnalysisPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const bgColor = useColorModeValue(`white`, `#1A202C`);

  /**
   * Allow only authenticated users to access this page or
   * redirect to appropriate page
   */
  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      role == `Student`
        ? router.push(`/student`)
        : () => {
            console.log();
          };
    } else {
      router.push(`/`);
    }
  }, []);

  return (
    <Box bg={bgColor}>
      <ConvenerPageHeader />
      <Box
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt={20}
      >
        <Box display="flex" flexDirection="column">
          <Center>
            <Text fontSize="5xl" fontWeight={700} mb={8}>
              Student Analysis
            </Text>
          </Center>
          <FileDropZone dropType="student-analysis" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ConvenerAnalysisPage;
