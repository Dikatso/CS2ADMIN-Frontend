import { ConvenerPageHeader } from '@/components/Convener/Header';
import { Footer } from '@/components/Shared/Footer';
import {
  Box,
  Select,
  Spinner,
  Text,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useStudentStore } from '@/state/studentDataStore';
import { Stat } from '@/components/Convener/Stat';
import { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/Auth';
import { IAssignmentMarksWithTutors, ITutorWithMarks } from '@/types/global';
import { UnstyledButton, Group, Center } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { tutorsWithMarks } from '@/utils/convener/tutorManagement';
import { useStyles } from '@/styles/ManagementResults';

const ManagementResults: NextPage = () => {
  const router = useRouter();
  const bgColor = useColorModeValue(`white`, `#1A202C`);
  const { classes } = useStyles();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const { students, studentTutorAllocation } = useStudentStore();
  const [assignmentTutorsWithMarks, setAssignmentTutorsWithMarks] =
    useState<IAssignmentMarksWithTutors>([]);
  const [assignmentNumber, setAssignmentNumber] = useState(0); // assignment no. represented on the control
  const [currentTutorsWithMarks, setCurrentTutorsWithMarks] = useState<
    ITutorWithMarks[]
  >([]); // list of markers with marks for a particular assignment
  const [currentTutorWithMarks, setCurrentTutorWithMarks] =
    useState<ITutorWithMarks>(); // represents the marker that is selected on the select input

  useEffect(() => {
    const populateTutorsWithMarks = async () => {
      setAssignmentTutorsWithMarks({
        a1: await tutorsWithMarks(`a1`, students, studentTutorAllocation),
        a2: await tutorsWithMarks(`a2`, students, studentTutorAllocation),
        a3: await tutorsWithMarks(`a3`, students, studentTutorAllocation),
        a4: await tutorsWithMarks(`a4`, students, studentTutorAllocation),
        a5: await tutorsWithMarks(`a5`, students, studentTutorAllocation),
        a6: await tutorsWithMarks(`a6`, students, studentTutorAllocation),
      });
    };
    populateTutorsWithMarks();
  }, []);

  useEffect(() => {
    if (students.length == 0) {
      router.push(`/convener/management/`);
    }
  }, [students, studentTutorAllocation]);

  /**
   * Allow only authenticated users to access this page or
   * redirect to appropriate page
   */
  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      role == `Student`
        ? router.push(`/student`)
        : () => {
            console.log();
          };
    } else {
      router.push(`/`);
    }
  }, []);

  /**
   * updates the list of tutors/markers after changing the assignment number
   * & display stats of the first tutor
   */
  useEffect(() => {
    const tutorsWithMarks = assignmentTutorsWithMarks[`a${assignmentNumber}`];
    setCurrentTutorsWithMarks(tutorsWithMarks || null);

    console.log(tutorsWithMarks);

    if (tutorsWithMarks != undefined) {
      const tutorWithMarks = tutorsWithMarks[0];
      // console.log(tutorWithMarks);
      setCurrentTutorWithMarks(tutorWithMarks || []);
    }
  }, [assignmentNumber]);

  /**
   * Updates the current tutors based on a particular assignment
   * @param value - input change element
   */
  const handleOnChange = (value: ChangeEvent<HTMLSelectElement>) => {
    const selectedTutor = value.nativeEvent.target?.value;
    // retreive the object (marker, marks) that matches with the selected marker on the selection input
    const tutorWithMarks = currentTutorsWithMarks.filter(
      (item) => item.tutor === selectedTutor,
    )[0];
    setCurrentTutorWithMarks(tutorWithMarks);
  };

  return (
    <Box bg={bgColor}>
      <ConvenerPageHeader />
      {students.length == 0 ? (
        <Box>
          <Box display="flex" justifyContent="center" mt="15%">
            <Spinner size="xl" />
          </Box>
        </Box>
      ) : (
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt={20}
          bg={bgColor}
        >
          <Text fontSize="5xl" fontWeight={700} mb={10}>
            Tutor Management
          </Text>
          {/* populate select values with current tutors */}
          <Box display="flex" flexDirection="row" w="50%">
            <Text fontSize="2xl" mt={1} mr={10}>
              Select Tutor
            </Text>
            <Spacer />
            <Select
              placeholder="Select tutor"
              w="70.5%"
              mb={10}
              onChange={handleOnChange}
            >
              {currentTutorsWithMarks?.map((item, key) => {
                return (
                  <option key={key} value={item.tutor}>
                    {item.tutor}
                  </option>
                );
              })}
            </Select>
          </Box>

          {/* Selected assignment controls */}
          <div className={classes.root}>
            <div className={classes.controls}>
              <UnstyledButton
                className={classes.control}
                onClick={() =>
                  setAssignmentNumber((current) => {
                    if (current != 6) {
                      return current + 1;
                    }
                    return current;
                  })
                }
              >
                <IconChevronUp className={classes.controlIcon} stroke={1.5} />
              </UnstyledButton>
              <div className={classes.assessment}>
                <Text className={classes.assignmentNo}>{assignmentNumber}</Text>
                <Text className={classes.assignment}>{`Assignment`}</Text>
              </div>
              <UnstyledButton
                className={classes.control}
                onClick={() =>
                  setAssignmentNumber((current) => {
                    if (current != 1) {
                      return current - 1;
                    }
                    return current;
                  })
                }
              >
                <IconChevronDown className={classes.controlIcon} stroke={1.5} />
              </UnstyledButton>
            </div>

            {/* tutor statistics */}
            <Group sx={{ flex: 1 }}>
              {/* checks to see if we have the data for that assignment and its tutor allocation */}
              {currentTutorsWithMarks == null ||
              currentTutorsWithMarks.length == 1 ? (
                <Center>
                  <Text fontSize="2xl" fontWeight={700} color="white">
                    No Dataset
                  </Text>
                </Center>
              ) : (
                <>
                  <Stat
                    currentTutorWithMarks={currentTutorWithMarks}
                    type="max"
                  />
                  <Stat
                    currentTutorWithMarks={currentTutorWithMarks}
                    type="mean"
                  />
                  <Stat
                    currentTutorWithMarks={currentTutorWithMarks}
                    type="min"
                  />
                </>
              )}
            </Group>
          </div>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default ManagementResults;
