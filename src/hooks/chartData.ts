import { IchartData } from '@/types/convener';
import { useAssessments } from './assessments';

/**
 * SKeleton config for chart data
 * @param dataValues
 * @param label
 * @returns chart data
 */
export const chartDataConfig = (
  dataValues: number[],
  label: string,
): IchartData => {
  const data = {
    labels: [`Critical`, `Adequate`, `Moderate`, `Neritorious`, `Outstanding`],
    datasets: [
      {
        label: label,
        data: dataValues,
        backgroundColor: [
          `rgb(255, 99, 132)`,
          `rgb(54, 162, 235)`,
          `rgb(255, 205, 86)`,
          `rgba(75, 192, 192, 0.2)`,
          `rgba(153, 102, 255, 0.2)`,
        ],
        borderColor: [
          `rgba(255, 99, 132, 1)`,
          `rgba(54, 162, 235, 1)`,
          `rgba(255, 206, 86, 1)`,
          `rgba(75, 192, 192, 1)`,
          `rgba(153, 102, 255, 1)`,
        ],
        borderWidth: 1,
        spacing: 3,
        hoverOffset: 5,
        weight: 10,
      },
    ],
  };
  return data;
};

/**
 * Creates chart configs for each assessments
 * @returns all assessments chart configs
 */
export const useChartData = () => {
  const assessments = useAssessments();

  const test1ChartData = chartDataConfig(assessments.test1.Count, `test1`);
  const test2ChartData = chartDataConfig(assessments.test2.Count, `test2`);
  const assignment1ChartData = chartDataConfig(
    assessments.assignment1.Count,
    `assignment1`,
  );
  const assignment2ChartData = chartDataConfig(
    assessments.assignment2.Count,
    `assignment2`,
  );
  const assignment3ChartData = chartDataConfig(
    assessments.assignment3.Count,
    `assignment3`,
  );
  const assignment4ChartData = chartDataConfig(
    assessments.assignment4.Count,
    `assignment4`,
  );
  const assignment5ChartData = chartDataConfig(
    assessments.assignment5.Count,
    `assignment5`,
  );
  const assignment6ChartData = chartDataConfig(
    assessments.assignment6.Count,
    `assignment6`,
  );
  const final1016ChartData = chartDataConfig(
    assessments.final1016.Count,
    `final1016`,
  );
  const assignmentAverage1016ChartData = chartDataConfig(
    assessments.assignmentAverage1016.Count,
    `assignmentAverage1016`,
  );
  const testAverage1016ChartData = chartDataConfig(
    assessments.testAverage1016.Count,
    `testAverage1016`,
  );

  return {
    test1ChartData,
    test2ChartData,
    assignment1ChartData,
    assignment2ChartData,
    assignment3ChartData,
    assignment4ChartData,
    assignment5ChartData,
    assignment6ChartData,
    final1016ChartData,
    assignmentAverage1016ChartData,
    testAverage1016ChartData,
  };
};
