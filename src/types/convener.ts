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
  setStudents: (students: studentData[]) => void;
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
