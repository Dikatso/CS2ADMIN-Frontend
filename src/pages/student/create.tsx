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
import { useAuth } from '@/hooks/auth/Auth';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { createEnquiryDto, createEnquiryResponse } from '@/types/global';
import { NextPage } from 'next';

/**
 * UI Function component showing nextjs page for student create enquiry page
 * @returns {JSX.Element} JSX Element
 */
const StudentEnquiryPage: NextPage = (): JSX.Element => {
  const [option, setValue] = useState(``);
  const handleChange = (event) => setValue(event.nativeEvent.target.value);
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [coursecode, setCourseCode] = useState(``);
  const [assignment, setAssignment] = useState(``);
  const [duration, setDuration] = useState(``);
  const [AdditionalInfo, setAdditionalInfo] = useState(``);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const textColor = useColorModeValue(`#1A202C`, `white`);
  const boxColor = useColorModeValue(`white`, `#4A5568`);

  const formdata = new FormData(); // creating formdata instance for storing the attachment link
  formdata.append(`fileUpload`, fileValue);
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const getQueryID = (data) => {
    return data.data.id.toString();
  };

  /**
   * Allow only authenticated users to access this page or
   * redirect to appropriate page
   */
  useEffect(() => {
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
          title: `Enquiry created`,
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

  const createQuery = () => {
    const {
      user: { id },
    } = getCurrentUser();
    if (option === `TestConcession`) {
      if (
        coursecode.length == 0 ||
        AdditionalInfo.length == 0 ||
        fileValue == null
      ) {
        alert(`Please fill in all input fields`);
      } else {
        createEnquiryMutation.mutate({
          userId: id,
          type: option,
          courseCode: coursecode,
          messageFromStudent: AdditionalInfo,
          extensionDuration: duration,
          assignmentNo: assignment,
        });
      }
    } else if (option === `AssignmentExtension`) {
      if (
        coursecode.length == 0 ||
        assignment.length == 0 ||
        duration.length == 0 ||
        AdditionalInfo.length == 0 ||
        fileValue == null
      ) {
        alert(`Please fill in all input fields`);
      } else {
        createEnquiryMutation.mutate({
          userId: id,
          type: option,
          courseCode: coursecode,
          messageFromStudent: AdditionalInfo,
          extensionDuration: duration,
          assignmentNo: assignment,
        });
      }
    } else {
      alert(`Please fill in all input fields`);
    }
  };

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
              name="courseInput"
              id="coursecode"
              type="string"
              isDisabled={
                createEnquiryMutation.isLoading || addFileMutation.isLoading
              }
              onChange={(event) => setCourseCode(event.target.value)}
              value={coursecode}
            />

            <FormLabel mt={3} color={textColor}>
              Type
            </FormLabel>

            {/* Combo box for query types */}
            <Select
              name="selectComponent"
              defaultValue={option}
              isDisabled={
                createEnquiryMutation.isLoading || addFileMutation.isLoading
              }
              onChange={handleChange}
            >
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
                  name="file"
                  mt={5}
                  value={fileValue}
                  onChange={setFileValue}
                  placeholder="Medical certificate .pdf"
                  disabled={
                    createEnquiryMutation.isLoading || addFileMutation.isLoading
                  }
                />
                {option === `AssignmentExtension` ? (
                  <>
                    <FormLabel mt={3} color={textColor}>
                      Assignment Number
                    </FormLabel>
                    <Input
                      placeholder="e.g Assignment 1"
                      type="string"
                      onChange={(event) => setAssignment(event.target.value)}
                      value={assignment}
                      isDisabled={
                        createEnquiryMutation.isLoading ||
                        addFileMutation.isLoading
                      }
                    />
                    <FormLabel mt={3} color={textColor}>
                      Extension duration
                    </FormLabel>
                    <Input
                      placeholder="Number of days e.g 5 days"
                      type="string"
                      onChange={(event) => setDuration(event.target.value)}
                      value={duration}
                      isDisabled={
                        createEnquiryMutation.isLoading ||
                        addFileMutation.isLoading
                      }
                    />
                  </>
                ) : (
                  <></>
                )}
                <FormLabel mt={3} color={textColor}>
                  Additional Info
                </FormLabel>
                <Textarea
                  name="addInfo"
                  placeholder="Type here"
                  value={AdditionalInfo}
                  onChange={(event) => setAdditionalInfo(event.target.value)}
                  disabled={
                    createEnquiryMutation.isLoading || addFileMutation.isLoading
                  }
                />
              </>
            ) : (
              <></>
            )}

            <Button
              // event handler for the submit button
              name="Submit"
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

export default StudentEnquiryPage;
