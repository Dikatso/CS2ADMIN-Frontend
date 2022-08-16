import { ConvenerPageHeader } from '@/components/Convener/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box, Center, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Convener: NextPage = () => {
  const router = useRouter();

  return (
    <Box bg="white">
      <ConvenerPageHeader />
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
          onClick={() => router.push(`/convener/analysis`)}
        >
          <Center display="flex" flexDirection="column">
            <Image
              src={`/convener/research.png`}
              alt="Picture of the teacher illustration"
              width={120}
              height={120}
            />
            <Text fontSize="2xl" mt="5px">
              Student Analysis
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
        >
          <Center display="flex" flexDirection="column">
            <Image
              src={`/convener/info.png`}
              alt="Picture of the teacher illustration"
              width={120}
              height={120}
            />
            <Text fontSize="2xl" mt="5px">
              Student Enquiries
            </Text>
          </Center>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Convener;
