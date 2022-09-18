/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
import create from 'zustand';

import { studentData, studentTutorAllocation } from '@/types/convener';

interface StudentDataState {
  students: studentData[];
  setStudents: (data: studentData[]) => void;
  studentTutorAllocation: studentTutorAllocation[];
  setStudentTutorAllocation: (data: studentTutorAllocation[]) => void;
}

export const useStudentStore = create<StudentDataState>((set) => ({
  // initial state
  students: [],
  studentTutorAllocation: [],

  // methods for manipulating state
  setStudents: (students: studentData[]) => {
    set({
      students: students,
    });
  },
  setStudentTutorAllocation: (studentTutorAllocation: studentTutorAllocation[]) => {
    set({
      studentTutorAllocation: studentTutorAllocation,
    });
  }
}));
