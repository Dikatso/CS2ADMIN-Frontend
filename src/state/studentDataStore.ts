import create from 'zustand';

import { strugglingStudentData, studentData } from '@/types/convener';

interface StudentDataState {
  //
  students: studentData[];
  setStudents: (students: studentData[]) => void;
  strugglingStudents: strugglingStudentData[];
  setStrugglingStudents: (students: strugglingStudentData[]) => void;
}

export const useStudentStore = create<StudentDataState>((set) => ({
  // initial state
  students: [],
  strugglingStudents: [],
  // methods for manipulating state
  setStudents: (students: studentData[]) => {
    set({
      students: students,
    });
  },
  setStrugglingStudents: (students: strugglingStudentData[]) => {
    set({
      strugglingStudents: students,
    });
  },
}));
