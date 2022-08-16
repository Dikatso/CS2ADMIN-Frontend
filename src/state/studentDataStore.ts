import create from 'zustand';

import { studentData } from '@/types/convener';

interface StudentDataState {
  students: studentData[];
  setStudents: (students: studentData[]) => void;
}

export const useStudentStore = create<StudentDataState>((set) => ({
  // initial state
  students: [],
  // methods for manipulating state
  setStudents: (students: studentData[]) => {
    set({
      students: students,
    });
  },
}));
