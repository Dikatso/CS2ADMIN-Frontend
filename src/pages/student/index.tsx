import { StudentPageHeader } from '@/components/Student/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box, Center, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Convener: NextPage = () => {
  const router = useRouter();

  return (
    <Box bg="white">
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
          bg="#F1F6F9"
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
          onClick={() => router.push(`/student1`)}
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
          bg="#F1F6F9"
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

export default Convener;
