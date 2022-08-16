import { Button, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const StudentHome = () => {
  const router = useRouter();
  return (
    <Box mx="25%">
      <Button onClick={() => router.push(`/student/queries`)}>
        View Submitted Enquiries
      </Button>
    </Box>
  );
};

export default StudentHome;
