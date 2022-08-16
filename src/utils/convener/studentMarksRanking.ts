import { studentData } from '@/types/convener';

export const test1Ranking = (students: studentData[]) => {
  const test1CriticalStudents = students.filter(
    (student) => (student.test1 / 35) * 100 <= 45,
  );
  const test1AdequateStudents = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 45 && (student.test1 / 35) * 100 <= 55,
  );
  const test1ModerateStudents = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 55 && (student.test1 / 35) * 100 <= 65,
  );
  const test1NeritoriousStudents = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 65 && (student.test1 / 35) * 100 <= 80,
  );
  const test1OutstandingStudents = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 80 && (student.test1 / 35) * 100 <= 100,
  );

  return {
    test1CriticalStudents,
    test1AdequateStudents,
    test1ModerateStudents,
    test1NeritoriousStudents,
    test1OutstandingStudents,
    test1Count: [
      test1CriticalStudents.length,
      test1AdequateStudents.length,
      test1ModerateStudents.length,
      test1NeritoriousStudents.length,
      test1OutstandingStudents.length,
    ],
  };
};

export const test2Ranking = (students: studentData[]) => {
  const test2CriticalStudents = students.filter(
    (student) => (student.test2 / 35) * 100 <= 45,
  );
  const test2AdequateStudents = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 45 && (student.test2 / 35) * 100 <= 55,
  );
  const test2ModerateStudents = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 55 && (student.test2 / 35) * 100 <= 65,
  );
  const test2NeritoriousStudents = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 65 && (student.test2 / 35) * 100 <= 80,
  );
  const test2OutstandingStudents = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 80 && (student.test2 / 35) * 100 <= 100,
  );

  return {
    test2CriticalStudents,
    test2AdequateStudents,
    test2ModerateStudents,
    test2NeritoriousStudents,
    test2OutstandingStudents,
    test2Count: [
      test2CriticalStudents.length,
      test2AdequateStudents.length,
      test2ModerateStudents.length,
      test2NeritoriousStudents.length,
      test2OutstandingStudents.length,
    ],
  };
};

export const assignment1Ranking = (students: studentData[]) => {
  const assignment1CriticalStudents = students.filter(
    (student) => student.assignment1 <= 45,
  );
  const assignment1AdequateStudents = students.filter(
    (student) => student.assignment1 > 45 && student.assignment1 <= 55,
  );
  const assignment1ModerateStudents = students.filter(
    (student) => student.assignment1 > 55 && student.assignment1 <= 65,
  );
  const assignment1NeritoriousStudents = students.filter(
    (student) => student.assignment1 > 65 && student.assignment1 <= 80,
  );
  const assignment1OutstandingStudents = students.filter(
    (student) => student.assignment1 > 80 && student.assignment1 <= 100,
  );

  return {
    assignment1CriticalStudents,
    assignment1AdequateStudents,
    assignment1ModerateStudents,
    assignment1NeritoriousStudents,
    assignment1OutstandingStudents,
    assignment1Count: [
      assignment1CriticalStudents.length,
      assignment1AdequateStudents.length,
      assignment1ModerateStudents.length,
      assignment1NeritoriousStudents.length,
      assignment1OutstandingStudents.length,
    ],
  };
};

export const assignment2Ranking = (students: studentData[]) => {
  const assignment2CriticalStudents = students.filter(
    (student) => student.assignment2 <= 45,
  );
  const assignment2AdequateStudents = students.filter(
    (student) => student.assignment2 > 45 && student.assignment2 <= 55,
  );
  const assignment2ModerateStudents = students.filter(
    (student) => student.assignment2 > 55 && student.assignment2 <= 65,
  );
  const assignment2NeritoriousStudents = students.filter(
    (student) => student.assignment2 > 65 && student.assignment2 <= 80,
  );
  const assignment2OutstandingStudents = students.filter(
    (student) => student.assignment2 > 80 && student.assignment2 <= 100,
  );

  return {
    assignment2CriticalStudents,
    assignment2AdequateStudents,
    assignment2ModerateStudents,
    assignment2NeritoriousStudents,
    assignment2OutstandingStudents,
    assignment2Count: [
      assignment2CriticalStudents.length,
      assignment2AdequateStudents.length,
      assignment2ModerateStudents.length,
      assignment2NeritoriousStudents.length,
      assignment2OutstandingStudents.length,
    ],
  };
};

export const assignment3Ranking = (students: studentData[]) => {
  const assignment3CriticalStudents = students.filter(
    (student) => student.assignment3 <= 45,
  );
  const assignment3AdequateStudents = students.filter(
    (student) => student.assignment3 > 45 && student.assignment3 <= 55,
  );
  const assignment3ModerateStudents = students.filter(
    (student) => student.assignment3 > 55 && student.assignment3 <= 65,
  );
  const assignment3NeritoriousStudents = students.filter(
    (student) => student.assignment3 > 65 && student.assignment3 <= 80,
  );
  const assignment3OutstandingStudents = students.filter(
    (student) => student.assignment3 > 80 && student.assignment3 <= 100,
  );

  return {
    assignment3CriticalStudents,
    assignment3AdequateStudents,
    assignment3ModerateStudents,
    assignment3NeritoriousStudents,
    assignment3OutstandingStudents,
    assignment3Count: [
      assignment3CriticalStudents.length,
      assignment3AdequateStudents.length,
      assignment3ModerateStudents.length,
      assignment3NeritoriousStudents.length,
      assignment3OutstandingStudents.length,
    ],
  };
};

export const assignment4Ranking = (students: studentData[]) => {
  const assignment4CriticalStudents = students.filter(
    (student) => student.assignment4 <= 45,
  );
  const assignment4AdequateStudents = students.filter(
    (student) => student.assignment4 > 45 && student.assignment4 <= 55,
  );
  const assignment4ModerateStudents = students.filter(
    (student) => student.assignment4 > 55 && student.assignment4 <= 65,
  );
  const assignment4NeritoriousStudents = students.filter(
    (student) => student.assignment4 > 65 && student.assignment4 <= 80,
  );
  const assignment4OutstandingStudents = students.filter(
    (student) => student.assignment4 > 80 && student.assignment4 <= 100,
  );

  return {
    assignment4CriticalStudents,
    assignment4AdequateStudents,
    assignment4ModerateStudents,
    assignment4NeritoriousStudents,
    assignment4OutstandingStudents,
    assignment4Count: [
      assignment4CriticalStudents.length,
      assignment4AdequateStudents.length,
      assignment4ModerateStudents.length,
      assignment4NeritoriousStudents.length,
      assignment4OutstandingStudents.length,
    ],
  };
};

export const assignment5Ranking = (students: studentData[]) => {
  const assignment5CriticalStudents = students.filter(
    (student) => student.assignment5 <= 45,
  );
  const assignment5AdequateStudents = students.filter(
    (student) => student.assignment5 > 45 && student.assignment5 <= 55,
  );
  const assignment5ModerateStudents = students.filter(
    (student) => student.assignment5 > 55 && student.assignment5 <= 65,
  );
  const assignment5NeritoriousStudents = students.filter(
    (student) => student.assignment5 > 65 && student.assignment5 <= 80,
  );
  const assignment5OutstandingStudents = students.filter(
    (student) => student.assignment5 > 80 && student.assignment5 <= 100,
  );

  return {
    assignment5CriticalStudents,
    assignment5AdequateStudents,
    assignment5ModerateStudents,
    assignment5NeritoriousStudents,
    assignment5OutstandingStudents,
    assignment5Count: [
      assignment5CriticalStudents.length,
      assignment5AdequateStudents.length,
      assignment5ModerateStudents.length,
      assignment5NeritoriousStudents.length,
      assignment5OutstandingStudents.length,
    ],
  };
};

export const assignment6Ranking = (students: studentData[]) => {
  const assignment6CriticalStudents = students.filter(
    (student) => student.assignment6 <= 45,
  );
  const assignment6AdequateStudents = students.filter(
    (student) => student.assignment6 > 45 && student.assignment6 <= 55,
  );
  const assignment6ModerateStudents = students.filter(
    (student) => student.assignment6 > 55 && student.assignment6 <= 65,
  );
  const assignment6NeritoriousStudents = students.filter(
    (student) => student.assignment6 > 65 && student.assignment6 <= 80,
  );
  const assignment6OutstandingStudents = students.filter(
    (student) => student.assignment6 > 80 && student.assignment6 <= 100,
  );

  return {
    assignment6CriticalStudents,
    assignment6AdequateStudents,
    assignment6ModerateStudents,
    assignment6NeritoriousStudents,
    assignment6OutstandingStudents,
    assignment6Count: [
      assignment6CriticalStudents.length,
      assignment6AdequateStudents.length,
      assignment6ModerateStudents.length,
      assignment6NeritoriousStudents.length,
      assignment6OutstandingStudents.length,
    ],
  };
};

export const final1016Ranking = (students: studentData[]) => {
  const final1016CriticalStudents = students.filter(
    (student) => student.final1016 <= 45,
  );
  const final1016AdequateStudents = students.filter(
    (student) => student.final1016 > 45 && student.final1016 <= 55,
  );
  const final1016ModerateStudents = students.filter(
    (student) => student.final1016 > 55 && student.final1016 <= 65,
  );
  const final1016NeritoriousStudents = students.filter(
    (student) => student.final1016 > 65 && student.final1016 <= 80,
  );
  const final1016OutstandingStudents = students.filter(
    (student) => student.final1016 > 80 && student.final1016 <= 100,
  );

  return {
    final1016CriticalStudents,
    final1016AdequateStudents,
    final1016ModerateStudents,
    final1016NeritoriousStudents,
    final1016OutstandingStudents,
    final1016Count: [
      final1016CriticalStudents.length,
      final1016AdequateStudents.length,
      final1016ModerateStudents.length,
      final1016NeritoriousStudents.length,
      final1016OutstandingStudents.length,
    ],
  };
};

export const assignmentAverage1016Ranking = (students: studentData[]) => {
  const assignmentAverage1016CriticalStudents = students.filter(
    (student) => student.assignmentAverage1016 <= 45,
  );
  const assignmentAverage1016AdequateStudents = students.filter(
    (student) =>
      student.assignmentAverage1016 > 45 && student.assignmentAverage1016 <= 55,
  );
  const assignmentAverage1016ModerateStudents = students.filter(
    (student) =>
      student.assignmentAverage1016 > 55 && student.assignmentAverage1016 <= 65,
  );
  const assignmentAverage1016NeritoriousStudents = students.filter(
    (student) =>
      student.assignmentAverage1016 > 65 && student.assignmentAverage1016 <= 80,
  );
  const assignmentAverage1016OutstandingStudents = students.filter(
    (student) =>
      student.assignmentAverage1016 > 80 &&
      student.assignmentAverage1016 <= 100,
  );

  return {
    assignmentAverage1016CriticalStudents,
    assignmentAverage1016AdequateStudents,
    assignmentAverage1016ModerateStudents,
    assignmentAverage1016NeritoriousStudents,
    assignmentAverage1016OutstandingStudents,
    assignmentAverage1016Count: [
      assignmentAverage1016CriticalStudents.length,
      assignmentAverage1016AdequateStudents.length,
      assignmentAverage1016ModerateStudents.length,
      assignmentAverage1016NeritoriousStudents.length,
      assignmentAverage1016OutstandingStudents.length,
    ],
  };
};

export const testAverage1016Ranking = (students: studentData[]) => {
  const testAverage1016CriticalStudents = students.filter(
    (student) => student.testAverage1016 <= 45,
  );
  const testAverage1016AdequateStudents = students.filter(
    (student) => student.testAverage1016 > 45 && student.testAverage1016 <= 55,
  );
  const testAverage1016ModerateStudents = students.filter(
    (student) => student.testAverage1016 > 55 && student.testAverage1016 <= 65,
  );
  const testAverage1016NeritoriousStudents = students.filter(
    (student) => student.testAverage1016 > 65 && student.testAverage1016 <= 80,
  );
  const testAverage1016OutstandingStudents = students.filter(
    (student) => student.testAverage1016 > 80 && student.testAverage1016 <= 100,
  );

  return {
    testAverage1016CriticalStudents,
    testAverage1016AdequateStudents,
    testAverage1016ModerateStudents,
    testAverage1016NeritoriousStudents,
    testAverage1016OutstandingStudents,
    testAverage1016Count: [
      testAverage1016CriticalStudents.length,
      testAverage1016AdequateStudents.length,
      testAverage1016ModerateStudents.length,
      testAverage1016NeritoriousStudents.length,
      testAverage1016OutstandingStudents.length,
    ],
  };
};
