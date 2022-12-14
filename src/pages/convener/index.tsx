import { useAuth } from '@/hooks/auth/Auth';
import { ConvenerPageHeader } from '@/components/Convener/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * UI Function component showing nextjs page for convener main page
 * @returns {JSX.Element} JSX Element
 */
const ConvenerPage: NextPage = (): JSX.Element => {
  const router = useRouter();

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

  const bgColor = useColorModeValue(`white`, `#1A202C`);
  const boxColor = useColorModeValue(`#F1F6F9`, `#4A5568`);

  return (
    <Box bg={bgColor}>
      <ConvenerPageHeader />
      <Box
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt={35}
      >
        <Box
          bg={boxColor}
          width={270}
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
            <Text fontSize="2xl" mt="5px" as="b">
              Student Analysis
            </Text>
          </Center>
        </Box>
        <Box
          bg={boxColor}
          width={270}
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
          onClick={() => router.push(`/convener/queries`)}
        >
          <Center display="flex" flexDirection="column">
            <Image
              src={`/convener/info.png`}
              alt="Picture of the teacher illustration"
              width={120}
              height={120}
            />
            <Text fontSize="2xl" mt="5px" as="b">
              Student Enquiries
            </Text>
          </Center>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt={10}>
        <Box
          bg={boxColor}
          width={270}
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
          onClick={() => router.push(`/convener/management`)}
        >
          <Center display="flex" flexDirection="column">
            <Image
              src={`/convener/t-manag.png`}
              alt="Picture of the teacher illustration"
              width={120}
              height={120}
            />
            <Text fontSize="2xl" mt="5px" as="b">
              Tutor Management
            </Text>
          </Center>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ConvenerPage;
