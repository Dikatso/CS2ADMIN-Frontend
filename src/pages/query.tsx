import { Box, Button, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { NextPage } from 'next';

interface userDto {
  name: string;
  email: string;
  password: string;
  studentId: string;
  role: string;
}

async function fetchUser() {
  const { data } = await axios.get(`http://127.0.0.1:8000/apis/auth/users`);
  return data;
}

const ReactQueryExample = () => {
  const queryClient = useQueryClient();

  const [Name, setName] = useState(``);
  const [Email, setEmail] = useState(``);
  const [Password, setPassword] = useState(``);
  const [StudentId, setStudentId] = useState(``);

  /**
   * Mutations or Post request
   * - For creating records in the database
   */
  const mutation = useMutation(
    (user: userDto) => {
      return axios.post(`http://127.0.0.1:8000/apis/auth/sign-up`, user);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`user`);
      },
    },
  );

  // first argument is a string to cache and track the query result
  /**
   * Query or Get request
   */
  const { data, error, isError, isLoading } = useQuery(`user`, fetchUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <h1>User</h1>
      {data.map((query, index) => {
        return <li key={index}>{query.name}</li>;
      })}
      <h1>---------------</h1>
      <div>
        {mutation.isLoading ? (
          `Adding user...`
        ) : (
          <>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.error}</div>
            ) : null}

            {mutation.isSuccess ? <div>user added!</div> : null}

            <Box>
              <Input
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="StudentId"
                value={StudentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </Box>

            <Button
              onClick={() => {
                mutation.mutate({
                  name: Name,
                  email: Email,
                  password: Password,
                  studentId: StudentId,
                  role: `Student`,
                });
              }}
            >
              Create User
            </Button>
          </>
        )}
      </div>
    </Box>
  );
};

export default ReactQueryExample;
