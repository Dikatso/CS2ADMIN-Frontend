import { Text, Box, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import router from 'next/router';
import { FaLaptopCode } from 'react-icons/fa';

/**
 * UI Function component for displaying website Logo
 * @returns {JSX.Element} JSX Element
 */
export const HeaderIcon: React.FC = (): JSX.Element => {
  const textColor = useColorModeValue(`#1A202C`, `white`);

  return (
    <Box
      display="flex"
      flexDirection="row"
      mt={2}
      onClick={() => router.push(`/`)}
      _hover={{ cursor: `pointer` }}
    >
      <Icon as={FaLaptopCode} w={7} h={7} color="blue.500" />
      <Text fontSize="xl" as="b" ml={2} color={textColor}>
        CS2ADMIN
      </Text>
    </Box>
  );
};
