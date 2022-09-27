import { AssessmentDetailsProps, Enquiry } from '@/types/global';
import { Box, Text, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { NoDaysPopOverForm } from '@/components/Shared/NoDaysPopOverForm';

/**
 * UI Function component for showing assessment details
 * @param {object} props Component props
 * @param {} placeholder
 * @param {Enquiry} props.enquiry selected Enquiry from list view
 * @param {string} props.view represent the current user view
 * @param {string} props.updatedNoDays new no of days from input feild
 * @param {Function} props.setUpdatedNoDays function for updating the state for no of days
 * @returns {JSX.Element} JSX Element
 */
export const AssessmentDetails: React.FC<AssessmentDetailsProps> = ({
  enquiry,
  updatedNoDays,
  setUpdatedNoDays,
  view,
}): JSX.Element => {
  const isExtension = enquiry.type == `AssignmentExtension`;
  const bgColor = useColorModeValue(`white`, `#4A5568`);
  const textColor = useColorModeValue(`#1A202C`, `white`);

  return (
    <>
      <Text color={textColor} fontSize={`xl`} as="b">
        {isExtension ? `Assignment Details` : `Test Details`}
      </Text>
      <Box
        my={3}
        borderColor="#bfbfbf"
        bgColor={bgColor}
        boxShadow="xs"
        borderRadius={10}
      >
        {isExtension ? (
          <Box boxShadow="xs" borderColor="#bfbfbf" borderTopRadius={10}>
            <Flex>
              <Text p="4" color="#969799" as="b">
                No.
              </Text>
              <Spacer />
              <Text p="4" as="b">
                {enquiry.assignmentNo}
              </Text>
            </Flex>
          </Box>
        ) : (
          <></>
        )}

        <Box borderColor="#bfbfbf" boxShadow="xs" borderRadius={10}>
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
