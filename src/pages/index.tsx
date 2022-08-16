import { LandingPageHeader } from '@/components/LandingPage/Header';
import { Box, Center, Text, Button } from '@chakra-ui/react';
import { Footer } from '@/components/Shared/Footer';
import { LandingPageContainer } from '@/components/LandingPage/Container';
import Image from 'next/image';
import { useState } from 'react';
import router from 'next/router';

export default function Home() {
  const [state, setState] = useState(true);

  return (
    <>
      <LandingPageContainer>
        <>
          <LandingPageHeader state={state} setState={setState} />
          <Box
            bg="white"
            color="black"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            mx="100px"
          >
            <Box
              bg="white"
              display="flex"
              flexDirection="column"
              alignContent="center"
            >
              <Text fontSize="6xl">
                {state ? `Mantine for Teachers` : `Mantine for Students`}
              </Text>
              <Text fontSize="3xl">
                {state
                  ? `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
                  : `Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in magna in aute`}
              </Text>
              <Center>
                <Button
                  w="300px"
                  mt="40px"
                  colorScheme="white"
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    router.push(`./student`);
                  }}
                >
                  Get started
                </Button>
              </Center>
            </Box>
            <Center bg="white" h="347px" w="full" color="blue">
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
      </LandingPageContainer>
    </>
  );
}
