import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import { Select, Stack } from '@chakra-ui/react';
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

function Register() {
  const { classes } = useStyles();
  const router = useRouter();
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

        <TextInput label="Name" placeholder="Bob" size="md" mt="md" />

        <TextInput label="Surname" placeholder="Bob" size="md" mt="md" />

        <TextInput label="Student Number" placeholder="Bob" size="md" mt="md" />

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
        <Button fullWidth mt="xl" size="md">
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
}

export default Register;
