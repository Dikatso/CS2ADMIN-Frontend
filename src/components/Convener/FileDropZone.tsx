import { FileDropZoneProps } from '@/types/convener';
import {
  extractDataIntoArray,
  extractDataIntoArray2,
} from '@/utils/convener/file';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useRouter } from 'next/router';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons';
import { useRef } from 'react';
import { Text, Group, Button, createStyles } from '@mantine/core';

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
  setStrugglingStudent,
}) => {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={async (file) => {
          const students = await extractDataIntoArray(file);
          const strugglingStudents = await extractDataIntoArray2(file);
          setStudents(students);
          setStrugglingStudent(students);
          router.push(`/convener/analysis/results`);
        }}
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
            <Dropzone.Idle>Upload Student Marks</Dropzone.Idle>
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
