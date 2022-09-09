import { LandingPageHeader } from '@/components/LandingPage/Header';
import { Box, Center, Text, Button } from '@chakra-ui/react';
import { Footer } from '@/components/Shared/Footer';
import { LandingPageContainer } from '@/components/LandingPage/Container';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [state, setState] = useState(true);

  const router = useRouter();

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
              <Text fontSize="6xl" textAlign="center">
                {state ? `CSC2ADMIN ` : `CSC2ADMIN`}
              </Text>
              <Text fontSize="3xl" textAlign="center">
                {state
                  ? `A tool design to offer a helping hand with CS2 admin issues from analysing the students performance to attending to student's queries.`
                  : `A convinient tool to connect you to the teaching staff. Submit everything from assignment extension requests to general queries.`}
              </Text>
              <Center>
                <Button
                  w="300px"
                  mt="40px"
                  colorScheme="white"
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
