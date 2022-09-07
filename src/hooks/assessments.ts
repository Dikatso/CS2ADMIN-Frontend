import { useStudentStore } from '@/state/studentDataStore';
import {
  test1Ranking,
  test2Ranking,
  assignment1Ranking,
  assignment2Ranking,
  assignment3Ranking,
  assignment4Ranking,
  assignment5Ranking,
  assignment6Ranking,
  final1016Ranking,
  assignmentAverage1016Ranking,
  testAverage1016Ranking,
} from '../utils/convener/studentMarksRanking';

/**
 * Creates student rankings from students in zustand state
 * @returns all assessment rankings
 */
export const useAssessments = () => {
  const { students } = useStudentStore();

  const test1 = test1Ranking(students);
  const test2 = test2Ranking(students);
  const assignment1 = assignment1Ranking(students);
  const assignment2 = assignment2Ranking(students);
  const assignment3 = assignment3Ranking(students);
  const assignment4 = assignment4Ranking(students);
  const assignment5 = assignment5Ranking(students);
  const assignment6 = assignment6Ranking(students);
  const final1016 = final1016Ranking(students);
  const assignmentAverage1016 = assignmentAverage1016Ranking(students);
  const testAverage1016 = testAverage1016Ranking(students);

  return {
    test1,
    test2,
    assignment1,
    assignment2,
    assignment3,
    assignment4,
    assignment5,
    assignment6,
    final1016,
    assignmentAverage1016,
    testAverage1016,
  };
};
