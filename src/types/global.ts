import { Dispatch, MouseEvent, SetStateAction } from 'react';

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

export type userData = signInUserResponse;

export interface signInUserDto {
  email: string;
  password: string;
}

export interface signInUserResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    uctId: string;
    name: string;
  };
}

export interface Links {
  tag: string;
  label: string;
  variant: string;
}

export interface LandingPageHeaderProps {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
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

export interface strugglingStudentData {
  studentNumber: number;
  assignment1: number;
  assignment2: number;
  test1: number;
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

export interface AssessmentDetailsProps {
  enquiry: Enquiry;
  updatedNoDays: string;
  view: 'student' | 'convener';
  setUpdatedNoDays: React.Dispatch<React.SetStateAction<string>>;
}

export interface FileDropZoneProps {
  dropType: 'student-analysis' | 'tutor-management';
}

export interface StudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentChartCtx: chartCtx;
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
