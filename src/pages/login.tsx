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
import { useAuth } from '@/auth/Auth';
import { NextPage } from 'next';
import { signInUserDto, signInUserResponse } from '@/types/global';

const useStyles = createStyles((theme) => {
  const bgColor = useColorModeValue(`white`, `#1A202C`);

  return {
    wrapper: {
      minHeight: 900,
      backgroundSize: `cover`,
      backgroundImage: `url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)`,
      backgroundColor: bgColor,
    },

    form: {
      borderRight: `1px solid ${
        theme.colorScheme === `dark`
          ? theme.colors.dark[7]
          : theme.colors.gray[3]
      }`,
      minHeight: 900,
      maxWidth: 450,
      paddingTop: 80,

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        maxWidth: `100%`,
      },
    },

    title: {
      color: theme.colorScheme === `dark` ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    logo: {
      color: theme.colorScheme === `dark` ? theme.white : theme.black,
      width: 120,
      display: `block`,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
  };
});

const Login: NextPage = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const [Email, setEmail] = useState(``);
  const [Password, setPassword] = useState(``);
  const toast = useToast();
  const { isAuthenticated, getCurrentUser } = useAuth();

  /**
   * Mutations or Post request
   * - For creating records in the database
   */
  const { mutate, data, isError, error, isLoading, isSuccess } = useMutation(
    (user: signInUserDto) => {
      return axios.post<signInUserResponse>(
        `http://127.0.0.1:8000/apis/auth/sign-in`,
        user,
      );
    },
  );

  useEffect(() => {
    if (isError) {
      toast({
        description: `${error?.response.data?.detail}`,
        status: `error`,
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError]);

  const onClick = () => {
    mutate({
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
    if (isSuccess) {
      if (data.data.token) {
        localStorage.setItem(`cs2-auth`, JSON.stringify(data.data));
        toast({
          title: `Logged in`,
          status: `success`,
          duration: 3000,
          isClosable: true,
        });
        const role = data.data.user.role;
        role == `Student` ? router.push(`/student`) : router.push(`/convener`);
      }
    }
  }, [isSuccess]);

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
              label="Email address"
              placeholder="uctcredential@myuct.ac.za"
              size="md"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              mt="xl"
              size="md"
              onClick={onClick}
              loading={isLoading}
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

export default Login;
