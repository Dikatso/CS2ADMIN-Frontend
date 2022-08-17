import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { Button } from '@chakra-ui/button';
import { Stack } from '@chakra-ui/react';

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

interface LandingPageHeaderProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
  state,
  setState,
}) => {
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes } = useStyles();

  const links: Array<Links> = [
    { tag: `login`, label: `Log In`, variant: `ghost` },
    { tag: `signup`, label: `Join`, variant: `solid` },
  ];
  const items = links.map((link, index) => (
    <Button
      key={index}
      colorScheme="teal"
      size="md"
      variant={link.variant}
      onClick={() => {
        if (link.tag === `login`) {
          router.push(`/login`);
        } else {
          router.push(`/register`);
        }
      }}
    >
      {link.label}
    </Button>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={80} className={classes.root}>
      <Container className={classes.header}>
        <Stack direction="row" h="100px" pt={4} mt={6}>
          <Button
            colorScheme="teal"
            size="md"
            variant={state ? `ghost` : `outline`}
            onClick={() => setState(!state)}
          >
            For Students
          </Button>
          <Button
            colorScheme="teal"
            size="md"
            variant={!state ? `ghost` : `outline`}
            onClick={() => setState(!state)}
          >
            For Teachers
          </Button>
        </Stack>
        {/* <MantineLogo size={28} /> */}
        {/* <Image
                  src={`/Teacher.png`}
                  alt="Picture of the teacher illustration"
                  width={347}
                  height={347}
                /> */}
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};
