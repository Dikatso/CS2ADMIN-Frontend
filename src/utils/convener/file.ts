import { studentData } from '@/types/convener';

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

export const extractDataIntoArray = (file: File[]): Array<studentData> => {
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
        studentNumber: line.studentNumber,
        assignment1: line.A1,
        assignment2: line.A2,
        assignment3: line.A3,
        assignment4: line.A4,
        assignment5: line.A5,
        assignment6: line.A6,
        test1: line.T1,
        test2: line.T2,
        final1016: line.asgAvg1016,
        asignmentAverage1016: line.final1016,
        testAverage1016: line.testAvg1016,
      };
      students.push(student);
      i++;
    }
  };
  reader.readAsText(file[0]);

  return students;
};
