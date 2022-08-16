import { ConvenerPageHeader } from '@/components/Convener/Header';
import { Footer } from '@/components/Shared/Footer';
import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useStudentStore } from '@/state/studentDataStore';
import { FileDropZone } from '@/components/Convener/FileDropZone';

const ConvenerAnalysis: NextPage = () => {
  const { setStudents } = useStudentStore();

  return (
    <Box bg="white">
      <ConvenerPageHeader />
      <Box
        height="100%"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        mt={40}
        bg="white"
      >
        <FileDropZone setStudents={setStudents} />
      </Box>
      <Footer />
    </Box>
  );
};

export default ConvenerAnalysis;
