import {
  Button,
  useDisclosure,
  Text,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  ButtonGroup,
  IconButton,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { Stack } from '@mantine/core';
import { TbEdit } from 'react-icons/tb';
import FocusLock from 'react-focus-lock';
import React from 'react';
import { NoDaysPopOverFormProps } from '@/types/global';

/**
 * UI Function component Form for updating no of days of an assessment
 * @param {object} props Component props
 * @param {} placeholder
 * @param {string} props.noOfDays new/updated no of days of assessment
 * @param {string} props.originalNoOfDays actual no of days of assessment
 * @param {React.Dispatch<React.SetStateAction<string>>} props.onChange setState function for updating no of days
 * @returns {JSX.Element} JSX Element
 */
export const NoDaysPopOverForm: React.FC<NoDaysPopOverFormProps> = ({
  noOfDays,
  onChange,
  originalNoOfDays,
}): JSX.Element => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
        size="sm"
      >
        <PopoverTrigger>
          <IconButton
            mt={3}
            mr={3}
            size="sm"
            icon={<TbEdit />}
            aria-label={``}
          />
        </PopoverTrigger>
        <PopoverContent p={5} w="230px">
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Stack spacing={4}>
              <Text>Updated No. of days</Text>
              <Input
                id="no of days"
                value={noOfDays}
                onChange={(e) => onChange(e.target.value)}
              />
              <ButtonGroup display="flex" justifyContent="flex-end" pt={2}>
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    onChange(originalNoOfDays);
                  }}
                  w="full"
                >
                  Cancel
                </Button>
                <Button colorScheme="teal" onClick={onClose} w="full">
                  Save
                </Button>
              </ButtonGroup>
            </Stack>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};
