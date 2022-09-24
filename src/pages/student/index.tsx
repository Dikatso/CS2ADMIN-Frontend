import { StudentPageHeader } from '@/components/Student/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/auth/Auth';

const Student: NextPage = () => {
  const router = useRouter();

  const { isAuthenticated, getCurrentUser } = useAuth();
  const bgColor = useColorModeValue(`white`, `#1A202C`);
  const boxColor = useColorModeValue(`#F1F6F9`, `#4A5568`);

  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      role == `Convener`
        ? router.push(`/convener`)
        : () => {
            console.log();
          };
    } else {
      router.push(`/`);
    }
  }, []);

  return (
    <Box bg={bgColor}>
      <StudentPageHeader />
      <Box
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt={40}
      >
        <Box
          bg={boxColor}
          width={250}
          height={200}
          mx="30px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="base"
          p="6"
          rounded="2xl"
          transition="transform 280ms"
          _hover={{ cursor: `pointer`, transform: `translateY(-10px)` }}
          onClick={() => router.push(`/student/create`)}
        >
          <Center display="flex" flexDirection="column">
            <Image
              src={`/student/file.png`}
              alt="Picture of the teacher illustration"
              width={120}
              height={120}
            />
            <Text fontSize="2xl" mt="5px">
              Submit Enquiry
            </Text>
          </Center>
        </Box>
        <Box
          bg={boxColor}
          width={250}
          height={200}
          mx="30px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="base"
          p="6"
          rounded="2xl"
          transition="transform 280ms"
          _hover={{ cursor: `pointer`, transform: `translateY(-10px)` }}
          onClick={() => router.push(`/student/queries`)}
        >
          <Center display="flex" flexDirection="column">
            <Image
              src={`/student/to-do-list.png`}
              alt="Picture of the teacher illustration"
              width={120}
              height={120}
            />
            <Text fontSize="2xl" mt="5px">
              View Enquiries
            </Text>
          </Center>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Student;
