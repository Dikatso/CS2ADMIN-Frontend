import { useRef } from 'react';
import { Chart as ChartJS } from 'chart.js';

/**
 * Creates a react ref for each chart
 * @returns all assessments chart refs
 */
export const useChartRefs = () => {
  const test1ChartRef = useRef<ChartJS>(null);
  const test2ChartRef = useRef<ChartJS>(null);
  const assignment1ChartRef = useRef<ChartJS>(null);
  const assignment2ChartRef = useRef<ChartJS>(null);
  const assignment3ChartRef = useRef<ChartJS>(null);
  const assignment4ChartRef = useRef<ChartJS>(null);
  const assignment5ChartRef = useRef<ChartJS>(null);
  const assignment6ChartRef = useRef<ChartJS>(null);
  const final1016ChartRef = useRef<ChartJS>(null);
  const assignmentAverage1016ChartRef = useRef<ChartJS>(null);
  const testAverage1016ChartRef = useRef<ChartJS>(null);

  return {
    test1ChartRef,
    test2ChartRef,
    assignment1ChartRef,
    assignment2ChartRef,
    assignment3ChartRef,
    assignment4ChartRef,
    assignment5ChartRef,
    assignment6ChartRef,
    final1016ChartRef,
    assignmentAverage1016ChartRef,
    testAverage1016ChartRef,
  };
};
