import {
  studentData,
  studentTutorAllocation,
  ITutorWithMarks,
} from '@/types/global';

/**
 * Merges the arr that contains student marks and arr that
 * contains the assignment tutor allocation based on a matching key/id
 * @param key - identifier used for matching
 * @param arr1 - studentData[]
 * @param arr2 - studentTutorAllocation[]
 * @returns merged studentData & studentTutorAllocation
 */
const mergeArrays = (
  key: string,
  arr1: studentData[] = [],
  arr2: studentTutorAllocation[] = [],
) => {
  let res = [];
  res = arr1.map((obj) => {
    const index = arr2.findIndex((el) => el[key] == obj[key]);
    const rest = index !== -1 ? arr2[index] : {}; // retreives the rest of the object attributes in arr2
    return {
      ...obj,
      ...rest,
    };
  });
  return res;
};

/**
 * Retreives all tutors who marked a particular assignment
 * @param assignment - 'a1, a2, a3...'
 * @returns list of tutors/markers
 */
const getTutorsFromAssignment = async (
  assignment: string,
  studentTutorAllocation: studentTutorAllocation[],
): Promise<string[]> => {
  let tutors = [];
  for (let index = 0; index < studentTutorAllocation.length; index++) {
    const marker = studentTutorAllocation[index][`${assignment}Tutor`];
    tutors.push(marker);
  }
  tutors = [...new Set(tutors)];
  return tutors;
};

/**
 * Computes the marks for each tutor for a given assignment
 * @param assignment - 'a1, a2, a3...'
 * @param students - student data
 * @param studentTutorAllocation - allocation of tutors to studets
 * @returns list containing tutors with their marks
 */
export const tutorsWithMarks = async (
  assignment: string,
  students: studentData[],
  studentTutorAllocation: studentTutorAllocation[],
): Promise<ITutorWithMarks[]> => {
  const mergedArrays = mergeArrays(
    `studentNumber`,
    students,
    studentTutorAllocation,
  );

  const markers = await getTutorsFromAssignment(
    assignment,
    studentTutorAllocation,
  );

  return markers.map((tutor) => {
    const obj: ITutorWithMarks = {};
    obj[`tutor`] = tutor;

    const marks = [];
    for (let i = 0; i < mergedArrays.length; i++) {
      if (mergedArrays[i][`${assignment}Tutor`] == tutor) {
        const assignmentNumber = assignment.split(``)[1];
        const assignmentMark = mergedArrays[i][`assignment${assignmentNumber}`];
        marks.push(Number(assignmentMark));
      }
    }
    obj[`marks`] = marks;
    return obj;
  });
};
