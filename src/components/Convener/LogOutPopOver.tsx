import {
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Popover,
  Text,
  PopoverBody,
  Center,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { Button, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '@/auth/Auth';
import { signInUserResponse } from '@/pages/login';

type userData = signInUserResponse;

export const LogOutPopOver: FC = () => {
  const initialFocusRef = React.useRef();
  const [userData, setUserData] = useState<userData>({});
  const router = useRouter();
  const { logout, getCurrentUser } = useAuth();

  useEffect(() => {
    const userData = getCurrentUser();
    setUserData(userData);
  }, []);

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
          <Center mt="2px" display="flex" flexDirection="column">
            <Box color="black">
              <Text>Logged in as {userData.user?.role}</Text>
              <Text>Email: {userData.user?.email}</Text>
              <Text>UctId: {userData.user?.uctId}</Text>
            </Box>
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
                log out
              </Text>
              <FiLogOut size={20} />
            </Button>
          </Center>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
