import { useRouter } from 'next/router';
import { useMantineTheme } from '@mantine/core';
import { IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons';
import { Accordion } from '@mantine/core';
import { Box } from '@chakra-ui/react';
import { TableSort } from '@/components/Student/TableSort';
import { ConvenerPageHeader } from '@/components/Convener/Header';
import { useEffect } from 'react';
import { useAuth } from '@/auth/Auth';

const ConvenerMenu: React.FC = () => {
  const router = useRouter();

  const { isAuthenticated, getCurrentUser } = useAuth();

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

  const theme = useMantineTheme();
  const getColor = (color: string) =>
    theme.colors[color][theme.colorScheme === `dark` ? 5 : 7];

  return (
    <>
      <ConvenerPageHeader />
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
                    id: `56gt`,
                    course: `CSC3002F`,
                    assignNo: `1`,
                    submitDate: `15-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Submitted`,
                  },
                  {
                    id: `et456`,
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
                    id: `43ww`,
                    course: `CSC3002F`,
                    assignNo: `1`,
                    testNo: `2`,
                    submitDate: `15-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Submitted`,
                  },
                  {
                    id: `rr223`,
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
                    id: `wer23`,
                    course: `CSC3002F`,
                    assignNo: `1`,
                    submitDate: `15-08-2022`,
                    updateDate: `20-08-2022`,
                    status: `Submitted`,
                  },
                  {
                    id: `6r5ew`,
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

export default ConvenerMenu;
