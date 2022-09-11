import { Box, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect } from 'react';
import { useMutation } from 'react-query';

interface ICreateEnquiryDto {
  userId: string;
  type: string;
  courseCode: string;
  assignmentNo: number;
}

const SeedData = () => {
  const createEnquiryMutation = useMutation((enquiry: ICreateEnquiryDto) => {
    return axios.post(`http://127.0.0.1:8000/apis/enquiry`, enquiry);
  });

  const enquiry = {
    userId: `cl7vxlqyy0016fam2yt01x898`,
    type: `AssignmentExtension`,
    courseCode: `CSC2001F`,
  };

  const mutate = () => {
    for (let i = 1; i <= 20; i++) {
      createEnquiryMutation.mutate({ ...enquiry, assignmentNo: i });
    }
  };

  useEffect(() => {
    mutate();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" mt={100}>
        {createEnquiryMutation.isLoading ? (
          <>
            <Text fontSize="6xl" mx={10}>
              Seadding data....
            </Text>
            <Spinner size="xl" />
          </>
        ) : (
          <>
            <Text fontSize="6xl">DONE!</Text>
          </>
        )}
      </Box>
    </>
  );
};

export default SeedData;
