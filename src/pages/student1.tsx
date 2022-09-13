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
import { useMutation } from 'react-query';
import axios from 'axios';

interface createEnquiryDto {
  userId: string;
  courseCode: string;
  extensionDuration: string;
  assignmentNo: string;
  type: string;
  enquiryMessage: string;
}

export interface createEnquiryResponse {
  enquiry: {
    userId: string;
    type: string;
    title: string;
    courseCode: string;
    enquiryMessage: string;
    extensionDuration: string;
    attatchmentLink: string;
    assignmentNo: string;
    testNo: string;
  };
}

const StudentPage = () => {
  const [option, setValue] = useState(``);
  const handleChange = (event) => setValue(event.nativeEvent.target.value);
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [coursecode, setCourseCode] = useState(``);
  const [assignment, setAssignment] = useState(``);
  const [type, setType] = useState(``);
  const [duration, setDuration] = useState(``);
  const [AdditionalInfo, setAdditionalInfo] = useState(``);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Course code`, coursecode);
    console.log(`Assignment`, assignment);
    console.log(`Type`, type);
    console.log(`Duration`, duration);
    console.log(handleChange);
  };

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

  const createEnquiryMutation = useMutation((enquiry: createEnquiryDto) => {
    return axios.post<createEnquiryResponse>(
      `http://127.0.0.1:8000/apis/enquiry/`,
      enquiry,
    );
  });

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
        <FormControl onSubmit={handleSubmit}>
          <FormLabel>Course Code</FormLabel>
          <Input
            id="coursecode"
            type="string"
            onChange={(event) => setCourseCode(event.target.value)}
            value={coursecode}
          />

          <FormLabel>Type</FormLabel>

          <Select defaultValue={option} onChange={handleChange}>
            <option value="options">Select an option</option>
            <option value="AssignmentExtension">Assignment Extension</option>
            <option value="TestConcession">Test concession</option>
            <option value="general">General Admin Query</option>
          </Select>
          {option === `TestConcession` || option === `AssignmentExtension` ? (
            <>
              <FormLabel>Upload Medical Certificate</FormLabel>
              <FileInput
                mt={5}
                placeholder="Medical certificate .pdf or .jpeg"
              />
              {option === `AssignmentExtension` ? (
                <>
                  <FormLabel>Assignment Number</FormLabel>
                  <Input
                    type="string"
                    onChange={(event) => setAssignment(event.target.value)}
                    value={assignment}
                  />
                  <FormLabel>Extension duration</FormLabel>
                  <Input
                    type="string"
                    onChange={(event) => setDuration(event.target.value)}
                    value={duration}
                  />
                </>
              ) : (
                <></>
              )}
              <Textarea
                placeholder="Type here"
                label="Additional information"
                value={AdditionalInfo}
                onChange={(event) => setAdditionalInfo(event.target.value)}
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
          <Button
            onClick={() => {
              const {
                user: { id },
              } = getCurrentUser();
              createEnquiryMutation.mutate({
                userId: id,
                type: option,
                courseCode: coursecode,
                enquiryMessage: AdditionalInfo,
                extensionDuration: duration,
                assignmentNo: assignment,
              });
            }}
            type="submit"
            mt={5}
            colorScheme="teal"
          >
            Submit
          </Button>
        </FormControl>
      </Center>
    </>
  );
};

export default StudentPage;
