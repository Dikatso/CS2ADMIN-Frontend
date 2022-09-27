import { Header, Container, Group } from '@mantine/core';
import { UserOutPopOver } from '@/components/Shared/UserPopOver';
import { HeaderIcon } from '@/components/Shared/HeaderIcon';
import { Box, Switch, useColorMode } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import React from 'react';
import router from 'next/router';
import { useStylesHeader } from '@/styles/Convener.Header';

/**
 * UI Function component for rendering page header
 * @returns {JSX.Element} JSX Element
 */
export const ConvenerPageHeader: React.FC = (): JSX.Element => {
  const HEADER_HEIGHT = 60;
  const { classes } = useStylesHeader();
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
