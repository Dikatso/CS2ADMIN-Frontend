import { useRouter } from 'next/router';
import { HeaderIcon } from '@/components/Shared/HeaderIcon';

import {
  createStyles,
  Header,
  Container,
  Group,
  Paper,
  Transition,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  Switch,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { LandingPageHeaderProps, Links } from '@/types/global';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => {
  const bgColor = useColorModeValue(`white`, `#1A202C`);

  return {
    root: {
      position: `relative`,
      zIndex: 1,
      backgroundColor: bgColor,
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
  };
});

/**
 * UI Function component for rendering page header
 * @returns JSX.Element
 */
export const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
  state,
  setState,
}) => {
  const router = useRouter();
  const [opened] = useDisclosure(false);
  const { classes } = useStyles();
  const { colorMode, toggleColorMode } = useColorMode();

  const links: Array<Links> = [
    { tag: `login`, label: `Sign In`, variant: `ghost` },
    { tag: `signup`, label: `Join`, variant: `solid` },
  ];

  const items = links.map((link, index) => (
    <Button
      key={index}
      colorScheme="blue"
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
        <HeaderIcon />
        <Stack direction="row" h="100px" pt={4} mt={6}>
          <Button
            colorScheme="blue"
            size="md"
            variant={state ? `ghost` : `outline`}
            onClick={() => setState(!state)}
          >
            For Students
          </Button>
          <Button
            colorScheme="blue"
            size="md"
            variant={!state ? `ghost` : `outline`}
            onClick={() => setState(!state)}
          >
            For Teachers
          </Button>
        </Stack>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>

        <Switch
          size="md"
          onChange={() => toggleColorMode()}
          color="red"
          isChecked={colorMode === `light` ? false : true}
        />
      </Container>
    </Header>
  );
};
