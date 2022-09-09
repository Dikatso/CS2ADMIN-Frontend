import { StudentPageHeader } from '@/components/Student/Header';
import * as React from 'react';
import { DateRangePicker } from '@mantine/dates';

import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { FileInput, Textarea } from '@mantine/core';
import { useState } from 'react';
import { IconUpload } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/Auth';

const StudentPage = () => {
  const [option, setValue] = useState(``);
  const handleChange = (event) => setValue(event.nativeEvent.target.value);
  const router = useRouter();

  const { isAuthenticated, getCurrentUser } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      role == `Convener`
        ? router.push(`/convener`)
        : () => {
            console.log();
          };
    } else {
      router.push(`/`);
    }
  }, []);

  return (
    <>
      <StudentPageHeader />
      <Center
        w="600px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="25%"
        py={5}
        px={5}
        boxShadow="xl"
        p="6"
        rounded="md"
        bg="white"
      >
        <FormControl>
          <FormLabel>Course Code</FormLabel>
          <Input type="string" />
          <FormLabel>Assignment Number</FormLabel>
          <Input type="string" width="full" />

          <FormLabel>Type</FormLabel>

          <Select defaultValue={option} onChange={handleChange}>
            <option value="options">Select an option</option>
            <option value="extension">Assignment Extension</option>
            <option value="concession">Test concession</option>
            <option value="general">General Admin Query</option>
          </Select>
          {option === `concession` ? (
            <>
              <FormLabel>Upload Medical Certificate</FormLabel>
              <FileInput
                mt={5}
                placeholder="Medical certificate .pdf or .jpeg"
              />

              <Textarea
                placeholder="Type here"
                label="Additional information"
              />
            </>
          ) : (
            <></>
          )}
          {option === `extension` ? (
            <>
              <FormLabel>Upload Medical Certificate</FormLabel>
              <FileInput
                mt={5}
                placeholder="Medical certificate .pdf or .jpeg"
                icon={<IconUpload size={14} />}
              />

              <DateRangePicker
                label="Extension duration"
                placeholder="Pick dates range"
              />
              <Textarea
                placeholder="type here"
                label="Additional information"
              />
            </>
          ) : (
            <></>
          )}
          {option === `general` ? (
            <>
              <Textarea placeholder="type here" label="Query:" />
            </>
          ) : (
            <></>
          )}
          <Button mt={5} colorScheme="teal">
            Submit
          </Button>
        </FormControl>
      </Center>
    </>
  );
};

export default StudentPage;
