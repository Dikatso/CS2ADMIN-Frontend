import { useRouter } from 'next/router';
import {
  createStyles,
  Header,
  Container,
  Group,
  Paper,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons';
import { Accordion } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/react';
import { TableSort } from '@/components/Student/TableSort';
import { ConvenerPageHeader } from '@/components/Convener/Header';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: `relative`,
    zIndex: 1,
  },

  dropdown: {
    position: `absolute`,
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: `hidden`,

    [theme.fn.largerThan(`sm`)]: {
      display: `none`,
    },
  },

  header: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    height: `100%`,
  },

  links: {
    [theme.fn.smallerThan(`sm`)]: {
      display: `none`,
    },
  },

  burger: {
    [theme.fn.largerThan(`sm`)]: {
      display: `none`,
    },
  },

  link: {
    display: `block`,
    lineHeight: 1,
    padding: `8px 12px`,
    borderRadius: theme.radius.sm,
    textDecoration: `none`,
    color:
      theme.colorScheme === `dark`
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === `dark`
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan(`sm`)]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: `light`,
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: `light`, color: theme.primaryColor })
        .color,
    },
  },
}));

interface Links {
  tag: string;
  label: string;
  variant: string;
}

const StudentMenu: React.FC = () => {
  const router = useRouter();
  const [opened] = useDisclosure(false);
  const { classes } = useStyles();

  const links: Array<Links> = [
    { tag: `home`, label: `Home`, variant: `ghost` },
    { tag: `signup`, label: `Enquiries`, variant: `ghost` },
  ];
  const items = links.map((link, index) => (
    <Button
      key={index}
      colorScheme="teal"
      size="md"
      variant={link.variant}
      onClick={() => {
        if (link.tag === `home`) {
          router.push(`/convener/`);
        } else {
          router.push(`/signup`);
        }
      }}
    >
      {link.label}
    </Button>
  ));

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

export default StudentMenu;
