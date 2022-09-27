import {
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Popover,
  Text,
  PopoverBody,
  Center,
  Divider,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { Button, Box, VStack, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth/Auth';
import { Avatar } from '@mantine/core';
import { userData } from '@/types/global';

/**
 * UI Function component for displaying currently logged in user
 * @returns {JSX.Element} JSX Element
 */
export const UserOutPopOver: FC = (): JSX.Element => {
  const initialFocusRef = React.useRef();
  const [userData, setUserData] = useState<userData>({});
  const router = useRouter();
  const { logout, getCurrentUser } = useAuth();

  useEffect(() => {
    const userData = getCurrentUser();
    setUserData(userData);
  }, []);

  const tColor = useColorModeValue(`white`, `#1A202C`);
  const tReversedColor = useColorModeValue(`#1A202C`, `white`);
  const popOverBgColor = useColorModeValue(`#F1F6F9`, `#718096`);

  return (
    <Popover
      initialFocusRef={initialFocusRef}
      placement="bottom-start"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button color={tReversedColor} variant="ghost" ml={1} bg={tColor}>
          <MdArrowDropDownCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg={popOverBgColor} width="full">
        <PopoverArrow bg={popOverBgColor} />
        <PopoverBody>
          <Center mt="2px" display="flex" flexDirection="column">
            <VStack>
              <Box color={tReversedColor}>
                <Center display="flex" flexDirection="column">
                  <Avatar radius="xl" />
                  <Text fontSize="lg" as="b">
                    {userData?.user?.role}
                  </Text>
                </Center>
                <Divider />
                <VStack>
                  <Text>{userData?.user?.name}</Text>
                  <Text>@{userData?.user?.uctId}</Text>
                  <Text>{userData?.user?.email}</Text>
                </VStack>
              </Box>
              <Divider />
              <Button
                size="sm"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  logout();
                  router.push(`/`);
                }}
              >
                <Text
                  colorScheme="blue"
                  ref={initialFocusRef}
                  fontSize="lg"
                  mr="5px"
                >
                  Sign out
                </Text>
                <FiLogOut size={20} />
              </Button>
            </VStack>
          </Center>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
