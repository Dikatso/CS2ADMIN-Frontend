import { useRouter } from 'next/router';
import { useMantineTheme } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Box, useColorModeValue, Text, Center } from '@chakra-ui/react';
import { TableSort } from '@/components/Shared/TableSort';
import { ConvenerPageHeader } from '@/components/Convener/Header';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/Auth';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MdAssignment } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { Skeleton } from '@mantine/core';
import { Enquiry } from '@/types/global';
import { NextPage } from 'next';

/**
 * UI Function component showing nextjs page for convener main menu
 * @returns {JSX.Element} JSX Element
 */
const ConvenerMenuPage: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { isAuthenticated, getCurrentUser } = useAuth();
  const [assignmentEnquiries, setAssignmentEnquiries] =
    useState<Enquiry[]>(null);
  const [testEnquiries, setTestEnquiries] = useState<Enquiry[]>(null);

  const fetchEnquiries = async () => {
    const { data } = await axios.get<Promise<Enquiry[]>>(
      `http://127.0.0.1:8000/apis/enquiries`,
    );
    return data;
  };

  const { data, isLoading, isSuccess } = useQuery(
    `fetchEnquiries`,
    fetchEnquiries,
  );

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

  const bgColor = useColorModeValue(`white`, `#1A202C`);
  const tableColor = useColorModeValue(`gray`, `#EDF2F7`);
  const textColor = useColorModeValue(`#1A202C`, `white`);

  return (
    <>
      <ConvenerPageHeader />
      <Box>
        <Center mt={5}>
          <Text fontSize="5xl" as="b">
            Student Enquiries
          </Text>
        </Center>
        <Accordion
          variant="separated"
          mx={150}
          mt={25}
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
                  view="convener"
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
                    view="convener"
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

export default ConvenerMenuPage;
