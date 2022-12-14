import {
  strugglingStudentData,
  studentData,
  studentTutorAllocation,
} from '@/types/global';

/**
 * Converts a csv file into an array
 * @param str
 * @param delimiter
 * @returns - array of data
 */
export const csvToArray = (str, delimiter = `,`) => {
  const headers = str.slice(0, str.indexOf(`\n`)).split(delimiter);

  const rows = str.slice(str.indexOf(`\n`) + 1).split(`\n`);

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
};

export const extractDataIntoArray2 = async (
  file: File[],
): Promise<strugglingStudentData[]> => {
  const reader = new FileReader();
  const strugglingStudent: Array<strugglingStudentData> = [];

  reader.onabort = () => console.log(`file reading was aborted`);
  reader.onerror = () => console.log(`file reading has failed`);
  reader.onload = () => {
    const content = reader.result;
    const data = csvToArray(content);

    let i = 0;
    const len = data.length - 1;
    while (i < len) {
      const line = JSON.parse(JSON.stringify(data[i]));
      const student: strugglingStudentData = {
        studentNumber: line.StudentNumber,
        assignment1: line.A1,
        assignment2: line.A2,
        test1: line.T1,
      };

      if (isNaN(student.assignment1)) {
        student.assignment1 = 0;
      }

      if (isNaN(student.assignment2)) {
        student.assignment2 = 0;
      }

      if (isNaN(student.test1)) {
        student.test1 = 0;
      }

      if (
        student.assignment1 <= 30 &&
        student.assignment2 <= 30 &&
        student.test1 <= 40
      ) {
        strugglingStudent.push(student);
      }

      i++;
    }
  };
  reader.readAsText(file[0]);
  console.log(`Students Array`, strugglingStudent);
  return strugglingStudent;
};

/**
 * Function to transform raw csv data into formatted student data,
 * Checks to see if method is used to extract data in the student analysis or tutor management panel
 * @param file - containing student data
 * @returns generalised sorted array of student data
 */
export const extractStudentDataIntoArray = async (
  file: File[] | File,
  view: 'sa' | 'tm',
): Promise<studentData[]> => {
  const reader = new FileReader();
  const students: Array<studentData> = [];

  reader.onabort = () => console.log(`file reading was aborted`);
  reader.onerror = () => console.log(`file reading has failed`);
  reader.onload = () => {
    const content = reader.result;
    const data = csvToArray(content);

    let i = 0;
    const len = data.length - 1;
    while (i < len) {
      const line = JSON.parse(JSON.stringify(data[i]));
      const student: studentData = {
        studentNumber: line.StudentNumber,
        assignment1: line.A1,
        assignment2: line.A2,
        assignment3: line.A3,
        assignment4: line.A4,
        assignment5: line.A5,
        assignment6: line.A6,
        test1: line.T1,
        test2: line.T2,
        final1016: line.final1016,
        assignmentAverage1016: line.asgAvg1016,
        testAverage1016: line.testAvg1016,
      };
      students.push(student);
      i++;
    }
  };
  reader.readAsText(view === `sa` ? file[0] : file);

  return students;
};

/**
 * Function to transform raw csv data into formatted student tutor allocation data
 * @param file - containing student tutor assignment allocation
 * @returns generalised sorted array of student tutor allocation
 */
export const extractStudentTutorAllocationDataIntoArray = async (
  file: File,
): Promise<studentTutorAllocation[]> => {
  const reader = new FileReader();
  const studentTutorAllocation: Array<studentTutorAllocation> = [];

  reader.onabort = () => console.log(`file reading was aborted`);
  reader.onerror = () => console.log(`file reading has failed`);
  reader.onload = () => {
    const content = reader.result;
    const data = csvToArray(content);

    let i = 0;
    const len = data.length - 1;
    while (i < len) {
      const line = JSON.parse(JSON.stringify(data[i]));
      const studentTutor: studentTutorAllocation = {
        studentNumber: line.StudentNumber,
        a1Tutor: line.A1_MARKER,
        a2Tutor: line.A2_MARKER,
        a3Tutor: line.A3_MARKER,
        a4Tutor: line.A4_MARKER,
        a5Tutor: line.A5_MARKER,
        a6Tutor: line.A6_MARKER,
      };
      studentTutorAllocation.push(studentTutor);
      i++;
    }
  };
  reader.readAsText(file);

  return studentTutorAllocation;
};

/**
 * Transforms javascript objects into csv rows
 * @param data
 * @returns csv row string
 */
const objectToCsv = function (data) {
  const csvRows = [];
  const headers = Object.keys(data[0]);

  csvRows.push(headers.join(`,`));

  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      return `${val}`;
    });

    csvRows.push(values.join(`,`));
  }

  return csvRows.join(`\n`);
};

/**
 * Downloads student data into a csv file
 * @param studentData
 * @param assessmentType - assessment name .i.e Assignment 1, Test 2
 * @param ranking - chart category .i.e Outstanding, Critical, Moderate...
 */
export const exportToCsv = (
  studentData: studentData[],
  assessmentType: string,
  ranking: string,
) => {
  const students = studentData.map((student) => {
    return {
      'Student Number': student.studentNumber,
      [`${assessmentType} Grade`]: student[assessmentType],
    };
  });

  const csvData = objectToCsv(students);

  const CsvString = `data:application/csv,` + encodeURIComponent(csvData);
  const x = document.createElement(`A`);
  x.setAttribute(`href`, CsvString);
  x.setAttribute(`download`, `${ranking}-${assessmentType}.csv`);
  document.body.appendChild(x);
  x.click();
};

export const exportToCsv2 = (
  studentData: strugglingStudentData[],
  // assessmentType: string,
  // ranking: string,
) => {
  const students = studentData.map((student) => {
    return {
      'Student Number': student.studentNumber,
      'Assignment 1': student.assignment1,
      'Assignment 2': student.assignment2,
      'Test 1': student.test1,
    };
  });

  const csvData = objectToCsv(students);

  const CsvString = `data:application/csv,` + encodeURIComponent(csvData);
  const x = document.createElement(`A`);
  x.setAttribute(`href`, CsvString);
  x.setAttribute(`download`, `strugglingstudents.csv`);
  document.body.appendChild(x);
  x.click();
};
