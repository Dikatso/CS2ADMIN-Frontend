import { studentData } from '@/types/global';

export const test1Ranking = (students: studentData[]) => {
  const Critical = students.filter(
    (student) => (student.test1 / 35) * 100 <= 45,
  );
  const Adequate = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 45 && (student.test1 / 35) * 100 <= 55,
  );
  const Moderate = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 55 && (student.test1 / 35) * 100 <= 65,
  );
  const Neritorious = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 65 && (student.test1 / 35) * 100 <= 80,
  );
  const Outstanding = students.filter(
    (student) =>
      (student.test1 / 35) * 100 > 80 && (student.test1 / 35) * 100 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const test2Ranking = (students: studentData[]) => {
  const Critical = students.filter(
    (student) => (student.test2 / 35) * 100 <= 45,
  );
  const Adequate = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 45 && (student.test2 / 35) * 100 <= 55,
  );
  const Moderate = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 55 && (student.test2 / 35) * 100 <= 65,
  );
  const Neritorious = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 65 && (student.test2 / 35) * 100 <= 80,
  );
  const Outstanding = students.filter(
    (student) =>
      (student.test2 / 35) * 100 > 80 && (student.test2 / 35) * 100 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const assignment1Ranking = (students: studentData[]) => {
  const Critical = students.filter((student) => student.assignment1 <= 45);
  const Adequate = students.filter(
    (student) => student.assignment1 > 45 && student.assignment1 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.assignment1 > 55 && student.assignment1 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.assignment1 > 65 && student.assignment1 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.assignment1 > 80 && student.assignment1 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const assignment2Ranking = (students: studentData[]) => {
  const Critical = students.filter((student) => student.assignment2 <= 45);
  const Adequate = students.filter(
    (student) => student.assignment2 > 45 && student.assignment2 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.assignment2 > 55 && student.assignment2 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.assignment2 > 65 && student.assignment2 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.assignment2 > 80 && student.assignment2 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const assignment3Ranking = (students: studentData[]) => {
  const Critical = students.filter((student) => student.assignment3 <= 45);
  const Adequate = students.filter(
    (student) => student.assignment3 > 45 && student.assignment3 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.assignment3 > 55 && student.assignment3 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.assignment3 > 65 && student.assignment3 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.assignment3 > 80 && student.assignment3 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const assignment4Ranking = (students: studentData[]) => {
  const Critical = students.filter((student) => student.assignment4 <= 45);
  const Adequate = students.filter(
    (student) => student.assignment4 > 45 && student.assignment4 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.assignment4 > 55 && student.assignment4 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.assignment4 > 65 && student.assignment4 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.assignment4 > 80 && student.assignment4 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const assignment5Ranking = (students: studentData[]) => {
  const Critical = students.filter((student) => student.assignment5 <= 45);
  const Adequate = students.filter(
    (student) => student.assignment5 > 45 && student.assignment5 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.assignment5 > 55 && student.assignment5 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.assignment5 > 65 && student.assignment5 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.assignment5 > 80 && student.assignment5 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const assignment6Ranking = (students: studentData[]) => {
  const Critical = students.filter((student) => student.assignment6 <= 45);
  const Adequate = students.filter(
    (student) => student.assignment6 > 45 && student.assignment6 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.assignment6 > 55 && student.assignment6 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.assignment6 > 65 && student.assignment6 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.assignment6 > 80 && student.assignment6 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const final1016Ranking = (students: studentData[]) => {
  const Critical = students.filter((student) => student.final1016 <= 45);
  const Adequate = students.filter(
    (student) => student.final1016 > 45 && student.final1016 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.final1016 > 55 && student.final1016 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.final1016 > 65 && student.final1016 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.final1016 > 80 && student.final1016 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const assignmentAverage1016Ranking = (students: studentData[]) => {
  const Critical = students.filter(
    (student) => student.assignmentAverage1016 <= 45,
  );
  const Adequate = students.filter(
    (student) =>
      student.assignmentAverage1016 > 45 && student.assignmentAverage1016 <= 55,
  );
  const Moderate = students.filter(
    (student) =>
      student.assignmentAverage1016 > 55 && student.assignmentAverage1016 <= 65,
  );
  const Neritorious = students.filter(
    (student) =>
      student.assignmentAverage1016 > 65 && student.assignmentAverage1016 <= 80,
  );
  const Outstanding = students.filter(
    (student) =>
      student.assignmentAverage1016 > 80 &&
      student.assignmentAverage1016 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};

export const testAverage1016Ranking = (students: studentData[]) => {
  // console.log(students);
  const Critical = students.filter((student) => student.testAverage1016 <= 45);
  const Adequate = students.filter(
    (student) => student.testAverage1016 > 45 && student.testAverage1016 <= 55,
  );
  const Moderate = students.filter(
    (student) => student.testAverage1016 > 55 && student.testAverage1016 <= 65,
  );
  const Neritorious = students.filter(
    (student) => student.testAverage1016 > 65 && student.testAverage1016 <= 80,
  );
  const Outstanding = students.filter(
    (student) => student.testAverage1016 > 80 && student.testAverage1016 <= 100,
  );

  return {
    Critical,
    Adequate,
    Moderate,
    Neritorious,
    Outstanding,
    Count: [
      Critical.length,
      Adequate.length,
      Moderate.length,
      Neritorious.length,
      Outstanding.length,
    ],
  };
};
