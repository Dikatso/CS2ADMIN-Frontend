import { useRouter } from 'next/router';
import { useMantineTheme } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Box, Center, Text } from '@chakra-ui/react';
import { TableSort } from '@/components/Shared/TableSort';
import { StudentPageHeader } from '@/components/Student/Header';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/Auth';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MdAssignment } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { Skeleton } from '@mantine/core';
import { Enquiry } from '@/types/global';

/**
 * UI Function component showing nextjs page for student enquiries page
 * @returns {JSX.Element} JSX Element
 */
const StudentMenuPage: React.FC = (): JSX.Element => {
  const router = useRouter();

  const { isAuthenticated, getCurrentUser } = useAuth();
  const [assignmentEnquiries, setAssignmentEnquiries] =
    useState<Enquiry[]>(null);
  const [testEnquiries, setTestEnquiries] = useState<Enquiry[]>(null);

  const fetchEnquiriesByUserId = async () => {
    const { getCurrentUser } = useAuth();
    const { user } = getCurrentUser();
    const { data } = await axios.get<Promise<Enquiry[]>>(
      `http://127.0.0.1:8000/apis/enquiries/${user.id}`,
    );
    return data;
  };

  const { data, isLoading, isSuccess } = useQuery(
    `fetchEnquiriesByUserId`,
    fetchEnquiriesByUserId,
  );

  /**
   * Allow only authenticated users to access this page or
   * redirect to appropriate page
   */
  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      role == `Convener`
        ? router.push(`/convener`)
        : () => {
            console.log();
          };
    } else {
      router.push(`/`);
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data != null) {
      const assignmentEnquiries = data.filter(
        (enquiry) => enquiry.type == `AssignmentExtension`,
      );
      setAssignmentEnquiries(assignmentEnquiries);
      const testEnquiries = data.filter(
        (enquiry) => enquiry.type == `TestConcession`,
      );
      setTestEnquiries(testEnquiries);
    }
  }, [isSuccess, data]);

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === `dark` ? 5 : 7];

  return (
    <>
      <StudentPageHeader />
      <Box>
        <Center mt={5}>
          <Text fontSize="5xl" as="b">
            My Enquiries
          </Text>
        </Center>
        <Accordion
          variant="separated"
          mx={150}
          my={25}
          transitionDuration={500}
        >
          {isLoading || assignmentEnquiries == null ? (
            <Skeleton visible={true} height={60} />
          ) : (
            <Accordion.Item value="photos" mb={12}>
              <Accordion.Control
                icon={<MdAssignment size={20} color={getColor(`red`)} />}
              >
                Assignment Extensions
              </Accordion.Control>
              <Accordion.Panel>
                <TableSort
                  tableType="assignment"
                  data={assignmentEnquiries}
                  view="student"
                />
              </Accordion.Panel>
            </Accordion.Item>
          )}

          {isLoading || testEnquiries == null ? (
            <Skeleton visible={true} height={60} mt={15} />
          ) : (
            <Skeleton visible={isLoading}>
              <Accordion.Item value="print" mb={12}>
                <Accordion.Control
                  icon={<HiPencil size={20} color={getColor(`blue`)} />}
                >
                  Test Concessions
                </Accordion.Control>
                <Accordion.Panel>
                  <TableSort
                    tableType="test"
                    data={testEnquiries}
                    view="student"
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Skeleton>
          )}
        </Accordion>
      </Box>
    </>
  );
};

export default StudentMenuPage;
