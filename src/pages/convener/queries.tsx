import { useRouter } from 'next/router';
import { useMantineTheme } from '@mantine/core';
import { Accordion } from '@mantine/core';
import { Box } from '@chakra-ui/react';
import { TableSort } from '@/components/Student/TableSort';
import { ConvenerPageHeader } from '@/components/Convener/Header';
import { useEffect, useState } from 'react';
import { useAuth } from '@/auth/Auth';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MdAssignment } from 'react-icons/md';
import { HiPencil } from 'react-icons/hi';
import { Skeleton } from '@mantine/core';
import { Enquiry } from '@/types/convener';

async function fetchEnquiries() {
  const { data } = await axios.get<Promise<Enquiry[]>>(
    `http://127.0.0.1:8000/apis/enquiries`,
  );
  return data;
}

const ConvenerMenu: React.FC = () => {
  const router = useRouter();

  const { isAuthenticated, getCurrentUser } = useAuth();
  const [assignmentEnquiries, setAssignmentEnquiries] =
    useState<Enquiry[]>(null);
  const [testEnquiries, setTestEnquiries] = useState<Enquiry[]>(null);

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

  return (
    <>
      <ConvenerPageHeader />
      <Box>
        <Accordion
          variant="separated"
          mx={150}
          my={50}
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

export default ConvenerMenu;
