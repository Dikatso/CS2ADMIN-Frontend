import { StudentHeader } from '@/components/Student/studentform';
import { StudentPageHeader } from '@/components/Student/Header';

import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { FileInput } from '@mantine/core';
import { useState } from 'react';
import { IconUpload } from '@tabler/icons';

const StudentPage = () => {
  const [value, setValue] = useState<string | null>(null);

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
          {/* <FormHelperText>*This is a required field</FormHelperText> */}
          <FormLabel>Extension Duration</FormLabel>
          <Input type="string" />
          <FormLabel>Type</FormLabel>

          <Select placeholder="Select option">
            <option value="extension">Assignment Extension</option>
            <option value="concession">Test concession</option>
            <option value="general">General Admin Query</option>
          </Select>
          <FormLabel>Upload Medical Certificate</FormLabel>
          <FileInput
            mt={5}
            placeholder="Medical certificate .pdf or .jpeg"
            icon={<IconUpload size={14} />}
          />
          <Button mt={5} colorScheme="teal">
            Submit
          </Button>
        </FormControl>
      </Center>
    </>
  );
};

export default StudentPage;
