import { StudentPageHeader } from '@/components/Student/Header';
import * as React from 'react';

import {
  Center,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Button } from '@mantine/core';
import { FileInput, Textarea } from '@mantine/core';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/Auth';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useState } from 'react';

/**creating enquiry interface and defining data types of each fields to be stored in the database*/
interface createEnquiryDto {
  userId: string;
  courseCode: string;
  extensionDuration: string;
  assignmentNo: string;
  type: string;
  messageFromStudent: string;
}

/**creating interface for storing the file*/
interface fileUpload {
  enqId: string;
  file: File;
}

/**enquiry fields complete*/
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
  /** defining states for changing components */
  const [option, setValue] = useState(``);
  const handleChange = (event) => setValue(event.nativeEvent.target.value);
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [coursecode, setCourseCode] = useState(``);
  const [assignment, setAssignment] = useState(``);
  const [duration, setDuration] = useState(``);
  const [AdditionalInfo, setAdditionalInfo] = useState(``);
  const [fileValue, setFileValue] = useState<File>([]);
  const textColor = useColorModeValue(`#1A202C`, `white`);
  const boxColor = useColorModeValue(`white`, `#4A5568`);

  const formdata = new FormData();// creating formdata instance for storing the attachment link
  formdata.append(`fileUpload`, fileValue);
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  /** function to return query id from the submitted query */
  function getQueryID(data) {
    return data.data.id.toString();
  }
/**use effect function for checking the role of the logged in user */
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

/** add file mutation to update the database with attachment link*/
  const addFileMutation = useMutation(
    (queryId: string) => {
      return axios.post(`http://127.0.0.1:8000/apis/file/${queryId}`, formdata);
    },
    {
      onSuccess: () => {
        toast({
          title: `Query submitted`,
          status: `success`,
          duration: 3000,
          isClosable: true,
        });
        router.push(`/student`);
      },
    },
  );
/** mutation for posting the enquiry in the database*/
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
      },
    },
  );
/** function to create query based on the logged in user*/
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
/** use effect function for capturing the file from the user upload */
  React.useEffect(() => {
    console.log(fileValue);
  }, [fileValue]);

  return (
    <>
      <StudentPageHeader />
      <Center display="flex" flexDirection="column">
        <Text fontSize="5xl" fontWeight={700} mb={5} mt={10}>
          Create Enquiry
        </Text>
        <Center
          w="600px"
          display="flex"
          boxShadow="xl"
          p="6"
          rounded="md"
          bg={boxColor}
        >
          {/* Defining form creating the query*/}
          <FormControl onSubmit={handleSubmit}>
            <FormLabel color={textColor}>Course Code</FormLabel>
            <Input
              id="coursecode"
              type="string"
              onChange={(event) => setCourseCode(event.target.value)}
              value={coursecode}
            />

            <FormLabel mt={3} color={textColor}>
              Type
            </FormLabel>

            {/* Combo box for query types */}
            <Select defaultValue={option} onChange={handleChange}>
              <option value="options">Select an option</option>
              <option value="AssignmentExtension">Assignment Extension</option>
              <option value="TestConcession">Test concession</option>
            </Select>
            {option === `TestConcession` || option === `AssignmentExtension` ? (
              <>
                <FormLabel mt={3} color={textColor}>
                  Upload Medical Certificate
                </FormLabel>
                <FileInput
                  mt={5}
                  value={fileValue}
                  onChange={setFileValue}
                  placeholder="Medical certificate .pdf"
                />
                {option === `AssignmentExtension` ? (
                  <>
                    <FormLabel mt={3} color={textColor}>
                      Assignment Number
                    </FormLabel>
                    <Input
                      placeholder='e.g Assignment 1'
                      type="string"
                      onChange={(event) => setAssignment(event.target.value)}
                      value={assignment}
                    />
                    <FormLabel mt={3} color={textColor}>
                      Extension duration
                    </FormLabel>
                    <Input
                      placeholder='Number of days e.g 5 days'
                      type="string"
                      onChange={(event) => setDuration(event.target.value)}
                      value={duration}
                    />
                  </>
                ) : (
                  <></>
                )}
                <FormLabel mt={3} color={textColor}>
                  Additional Info
                </FormLabel>
                <Textarea
                  placeholder="Type here"
                  value={AdditionalInfo}
                  onChange={(event) => setAdditionalInfo(event.target.value)}
                />
              </>
            ) : (
              <></>
            )}

            <Button
            // event handler for the submit button
              onClick={() => {
                createQuery();
              }}
              type="submit"
              mt={10}
              color="teal"
              loading={
                createEnquiryMutation.isLoading || addFileMutation.isLoading
              }
            >
              Submit
            </Button>
          </FormControl>
        </Center>
      </Center>
    </>
  );
};

export default StudentPage;