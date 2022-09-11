import { Enquiry } from '@/types/convener';
import { Box, Text, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import { NoDaysPopOverForm } from '@/components/Shared/NoDaysPopOverForm';

interface AssessmentDetailsProps {
  enquiry: Enquiry;
  updatedNoDays: string;
  view: 'student' | 'convener';
  setUpdatedNoDays: React.Dispatch<React.SetStateAction<string>>;
}

export const AssessmentDetails: React.FC<AssessmentDetailsProps> = ({
  enquiry,
  updatedNoDays,
  setUpdatedNoDays,
  view,
}) => {
  const isExtension = enquiry.type == `AssignmentExtension`;

  return (
    <>
      <Text color="#333333" fontSize={`xl`} as="b">
        {isExtension ? `Assignment Details` : `Test Details`}
      </Text>
      <Box
        my={3}
        borderColor="#bfbfbf"
        bgColor="white"
        boxShadow="xs"
        borderRadius={10}
      >
        <Box boxShadow="xs" borderColor="#bfbfbf" borderTopRadius={10}>
          <Flex>
            <Text p="4" color="#969799" as="b">
              No.
            </Text>
            <Spacer />
            <Text p="4" as="b">
              {isExtension ? enquiry.assignmentNo : enquiry.testNo}
            </Text>
          </Flex>
        </Box>
        <Box
          borderColor="#bfbfbf"
          boxShadow="xs"
          borderBottomRadius={isExtension ? 0 : 10}
        >
          <Flex>
            <Text p="4" color="#969799" as="b">
              Course
            </Text>
            <Spacer />
            <Text p="4" as="b">
              {enquiry.courseCode}
            </Text>
          </Flex>
        </Box>
        {isExtension ? (
          <Box borderColor="#bfbfbf" boxShadow="xs" borderBottomRadius={10}>
            <Flex>
              <Text p="4" color="#969799" as="b">
                No of days requested
              </Text>
              <Spacer />
              <Text p="4" as="b" mr={2}>
                {enquiry.extensionDuration}
              </Text>
              {view == `convener` ? (
                <NoDaysPopOverForm
                  noOfDays={updatedNoDays}
                  onChange={setUpdatedNoDays}
                  originalNoOfDays={enquiry.extensionDuration}
                />
              ) : (
                <></>
              )}
            </Flex>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};
