import { IconArrowUpRight } from '@tabler/icons';
import { Text, Paper, Group, RingProgress, Center } from '@mantine/core';
import { IStatProps, ITutorWithMarks } from '@/types/global';

/**
 * UI Function component showing tutor statistics
 * @param {object} props Component props
 * @param {} placeholder
 * @param {ITutorWithMarks} props.currentTutorWithMarks tutors with marks based on selected assessment
 * @param {string} props.type type of statistic
 * @returns {JSX.Element} JSX Element
 */
export const Stat: React.FC<IStatProps> = ({
  currentTutorWithMarks,
  type,
}): JSX.Element => {
  let statScore = 0;
  let ringColor = `black`;

  if (currentTutorWithMarks != undefined) {
    switch (type) {
      case `max`:
        statScore = Math.max(...currentTutorWithMarks.marks);
        ringColor = `green`;
        break;
      case `min`:
        statScore = Math.min(...currentTutorWithMarks.marks);
        ringColor = `blue`;
        break;
      default:
        statScore =
          Math.round(
            (eval(currentTutorWithMarks.marks.join(`+`)) /
              currentTutorWithMarks.marks.length) *
              100,
          ) / 100;
        ringColor = `red`;
    }
  }

  return (
    <Paper withBorder radius="md" p="xs" key={type}>
      <Group p={5}>
        <RingProgress
          size={100}
          roundCaps
          thickness={10}
          sections={[{ value: statScore, color: ringColor }]}
          label={
            <Center>
              <IconArrowUpRight size={22} stroke={1.5} />
            </Center>
          }
        />

        <div>
          <Text color="dimmed" size="lg" transform="uppercase" weight={700}>
            {`${type.toUpperCase()} SCORE`}
          </Text>
          <Text weight={700} size="xl">
            {statScore}
          </Text>
        </div>
      </Group>
    </Paper>
  );
};
