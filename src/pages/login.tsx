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
import { Box, Select, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

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

function Login() {
  const { classes } = useStyles();
  const router = useRouter();
  return (
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
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
          />
          <Stack spacing={4}>
            <div style={{ display: `flex`, justifyContent: `space-between` }} />
            <Select variant="outline" placeholder="Choose role">
              <option value="Student"> Student</option>
              <option value="Course Convenor"> Course Convenor</option>
            </Select>
          </Stack>
          <Button
            fullWidth
            mt="xl"
            size="md"
            onClick={() => router.push(`/student`)}
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
  );
}

export default Login;
