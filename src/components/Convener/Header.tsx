import { createStyles, Header, Container, Group } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { LogOutPopOver } from '@/components/Convener/LogOutPopOver';
import { Box, color, extendTheme } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import React from 'react';
import router from 'next/router';

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

export const ConvenerPageHeader: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        {/* <MantineLogo size={28} /> */}
        <div>CS2ADMIN </div>
        {/* <Box textStyle='h1'>This is a box</Box> */}
        <Group spacing={5} className={classes.links}>
          <Button
            colorScheme="teal"
            size="md"
            variant={`ghost`}
            onClick={() => {
              router.push(`/convener`);
            }}
          >
            Home
          </Button>
          <Button
            colorScheme="teal"
            size="md"
            variant={`ghost`}
            onClick={() => {
              router.push(`/convener/analysis`);
            }}
          >
            Analysis
          </Button>
          <Button
            colorScheme="teal"
            size="md"
            variant={`ghost`}
            onClick={() => {
              router.push(`/convener/queries`);
            }}
          >
            Enquiries
          </Button>
          <Box>
            <LogOutPopOver />
          </Box>
        </Group>
      </Container>
    </Header>
  );
};
