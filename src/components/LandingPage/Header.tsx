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
import { Button, Switch, Stack, useColorMode } from '@chakra-ui/react';
import { LandingPageHeaderProps, Links } from '@/types/global';
import { useStylesHeader } from '@/styles/LandingPage.Header';

/**
 * UI Function component for rendering page header
 * @param {object} props Component props
 * @param {} placeholder
 * @param {boolean} props.state view of the current user
 * @param {Dispatch<SetStateAction<boolean>>} props.setState setState function for updating the state of the view
 * @returns {JSX.Element} JSX Element
 */
export const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({
  state,
  setState,
}) => {
  const router = useRouter();
  const [opened] = useDisclosure(false);
  const { classes } = useStylesHeader();
  const { colorMode, toggleColorMode } = useColorMode();
  const HEADER_HEIGHT = 60;

  const links: Array<Links> = [
    { tag: `login`, label: `Sign In`, variant: `ghost` },
    { tag: `signup`, label: `Join`, variant: `solid` },
  ];

  const items = links.map((link, index) => (
    <Button
      key={index}
      colorScheme="blue"
      size="md"
      name={link.tag}
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
