import { ConvenerPageHeader } from '@/components/Convener/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box, Center, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useStudentStore } from '@/state/studentDataStore';
import { FileDropZone } from '@/components/Convener/FileDropZone';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/Auth';

const TutorManagement: NextPage = () => {
  const router = useRouter();
  const { setStudents, setStudentTutorAllocation } = useStudentStore();
  const { isAuthenticated, getCurrentUser } = useAuth();

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
    <Box bg="white">
      <ConvenerPageHeader />
      <Box
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt={20}
        bg="white"
      >
        <Box display="flex" flexDirection="column">
          <Center>
            <Text fontSize="5xl" fontWeight={700} mb={8}>
              Tutor Management
            </Text>
          </Center>
          <FileDropZone
            dropType="tutor-management"
            setStudents={setStudents}
            setStudentTutorAllocation={setStudentTutorAllocation}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default TutorManagement;
