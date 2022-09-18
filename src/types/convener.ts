/* eslint-disable prettier/prettier */
import { MouseEvent } from 'react';

export interface studentData {
  studentNumber: number;
  assignment1: number;
  assignment2: number;
  assignment3: number;
  assignment4: number;
  assignment5: number;
  assignment6: number;
  test1: number;
  test2: number;
  final1016: number;
  assignmentAverage1016: number;
  testAverage1016: number;
}

export interface studentTutorAllocation {
  studentNumber: number;
  a1Tutor: string;
  a2Tutor: string;
  a3Tutor: string;
  a4Tutor: string;
  a5Tutor: string;
  a6Tutor: string;
}

export interface ITutorWithMarks {
  tutor?: string;
  marks?: number[];
}

export interface IAssignmentMarksWithTutors {
  a1: ITutorWithMarks[];
  a2: ITutorWithMarks[];
  a3: ITutorWithMarks[];
  a4: ITutorWithMarks[];
  a5: ITutorWithMarks[];
  a6: ITutorWithMarks[];
}

export interface DoughnutChartLayoutProps {
  chartTitle: string;
  chartOnClick: (event: MouseEvent<HTMLCanvasElement>) => void;
  chartRef: any;
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
      spacing: number;
      hoverOffset: number;
      weight: number;
    }[];
  };
}

export interface FileDropZoneProps {
  setStudents?: (students: studentData[]) => void;
  setStudentTutorAllocation?: (studentTutorAllocation: studentTutorAllocation[]) => void;
  dropType: 'student-analysis' | 'tutor-management'
}

export interface IchartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
    spacing: number;
    hoverOffset: number;
    weight: number;
  }[];
}

export interface chartCtx {
  chartLabel: string;
  chartRanking: string;
  rankingCount: number;
  rankings: any;
}

export interface Enquiry {
  assignmentNo: string;
  attatchmentLink: string;
  courseCode: string;
  createdAt: string;
  extensionDuration: string;
  id: string;
  status: string;
  testNo: string;
  title: string;
  type: string;
  updatedAt: string;
  userId: string;
  messageFromStudent: string;
  messageFromConvener: string;
  user: User;
}

export interface User {
  id: string;
  uctId: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  Enquiries: [] | null;
}
