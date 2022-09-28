import { FileDropZoneProps } from '@/types/global';
import {
  extractDataIntoArray2,
  extractStudentDataIntoArray,
  extractStudentTutorAllocationDataIntoArray,
} from '@/utils/convener/file';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useRouter } from 'next/router';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useRef, useState } from 'react';
import { Text, Group, Button } from '@mantine/core';
import { useToast, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { useStudentStore } from '@/state/studentDataStore';
import { LoadingOverlay } from '@/components/Shared/LoadingOverlay';
import { useStylesFileDropZone } from '@/styles/FileDropZone';

/**
 * UI Function component for handling file drops and inputs
 * @param {object} props Component props
 * @param {} placeholder
 * @param {string} props.dropType drop type action, be it for student analysis or tutor management
 * @returns {JSX.Element} JSX Element
 */
export const FileDropZone: React.FC<FileDropZoneProps> = ({
  dropType,
}): JSX.Element => {
  const { classes, theme } = useStylesFileDropZone();
  const openRef = useRef<() => void>(null);
  const { setStudents, setStrugglingStudents, setStudentTutorAllocation } =
    useStudentStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState(``);

  const router = useRouter();
  const toast = useToast();
  const boxColor = useColorModeValue(`#F1F6F9`, `#4A5568`);

  /**
   * Handles drop/input files, sets data into state store and routes to appropriate page
   * @param file - input files
   */
  const handleOnDrop = async (file: File[]) => {
    /** open loading modal overlay */
    onOpen();

    if (dropType == `student-analysis`) {
      setMessage(`Generating Student Analysis....`);

      /**
       * wait for extraction of data to complete & validate input file before  routing
       */
      setTimeout(() => {
        if (file[0]?.name !== `CS2withCS1.csv`) {
          /** close loading modal overlay */
          onClose();

          /** error with appropriate message */
          toast({
            description: `incorrect input, CS2withCS1.csv are required`,
            status: `info`,
            duration: 5000,
            isClosable: true,
          });
        } else {
          router.push(`/convener/analysis/results`);
        }
      }, 2000);

      const students = await extractStudentDataIntoArray(file, `sa`);
      setStudents(students);

      const strugglingStudents = await extractDataIntoArray2(file);
      setStrugglingStudents(strugglingStudents);
    } else if (dropType == `tutor-management`) {
      setMessage(`Generating Tutor Statistics....`);

      let listOfTutorsFile = null;
      let StudentMarksFile = null;

      /**
       * wait for extraction of data to complete & validate input file before routing
       */
      setTimeout(() => {
        if (
          listOfTutorsFile?.name !== `CS2withMarkers.csv` ||
          StudentMarksFile?.name !== `CS2withCS1.csv`
        ) {
          /** close loading modal overlay */
          onClose();

          /** error with appropriate message */
          toast({
            description: `incorrect input, CS2withCS1.csv & CS2withMarkers.csv are required`,
            status: `info`,
            duration: 5000,
            isClosable: true,
          });
        } else {
          router.push(`/convener/management/results`);
        }
      }, 2000);

      if (file.length === 2) {
        if (file[0].name == `CS2withMarkers.csv`) {
          listOfTutorsFile = file[0];
          StudentMarksFile = file[1];
        } else {
          listOfTutorsFile = file[1];
          StudentMarksFile = file[0];
        }

        const students = await extractStudentDataIntoArray(
          StudentMarksFile,
          `tm`,
        );
        setStudents(students);

        const studentTutorAllocation =
          await extractStudentTutorAllocationDataIntoArray(listOfTutorsFile);
        setStudentTutorAllocation(studentTutorAllocation);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <LoadingOverlay
        loadingMessage={message}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Dropzone
        name = "dropFile"
        openRef={openRef}
        onDrop={handleOnDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.csv]}
        maxSize={30 * 1024 ** 2}
        style={{ backgroundColor: boxColor }}
      >
        <div style={{ pointerEvents: `none` }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={50}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={50}
                color={
                  theme.colorScheme === `dark`
                    ? theme.colors.dark[0]
                    : theme.black
                }
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>
              {dropType == `tutor-management`
                ? `Upload Student Marks & Tutor marking allocation`
                : `Upload Student Marks`}
            </Dropzone.Idle>
          </Text>
          <Text align="center" size="md" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop files here to upload.
          </Text>
          <Text align="center" size="md" mt="xs" color="dimmed">
            We can accept only <i>.pdf</i> files that are less than 30mb in
            size.
          </Text>
        </div>
      </Dropzone>

      <Button
        style={{ backgroundColor: `#319795` }}
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
    </div>
  );
};
