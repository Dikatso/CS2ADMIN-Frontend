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
import { Box, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAuth } from '@/auth/Auth';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: `cover`,
    backgroundImage: `url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)`,
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === `dark` ? theme.colors.dark[7] : theme.colors.gray[3]
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
}));

interface signInUserDto {
  email: string;
  password: string;
}

export interface signInUserResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    uctId: string;
  };
}

function Login() {
  const { classes } = useStyles();
  const router = useRouter();

  const [Email, setEmail] = useState(``);
  const [Password, setPassword] = useState(``);

  /**
   * Mutations or Post request
   * - For creating records in the database
   */
  const signInUserMutation = useMutation((user: signInUserDto) => {
    return axios.post<signInUserResponse>(
      `http://127.0.0.1:8000/apis/auth/sign-in`,
      user,
    );
  });

  const onClick = () => {
    signInUserMutation.mutate({
      email: Email,
      password: Password,
    });
  };

  const toast = useToast();
  const { isAuthenticated, getCurrentUser } = useAuth();

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
    if (signInUserMutation.isSuccess) {
      if (signInUserMutation.data.data.token) {
        localStorage.setItem(
          `cs2-auth`,
          JSON.stringify(signInUserMutation.data.data),
        );
        toast({
          title: `Logged in`,
          status: `success`,
          duration: 3000,
          isClosable: true,
        });
        const role = signInUserMutation.data.data.user.role;
        role == `Student` ? router.push(`/student`) : router.push(`/convener`);
      }
    }
  }, [signInUserMutation.isSuccess]);

  return (
    <>
      <Box h="900px">
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
              loading={signInUserMutation.isLoading}
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
}

export default Login;
