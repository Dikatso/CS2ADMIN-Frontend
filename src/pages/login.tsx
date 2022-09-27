import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import { Box, useToast, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAuth } from '@/hooks/auth/Auth';
import { NextPage } from 'next';
import { signInUserDto, signInUserResponse } from '@/types/global';
import { useStylesLogin } from '@/styles/login';

/**
 * UI Function component showing nextjs page for signing in
 * @returns {JSX.Element} JSX Element
 */
const LoginPage: NextPage = (): JSX.Element => {
  const { classes } = useStylesLogin();
  const router = useRouter();
  const [Email, setEmail] = useState(``);
  const [Password, setPassword] = useState(``);
  const toast = useToast();
  const { isAuthenticated, getCurrentUser } = useAuth();

  /**
   * Mutations or Post request
   * - For creating records in the database
   */
  const loginMutation = useMutation((user: signInUserDto) => {
    return axios.post<signInUserResponse>(
      `http://127.0.0.1:8000/apis/auth/sign-in`,
      user,
    );
  });

  /**
   * Display error message if authentication failed
   */
  useEffect(() => {
    if (loginMutation.isError) {
      toast({
        description: `${loginMutation.error?.response.data?.detail}`,
        status: `error`,
        duration: 2000,
        isClosable: true,
      });
    }
  }, [loginMutation.isError]);

  /**
   * Handle onclick function
   */
  const onClick = () => {
    loginMutation.mutate({
      email: Email,
      password: Password,
    });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      console.log(role);
      router.push(`${role.toLowerCase()}`);
    }
  }, []);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      if (loginMutation.data.data.token) {
        localStorage.setItem(
          `cs2-auth`,
          JSON.stringify(loginMutation.data.data),
        );
        toast({
          title: `Authentcated successfully`,
          status: `success`,
          duration: 3000,
          isClosable: true,
        });
        const role = loginMutation.data.data.user.role;
        role == `Student` ? router.push(`/student`) : router.push(`/convener`);
      }
    }
  }, [loginMutation.isSuccess]);

  return (
    <>
      <Box>
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title
              order={2}
              className={classes.title}
              align="center"
              mt="md"
              mb={50}
            >
              CS2ADMIN
            </Title>

            <TextInput
              name = "loginEmail"
              label="Email address"
              placeholder="uctcredential@myuct.ac.za"
              size="md"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              name = "loginPassword"
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              name = "loginButton"
              fullWidth
              mt="xl"
              size="md"
              onClick={onClick}
              loading={loginMutation.isLoading}
            >
              Login
            </Button>

            <Text align="center" mt="md">
              Don&apos;t have an account?{` `}
              <Anchor<'a'>
                href="#"
                weight={700}
                onClick={() => router.push(`/register`)}
              >
                Register
              </Anchor>
            </Text>
          </Paper>
        </div>
      </Box>
    </>
  );
};

export default LoginPage;
