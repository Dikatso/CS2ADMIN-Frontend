import { ConvenerPageHeader } from '@/components/Convener/Header';
import { useStudentStore } from '@/state/studentDataStore';
import { DoughnutChartLayoutProps, studentData } from '@/types/convener';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, MouseEvent, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  InteractionItem,
} from 'chart.js';
import { getElementsAtEvent, Chart } from 'react-chartjs-2';
import {
  assignmentAverage1016Ranking,
  testAverage1016Ranking,
  assignment1Ranking,
  assignment2Ranking,
  assignment3Ranking,
  assignment4Ranking,
  assignment5Ranking,
  assignment6Ranking,
  final1016Ranking,
  test1Ranking,
  test2Ranking,
} from '@/utils/convener/studentMarksRanking';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartLayout: React.FC<DoughnutChartLayoutProps> = ({
  chartTitle,
  chartOnClick,
  chartRef,
  chartData,
}) => {
  return (
    <Box w="400px" py={5} bg="#f1f6f9" rounded="lg" boxShadow="lg">
      <Text fontSize="3xl" textAlign="center">
        {chartTitle}
      </Text>
      <Chart
        ref={chartRef}
        type="doughnut"
        onClick={chartOnClick}
        data={chartData}
      />
    </Box>
  );
};

const chartData = (dataValues: number[]) => {
  const data = {
    labels: [`Critical`, `Adequate`, `Moderate`, `Neritorious`, `Outstanding`],
    datasets: [
      {
        label: `# of Votes`,
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

const AnalysisResults: NextPage = () => {
  const { students } = useStudentStore();
  const router = useRouter();

  useEffect(() => {
    if (students.length == 0) {
      router.push(`/convener`);
    }
  }, [students]);

  const { test1Count } = test1Ranking(students);
  const { test2Count } = test2Ranking(students);
  const { assignment1Count } = assignment1Ranking(students);
  const { assignment2Count } = assignment2Ranking(students);
  const { assignment3Count } = assignment3Ranking(students);
  const { assignment4Count } = assignment4Ranking(students);
  const { assignment5Count } = assignment5Ranking(students);
  const { assignment6Count } = assignment6Ranking(students);
  const { final1016Count } = final1016Ranking(students);
  const { assignmentAverage1016Count } = assignmentAverage1016Ranking(students);
  const { testAverage1016Count } = testAverage1016Ranking(students);

  const test1ChartData = chartData(test1Count);
  const test2ChartData = chartData(test2Count);
  const assignment1ChartData = chartData(assignment1Count);
  const assignment2ChartData = chartData(assignment2Count);
  const assignment3ChartData = chartData(assignment3Count);
  const assignment4ChartData = chartData(assignment4Count);
  const assignment5ChartData = chartData(assignment5Count);
  const assignment6ChartData = chartData(assignment6Count);
  const final1016ChartData = chartData(final1016Count);
  const assignmentAverage1016ChartData = chartData(assignmentAverage1016Count);
  const testAverage1016CountChartData = chartData(testAverage1016Count);

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;
    console.log(`element`, elements[0].index, test1Count[elements[0].index]);
  };

  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  if (students.length === 0) {
    return (
      <Box>
        <Box display="flex" justifyContent="center" mt="15%">
          <Spinner size="xl" />
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <ConvenerPageHeader />
        <Box
          bg="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="50px"
        >
          <Tabs variant="soft-rounded" colorScheme="green" bg="white">
            <TabList display="flex" justifyContent="center">
              <Tab>
                <Text fontSize="lg">Tests</Text>
              </Tab>
              <Tab>
                <Text fontSize="lg">Assignments</Text>
              </Tab>
              <Tab>
                <Text fontSize="lg">CSC1016</Text>
              </Tab>
            </TabList>

            <TabPanels>
              {/*  Tests */}
              <TabPanel display="flex" flexDirection="row" bg="white" mt={2}>
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(2, 1fr)"
                  gap={10}
                >
                  <DoughnutChartLayout
                    chartTitle="Test 1"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={test1ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Test 2"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={test2ChartData}
                  />
                </Grid>
              </TabPanel>

              {/*  Assignments */}
              <TabPanel display="flex" flexDirection="row" bg="white" mt={2}>
                <Grid
                  templateRows="repeat(3, 1fr)"
                  templateColumns="repeat(3, 1fr)"
                  gap={10}
                >
                  <DoughnutChartLayout
                    chartTitle="Assignment 1"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={assignment1ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Assignment 2"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={assignment2ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Assignment 3"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={assignment3ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Assignment 4"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={assignment4ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Assignment 5"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={assignment5ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Assignment 6"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={assignment6ChartData}
                  />
                </Grid>
              </TabPanel>

              <TabPanel display="flex" flexDirection="row" bg="white" mt={2}>
                <Grid
                  templateRows="repeat(1, 1fr)"
                  templateColumns="repeat(3, 1fr)"
                  gap={10}
                >
                  <DoughnutChartLayout
                    chartTitle="Final"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={final1016ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Assignment Average"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={assignmentAverage1016ChartData}
                  />
                  <DoughnutChartLayout
                    chartTitle="Test Average"
                    chartOnClick={onClick}
                    chartRef={chartRef}
                    chartData={testAverage1016CountChartData}
                  />
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    );
  }
};

// Allows the page to be hydrated
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default AnalysisResults;
