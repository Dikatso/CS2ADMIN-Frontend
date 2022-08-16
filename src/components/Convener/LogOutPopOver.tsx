import {
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Popover,
  Text,
  PopoverBody,
  Center,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { MdArrowDropDownCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { Button } from '@chakra-ui/button';

export const LogOutPopOver: React.FC = () => {
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
};
