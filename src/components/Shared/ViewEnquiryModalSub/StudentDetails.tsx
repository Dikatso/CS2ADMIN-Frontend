import { StudentDetailsProps, Enquiry } from '@/types/global';
import { Box, Text, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

/**
 * UI Function component for displaying student details based on the passed enquiry
 * @param {object} props Component props
 * @param {} placeholder
 * @param {Enquiry} props.enquiry selected Enquiry from list view
 * @returns {JSX.Element} JSX Element
 */
export const StudentDetails: React.FC<StudentDetailsProps> = ({
  enquiry,
}): JSX.Element => {
  const bgColor = useColorModeValue(`white`, `#4A5568`);
  const textColor = useColorModeValue(`#1A202C`, `white`);

  return (
    <>
      <Text color={textColor} fontSize={`xl`} as="b">
        Student Details
      </Text>
      <Box
        my={3}
        borderColor="#bfbfbf"
        bgColor={bgColor}
        boxShadow="xs"
        borderRadius={10}
      >
        <Box borderColor="#bfbfbf" boxShadow="xs" borderTopRadius={10}>
          <Flex>
            <Text p="4" color="#969799" as="b">
              Name & Surname
            </Text>
            <Spacer />
            <Text p="4" as="b">
              {enquiry.user.name}
            </Text>
          </Flex>
        </Box>
        <Box boxShadow="xs" borderColor="#bfbfbf" borderBottomRadius={10}>
          <Flex>
            <Text p="4" color="#969799" as="b">
              Student Number
            </Text>
            <Spacer />
            <Text p="4" as="b">
              {enquiry.user.uctId}
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};
