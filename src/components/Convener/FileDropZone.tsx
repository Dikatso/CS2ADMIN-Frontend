import { FileDropZoneProps } from '@/types/convener';
import {
  extractStudentDataIntoArray,
  extractStudentTutorAllocationDataIntoArray,
} from '@/utils/convener/file';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useRouter } from 'next/router';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useRef } from 'react';
import { Text, Group, Button, createStyles } from '@mantine/core';
import { useToast } from '@chakra-ui/react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: `relative`,
    marginBottom: 30,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color:
      theme.colorScheme === `dark`
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: `absolute`,
    width: 250,
    left: `calc(50% - 125px)`,
    bottom: -20,
  },
}));

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  setStudents,
  dropType,
  setStudentTutorAllocation,
}) => {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const router = useRouter();
  const toast = useToast();

  const handleOnDrop = async (file: File[]) => {
    if (dropType == `student-analysis`) {
      const students = await extractStudentDataIntoArray(file, `sa`);
      setStudents(students);
      router.push(`/convener/analysis/results`);
    } else if (dropType == `tutor-management`) {
      let listOfTutorsFile = null;
      let StudentMarksFile = null;

      if (file.length !== 2) {
        toast({
          description: `2 files are required!`,
          status: `info`,
          duration: 2000,
          isClosable: true,
        });
      } else {
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

        router.push(`/convener/management/results`);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={handleOnDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.csv]}
        maxSize={30 * 1024 ** 2}
        style={{ backgroundColor: `#f1f6f9` }}
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
