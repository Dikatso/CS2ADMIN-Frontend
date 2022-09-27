import { LandingPageHeader } from '@/components/LandingPage/Header';
import { Box, Center, Text, Button, useColorModeValue } from '@chakra-ui/react';
import { Footer } from '@/components/Shared/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

/**
 * UI Fucntion component for displaying the Home page
 * @returns {JSX.Element} JSX Element
 */
const HomePage: NextPage = (): JSX.Element => {
  const [state, setState] = useState(true);
  const router = useRouter();
  const bgColor = useColorModeValue(`white`, `#1A202C`);
  const textColor = useColorModeValue(`#1A202C`, `white`);

  return (
    <>
      <Box bg={bgColor} w="100%" height="100%">
        <>
          <LandingPageHeader state={state} setState={setState} />
          <Box
            bg={bgColor}
            color={textColor}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            mx="100px"
          >
            <Box
              bg={bgColor}
              display="flex"
              flexDirection="column"
              alignContent="center"
            >
              <Text fontSize="6xl" textAlign="center">
                {state ? `CSC2ADMIN ` : `CSC2ADMIN`}
              </Text>
              <Text fontSize="3xl" textAlign="center">
                {state
                  ? `A tool designed to offer a helping hand with CS2 admin issues from analysing the students performance to attending to student's queries.`
                  : `A convinient tool to connect you to the teaching staff. Submit everything from assignment extension requests to test concessions.`}
              </Text>
              <Center>
                <Button
                  w="300px"
                  mt="40px"
                  colorScheme="blue"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    router.push(`login`);
                  }}
                >
                  Get started
                </Button>
              </Center>
            </Box>
            <Center bg={bgColor} h="347px" w="full" color="blue">
              {state ? (
                <Image
                  src={`/Teacher.png`}
                  alt="Picture of the teacher illustration"
                  width={347}
                  height={347}
                />
              ) : (
                <Image
                  src={`/Student.png`}
                  alt="Picture of the studnet illustration"
                  width={347}
                  height={347}
                />
              )}
            </Center>
          </Box>
          <Footer />
        </>
      </Box>
    </>
  );
};

export default HomePage;
