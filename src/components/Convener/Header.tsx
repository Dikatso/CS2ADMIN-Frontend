import { createStyles, Header, Container, Group } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { Button } from '@chakra-ui/button';
import {
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Popover,
  Box,
  Text,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Center,
} from '@chakra-ui/react';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';

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

function WalkthroughPopover() {
  const initialFocusRef = React.useRef();
  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom-start"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button bg="white" colorScheme="teal" variant="ghost">
          <MdArrowDropDownCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="#F1F6F9" width="150px">
        <PopoverArrow bg="#F1F6F9" />
        <PopoverBody>
          <Center mt="2px">
            <Button size="sm" colorScheme="red" variant="solid">
              <Text
                colorScheme="blue"
                ref={initialFocusRef}
                fontSize="lg"
                mr="5px"
              >
                log out
              </Text>
              <FiLogOut size={20} />
            </Button>
          </Center>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export const ConvenerPageHeader: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <MantineLogo size={28} />
        <Group spacing={2} className={classes.links}>
          <Button colorScheme="teal" size="md" variant={`ghost`}>
            Home
          </Button>
          <Button colorScheme="teal" size="md" variant={`ghost`}>
            Analysis
          </Button>
          <Button colorScheme="teal" size="md" variant={`ghost`}>
            Enquiries
          </Button>
          <Box>
            <WalkthroughPopover />
          </Box>
        </Group>
      </Container>
    </Header>
  );
};
