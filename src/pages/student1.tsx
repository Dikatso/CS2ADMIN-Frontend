import { StudentPageHeader } from '@/components/Student/Header';
import * as React from 'react';

import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import { Button } from '@mantine/core';
import { FileInput, Textarea } from '@mantine/core';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/Auth';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

interface createEnquiryDto {
  userId: string;
  courseCode: string;
  extensionDuration: string;
  assignmentNo: string;
  type: string;
  messageFromStudent: string;
}

interface fileUpload {
  enqId: string;
  file: File;
}

export interface createEnquiryResponse {
  enquiry: {
    userId: string;
    type: string;
    title: string;
    courseCode: string;
    messageFromStudent: string;
    extensionDuration: string;
    attatchmentLink: string;
    assignmentNo: string;
    testNo: string;
    file: fileUpload;
  };
}

const StudentPage = () => {
  const [option, setValue] = useState(``);
  const handleChange = (event) => setValue(event.nativeEvent.target.value);
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [coursecode, setCourseCode] = useState(``);
  const [assignment, setAssignment] = useState(``);
  const [duration, setDuration] = useState(``);
  const [AdditionalInfo, setAdditionalInfo] = useState(``);
  const [fileValue, setFileValue] = useState<File>([]);
  const formdata = new FormData();
  formdata.append(`fileUpload`, fileValue);
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  function getQueryID(data) {
    return data.data.id.toString();
  }
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

  const addFileMutation = useMutation((queryId: string) => {
    return axios.post(`http://127.0.0.1:8000/apis/file/${queryId}`, formdata);
  });

  const createEnquiryMutation = useMutation(
    (enquiry: createEnquiryDto) => {
      return axios.post<createEnquiryResponse>(
        `http://127.0.0.1:8000/apis/enquiry/`,
        enquiry,
      );
    },
    {
      onSuccess: (responseData) => {
        const queryId = getQueryID(responseData);
        addFileMutation.mutate(queryId);
        toast({
          title: `Query submitted`,
          status: `success`,
          duration: 3000,
          isClosable: true,
        });
      },
    },
  );

  function createQuery() {
    const {
      user: { id },
    } = getCurrentUser();
    createEnquiryMutation.mutate({
      userId: id,
      type: option,
      courseCode: coursecode,
      messageFromStudent: AdditionalInfo,
      extensionDuration: duration,
      assignmentNo: assignment,
    });
  }

  React.useEffect(() => {
    console.log(fileValue);
  }, [fileValue]);

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
                value={fileValue}
                onChange={setFileValue}
                placeholder="Medical certificate .pdf"
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
              <Textarea
                placeholder="type here"
                label="Query:"
                value={AdditionalInfo}
                onChange={(event) => setAdditionalInfo(event.target.value)}
              />
            </>
          ) : (
            <></>
          )}
          <Button
            onClick={() => {
              createQuery();
            }}
            type="submit"
            mt={5}
            color="teal"
            loading={createEnquiryMutation.isLoading}
          >
            Submit
          </Button>
        </FormControl>
      </Center>
    </>
  );
};

export default StudentPage;
