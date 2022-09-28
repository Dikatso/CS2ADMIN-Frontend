import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import { Select, Stack, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import { useAuth } from '@/hooks/auth/Auth';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { signUpUserDto } from '@/types/global';
import { useStylesRegister } from '@/styles/register';

/**
 * UI Function component showing nextjs page for registering
 * @returns {JSX.Element} JSX Element
 */
const RegisterPage: NextPage = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();

  /**
   * Mutations or Post request
   * - For creating records in the database
   */
  const registerMutation = useMutation((user: signUpUserDto) => {
    return axios.post(`http://127.0.0.1:8000/apis/auth/sign-up`, user);
  });

  /**
   * Display error message if authetication failed
   */
  useEffect(() => {
    if (registerMutation.isError) {
      toast({
        description: `${registerMutation.error.response.data?.detail}`,
        status: `error`,
        duration: 2000,
        isClosable: true,
      });
    }
  }, [registerMutation.isError]);

  /**
   * If user is logged in redirect to appropriate page
   */
  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      router.push(`${role.toLowerCase()}`);
    }
  }, []);

  /**
   * Display welcome message if authenication successful
   */
  useEffect(() => {
    if (registerMutation.isSuccess) {
      router.push(`login`);
      toast({
        title: `Account created.`,
        description: `We've created your account for you.`,
        status: `success`,
        duration: 3000,
        isClosable: true,
      });
    }
  }, [registerMutation.isSuccess]);

  const { classes } = useStylesRegister();

  const [Name, setName] = useState(``);
  const [Surname, setSurname] = useState(``);
  const [Email, setEmail] = useState(``);
  const [UCTId, setUCTId] = useState(``);
  const [Password, setPassword] = useState(``);
  const [value, setValue] = useState(`Student`);

  const handleChange = (e) => setValue(e.target.value);

  /**
   * Validates the email entered
   * @param {string} email
   * @returns {boolean}
   */
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const onClick = () => {
    if (
      Name.length == 0 ||
      Surname.length == 0 ||
      Email.length == 0 ||
      UCTId.length == 0 ||
      Password.length == 0
    ) {
      alert(`Please fill in all input fields`);
    } else {
      if (validateEmail(Email)) {
        registerMutation.mutate({
          name: Name + ` ` + Surname,
          email: Email,
          uctId: UCTId,
          password: Password,
          role: value,
        });
      } else {
        alert(`Please enter a valid email address`);
      }
    }
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
          name="registerName"
          size="md"
          disabled={registerMutation.isLoading}
          mt="md"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextInput
          label="Surname"
          placeholder="surname"
          size="md"
          disabled={registerMutation.isLoading}
          name="registerSurname"
          mt="md"
          value={Surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <TextInput
          label="Email"
          placeholder="email"
          name="registerEmail"
          disabled={registerMutation.isLoading}
          size="md"
          mt="md"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInput
          label="UCT Id"
          placeholder="uct number"
          name="registerUctNumber"
          disabled={registerMutation.isLoading}
          size="md"
          mt="md"
          value={UCTId}
          onChange={(e) => setUCTId(e.target.value)}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          name="registerPassword"
          disabled={registerMutation.isLoading}
          mt="md"
          size="md"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Stack spacing={4}>
          <div style={{ display: `flex`, justifyContent: `space-between` }} />
          <Select
            onChange={handleChange}
            variant="outline"
            disabled={registerMutation.isLoading}
          >
            <option value="Student">Student</option>
            <option value="Convener">Convener</option>
          </Select>
        </Stack>
        <Button
          fullWidth
          mt="xl"
          size="md"
          name="registerButton"
          loading={registerMutation.isLoading}
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

export default RegisterPage;
