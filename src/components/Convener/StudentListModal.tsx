import { chartCtx, studentData } from '@/types/convener';
import { exportToCsv } from '@/utils/convener/file';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ModalFooter,
  Modal,
  Table,
  Button,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

interface StudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChartCtx: chartCtx;
}

export const StudentsModal: React.FC<StudentsModalProps> = ({
  isOpen,
  onClose,
  currentChartCtx,
}) => {
  const [students, setStudents] = useState<studentData[]>();

  const { chartLabel, rankingCount, chartRanking, rankings } = currentChartCtx;
  useEffect(() => {
    if (rankings == undefined) {
      return;
    } else {
      const selectedStudents = rankings[chartLabel][chartRanking];
      setStudents(selectedStudents);
    }
  }, [rankings, chartLabel, rankingCount, chartRanking]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(20deg)"
        />
        <ModalContent>
          <ModalHeader>
            <Text>
              Showing {rankingCount} students with {chartRanking} performance on
              {` `}
              {chartLabel}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" colorScheme="gray" size="lg">
                <TableCaption>Student Marks</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Student Number</Th>
                    <Th isNumeric>Grade</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {students?.map((student, key) => {
                    console.log(student.studentNumber);
                    return (
                      <Tr key={key}>
                        <Td>
                          <Text fontSize={20}>{student.studentNumber}</Text>
                        </Td>
                        <Td>
                          <Text fontSize={20}>{student[chartLabel]}</Text>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => exportToCsv(students, chartLabel)}
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
