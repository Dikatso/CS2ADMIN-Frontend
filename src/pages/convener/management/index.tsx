import { ConvenerPageHeader } from '@/components/Convener/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import { FileDropZone } from '@/components/Convener/FileDropZone';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/Auth';

const TutorManagement: NextPage = () => {
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const bgColor = useColorModeValue(`white`, `#1A202C`);
  const tableColor = useColorModeValue(`gray`, `#EDF2F7`);
  const textColor = useColorModeValue(`#1A202C`, `white`);

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
        bg={bgColor}
      >
        <Box display="flex" flexDirection="column">
          <Center>
            <Text fontSize="5xl" fontWeight={700} mb={8}>
              Tutor Management
            </Text>
          </Center>
          <FileDropZone dropType="tutor-management" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default TutorManagement;
