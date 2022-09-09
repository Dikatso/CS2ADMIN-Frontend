import { useRouter } from 'next/router';
import { useMantineTheme } from '@mantine/core';
import { IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons';
import { Accordion } from '@mantine/core';
import { Box } from '@chakra-ui/react';
import { TableSort } from '@/components/Student/TableSort';
import { StudentPageHeader } from '@/components/Student/Header';
import { useEffect } from 'react';
import { useAuth } from '@/auth/Auth';

const StudentMenu: React.FC = () => {
  const router = useRouter();

  const { isAuthenticated, getCurrentUser } = useAuth();

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

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === `dark` ? 5 : 7];

  return (
    <>
      <StudentPageHeader />
      <Box>
        <Accordion variant="contained" mx={150} my={50}>
          <Accordion.Item value="photos">
            <Accordion.Control
              icon={<IconPhoto size={20} color={getColor(`red`)} />}
            >
              Assignment Extensions
            </Accordion.Control>
            <Accordion.Panel>
              <TableSort
                tableType="assignment"
                data={[
                  {
                    id: `yg25`,
                    course: `CSC3002F`,
                    assignNo: `1`,
                    submitDate: `15-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Submitted`,
                  },
                  {
                    id: `242hg`,
                    course: `CSC3002F`,
                    assignNo: `6`,
                    submitDate: `20-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Updated`,
                  },
                ]}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="print">
            <Accordion.Control
              icon={<IconPrinter size={20} color={getColor(`blue`)} />}
            >
              Test Concessions
            </Accordion.Control>
            <Accordion.Panel>
              <TableSort
                tableType="test"
                data={[
                  {
                    id: `sf34`,
                    course: `CSC3002F`,
                    assignNo: `1`,
                    testNo: `2`,
                    submitDate: `15-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Submitted`,
                  },
                  {
                    id: `df65`,
                    course: `CSC3002F`,
                    assignNo: ``,
                    submitDate: `20-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Updated`,
                  },
                ]}
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="camera">
            <Accordion.Control
              icon={<IconCameraSelfie size={20} color={getColor(`teal`)} />}
            >
              General Admin Queries
            </Accordion.Control>
            <Accordion.Panel>
              <TableSort
                tableType="assignment"
                data={[
                  {
                    id: `67ty`,
                    course: `CSC3002F`,
                    assignNo: `1`,
                    submitDate: `15-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Submitted`,
                  },
                  {
                    id: `dt76`,
                    course: `CSC3002F`,
                    assignNo: ``,
                    submitDate: `20-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Updated`,
                  },
                ]}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
    </>
  );
};

export default StudentMenu;
