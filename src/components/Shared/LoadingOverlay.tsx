import { LoadingOverlayProps } from '@/types/global';
import { Box, Modal, Spinner, Text } from '@chakra-ui/react';
import { ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import React from 'react';

/**
 * UI Function component for showing loading state while computing student analysis or tutor statistics
 * @param {object} props Component props
 * @param {} placeholder
 * @param {boolean} props.isOpen open state of the modal overlay
 * @param {Function} props.onClose function for closing the modal overlay
 * @returns {JSX.Element} JSX Element
 */
export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isOpen,
  onClose,
  loadingMessage,
}): JSX.Element => {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay
          bg="none"
          backdropBlur="2px"
          backdropFilter="blur(10px) hue-rotate(20deg)"
          mt={50}
        />
        <ModalContent>
          <ModalBody pb={`25%`}>
            <Box
              mt={`20%`}
              px={-20}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
              <Text mt={4} fontSize="3xl" as="b">
                {loadingMessage}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
