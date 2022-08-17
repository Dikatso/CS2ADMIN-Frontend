import { Dispatch, SetStateAction, useState } from 'react';
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
import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import { Button } from '@chakra-ui/button';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { ClassNames } from '@emotion/react';

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

interface studentHeaderProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const StudentHeader: React.FC = () => {
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes } = useStyles();

  const links: Array<Links> = [
    { tag: `home`, label: `Home`, variant: `ghost` },
    { tag: `enquiries`, label: `Enquiries`, variant: `solid` },
  ];

  return (
    <Header height={HEADER_HEIGHT} mb={80} className={classes.root}>
      <Container className={classes.header}>
        <Stack direction="row" h="100px" pt={4} mt={6}>
          <Button colorScheme="teal" size="md">
            Home
          </Button>
          <Button colorScheme="teal" size="md">
            Enquiries
          </Button>
        </Stack>
        <MantineLogo size={28} />

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {/* {items} */}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};
function handleSubmit(
  onSubmitForm: any,
): React.FormEventHandler<HTMLFormElement> {
  throw new Error(`Function not implemented.`);
}

function onSubmitForm(
  onSubmitForm: any,
): React.FormEventHandler<HTMLFormElement> {
  throw new Error(`Function not implemented.`);
}

function register(arg0: {
  required: { value: boolean; message: string };
}): React.LegacyRef<HTMLInputElement> {
  throw new Error(`Function not implemented.`);
}