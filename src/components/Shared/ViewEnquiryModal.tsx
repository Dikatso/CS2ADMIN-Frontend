import { Enquiry } from '@/types/convener';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
  Spacer,
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { StatusBadge } from '@/components/Shared/StatusBadge';
import { StudentDetails } from '@/components/Shared/ViewEnquiryModalSub/StudentDetails';
import { AssessmentDetails } from '@/components/Shared/ViewEnquiryModalSub/AssessmentDetails';
import { TabDetails } from '@/components/Shared/ViewEnquiryModalSub/TabDetails';
import { useMutation, useQueryClient } from 'react-query';
import moment from 'moment';

interface StudentEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: Enquiry;
  view: 'student' | 'convener';
}

export const StudentEnquiryModal: React.FC<StudentEnquiryModalProps> = ({
  onClose,
  isOpen,
  enquiry,
  view,
}) => {
  const messageFromUser = () =>
    view === `student`
      ? enquiry.messageFromStudent
      : enquiry.messageFromConvener;
  const queryClient = useQueryClient();
  const [actionType, setActionType] = useState(``);
  const [notesToUser, setNotesToUser] = useState(messageFromUser());
  const [updatedNoDays, setUpdatedNoDays] = useState(enquiry.extensionDuration);

  const updateMutation = useMutation(
    (enq: any) => {
      return axios.put(`http://127.0.0.1:8000/apis/enquiry/${enquiry.id}`, enq);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`fetchEnquiries`);
        onClose();
      },
    },
  );

  const deleteMutation = useMutation(
    () => {
      return axios.delete(`http://127.0.0.1:8000/apis/enquiry/${enquiry.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`fetchEnquiries`);
        onClose();
      },
    },
  );

  interface StatusFeilds {
    isLoading: boolean;
    isDisabled: boolean;
  }

  interface ButtonStatuses {
    Reject: StatusFeilds;
    Accept: StatusFeilds;
    Delete: StatusFeilds;
    Update: StatusFeilds;
  }

  /**
   * finds out the status (loading & disabled) of each button
   * @returns object with statuses
   */
  const status = (): ButtonStatuses => {
    const statusIs = [`Approved`, `Rejected`].includes(enquiry.status);
    return {
      Reject: {
        isLoading: updateMutation.isLoading && actionType == `Rejected`,
        isDisabled: updateMutation.isLoading && actionType != `Rejected`,
      },
      Accept: {
        isLoading: updateMutation.isLoading && actionType == `Approved`,
        isDisabled: updateMutation.isLoading && actionType != `Approved`,
      },
      Delete: {
        isLoading: deleteMutation.isLoading && actionType == ``,
        isDisabled:
          (deleteMutation.isLoading && actionType != ``) ||
          updateMutation.isLoading ||
          statusIs,
      },
      Update: {
        isLoading: updateMutation.isLoading && actionType == enquiry.status,
        isDisabled:
          (updateMutation.isLoading && actionType != enquiry.status) ||
          deleteMutation.isLoading ||
          statusIs,
      },
    };
  };

  const { Reject, Accept, Delete, Update } = status();

  /**
   * submit method
   * @param status - new status of the enquiry
   */
  const onSubmit = (status: string) => {
    // if status not specified, assume deletion of enquiry
    if (status == ``) {
      setActionType(status);
      deleteMutation.mutate();
    } else {
      setActionType(status);
      if (view === `convener`) {
        updateMutation.mutate({
          status: status,
          messageFromConvener: notesToUser,
          extensionDuration: updatedNoDays,
        });
      } else {
        updateMutation.mutate({
          status: status,
          messageFromStudent: notesToUser,
        });
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" flexDirection="row">
            <Box
              bg="white"
              w="full"
              display="flex"
              flexDirection="column"
              pt={5}
            >
              <Text fontSize={`4xl`}>
                {enquiry.type == `AssignmentExtension`
                  ? `Assignment Extension`
                  : `Test Concession`}
              </Text>
              <Text fontSize={`md`} color="#969799">
                Submited: {moment(enquiry.createdAt).format(`llll`)}
              </Text>
            </Box>
            <StatusBadge enquiryStatus={enquiry.status} size="lg" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="#F7F7F7" pb={10}>
            {view == `convener` ? <StudentDetails enquiry={enquiry} /> : <></>}
            <AssessmentDetails
              enquiry={enquiry}
              updatedNoDays={updatedNoDays}
              setUpdatedNoDays={setUpdatedNoDays}
              view={view}
            />
            <TabDetails enquiry={enquiry} view={view} />

            {/* Text area for notes to students */}
            <Text color="#333333" fontSize={`xl`} as="b">
              {view === `convener` ? `Notes to student` : `Notes to convener`}
            </Text>
            <Box
              my={3}
              borderColor="#bfbfbf"
              bgColor="white"
              boxShadow="xs"
              borderRadius={10}
            >
              <Textarea
                placeholder="Message goes here..."
                value={notesToUser}
                onChange={(e) => setNotesToUser(e.target.value)}
              />
            </Box>
          </ModalBody>
          <Box border="1px" borderColor="#bfbfbf"></Box>

          {/* Modal footer, contains action buttons */}
          <ModalFooter bg="#F7F7F7">
            <Spacer />
            {view === `convener` ? (
              <>
                <Button
                  variant="solid"
                  isLoading={Reject.isLoading}
                  isDisabled={Reject.isDisabled}
                  colorScheme="red"
                  mr={3}
                  onClick={() => onSubmit(`Rejected`)}
                >
                  Reject
                </Button>
                <Button
                  variant="outline"
                  isLoading={Accept.isLoading}
                  isDisabled={Accept.isDisabled}
                  colorScheme="green"
                  onClick={() => onSubmit(`Approved`)}
                >
                  Accept
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="solid"
                  isLoading={Delete.isLoading}
                  isDisabled={Delete.isDisabled}
                  colorScheme="red"
                  mr={3}
                  onClick={() => onSubmit(``)}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  isLoading={Update.isLoading}
                  isDisabled={Update.isDisabled}
                  colorScheme="green"
                  onClick={() => onSubmit(enquiry.status)}
                >
                  Update
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
