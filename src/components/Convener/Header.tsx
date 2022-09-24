import { createStyles, Header, Container, Group } from '@mantine/core';
import { UserOutPopOver } from '@/components/Convener/UserPopOver';
import { HeaderIcon } from '@/components/Shared/HeaderIcon';
import { Box, Switch, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import React from 'react';
import router from 'next/router';

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
      backgroundColor: bgColor,
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
export const ConvenerPageHeader: React.FC = () => {
  const { classes } = useStyles();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <HeaderIcon />
        <Group spacing={5} className={classes.links}>
          <Button
            colorScheme="blue"
            size="md"
            variant={`ghost`}
            ml={3}
            onClick={() => {
              router.push(`/convener`);
            }}
          >
            Home
          </Button>
          <Button
            colorScheme="blue"
            size="md"
            variant={`ghost`}
            ml={3}
            onClick={() => {
              router.push(`/convener/analysis`);
            }}
          >
            Analysis
          </Button>
          <Button
            colorScheme="blue"
            size="md"
            variant={`ghost`}
            ml={3}
            onClick={() => {
              router.push(`/convener/queries`);
            }}
          >
            Enquiries
          </Button>
          <Box>
            <UserOutPopOver />
          </Box>
          <Switch
            size="md"
            onChange={() => toggleColorMode()}
            color="red"
            isChecked={colorMode === `light` ? false : true}
          />
        </Group>
      </Container>
    </Header>
  );
};
