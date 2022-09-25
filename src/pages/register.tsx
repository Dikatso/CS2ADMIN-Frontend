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
import { Select, Stack, useToast, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuth } from '@/auth/Auth';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

interface signUpUserDto {
  name: string;
  email: string;
  password: string;
  uctId: string;
  role: string;
}

const useStyles = createStyles((theme) => {
  return {
    wrapper: {
      minHeight: 900,
      backgroundSize: `cover`,
      backgroundImage: `url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)`,
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

const Register: NextPage = () => {
  const toast = useToast();
  const router = useRouter();

  const { isAuthenticated, getCurrentUser } = useAuth();

  /**
   * Mutations or Post request
   * - For creating records in the database
   */
  const { mutate, isLoading, isError, isSuccess, error } = useMutation(
    (user: signUpUserDto) => {
      return axios.post(`http://127.0.0.1:8000/apis/auth/sign-up`, user);
    },
  );

  useEffect(() => {
    if (isError) {
      toast({
        description: `${error.response.data?.detail}`,
        status: `error`,
        duration: 2000,
        isClosable: true,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      router.push(`${role.toLowerCase()}`);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      router.push(`login`);
      toast({
        title: `Account created.`,
        description: `We've created your account for you.`,
        status: `success`,
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  const { classes } = useStyles();

  const [Name, setName] = useState(``);
  const [Surname, setSurname] = useState(``);
  const [Email, setEmail] = useState(``);
  const [UCTId, setUCTId] = useState(``);
  const [Password, setPassword] = useState(``);

  const [value, setValue] = useState(`Student`);
  const handleChange = (e) => setValue(e.target.value);

  const onClick = () => {
    mutate({
      name: Name + ` ` + Surname,
      email: Email,
      uctId: UCTId,
      password: Password,
      role: value,
    });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          REGISTER
        </Title>

        <TextInput
          label="Name"
          placeholder="name"
          size="md"
          mt="md"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInput
          label="Surname"
          placeholder="surname"
          size="md"
          mt="md"
          value={Surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <TextInput
          label="Email"
          placeholder="email"
          size="md"
          mt="md"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="UCT Number"
          placeholder="uct number"
          size="md"
          mt="md"
          value={UCTId}
          onChange={(e) => setUCTId(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Stack spacing={4}>
          <div style={{ display: `flex`, justifyContent: `space-between` }} />
          <Select onChange={handleChange} variant="outline">
            <option value="Student">Student</option>
            <option value="Convener">Convener</option>
          </Select>
        </Stack>
        <Button
          fullWidth
          mt="xl"
          size="md"
          loading={isLoading}
          onClick={onClick}
        >
          Register
        </Button>

        <Text align="center" mt="md">
          Already registered?{` `}
          <Anchor<'a'>
            href="#"
            weight={700}
            onClick={() => router.push(`login`)}
          >
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
};

export default Register;
