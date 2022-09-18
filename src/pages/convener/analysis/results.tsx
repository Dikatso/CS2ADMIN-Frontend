/* eslint-disable import/extensions */
import { ConvenerPageHeader } from '@/components/Convener/Header';
import { useStudentStore } from '@/state/studentDataStore';
import { chartCtx, IchartData } from '@/types/convener';
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
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, MouseEvent, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  InteractionItem,
} from 'chart.js';
import { getDatasetAtEvent, getElementAtEvent } from 'react-chartjs-2';
import { useAssessments } from '@/hooks/assessments';
import { useChartData } from '@/hooks/chartData';
import { useChartRefs } from '@/hooks/chartRefs';
import { StudentsModal } from '@/components/Convener/StudentListModal';
import { DoughnutChartLayout } from '@/components/Convener/ChartLayout';
import { useAuth } from '@/auth/Auth';
import { exportToCsv2 } from '@/utils/convener/file';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnalysisResults: NextPage = () => {
  const router = useRouter();
  const refs = useChartRefs();
  const assessments = useAssessments();
  const chartData = useChartData();

  const { students, strugglingStudents } = useStudentStore();
  const [currentChartCtx, setCurrentChartCtx] = useState<chartCtx>({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isAuthenticated, getCurrentUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated()) {
      const {
        user: { role },
      } = getCurrentUser();
      role == `Student`
        ? router.push(`/student`)
        : () => {
            console.log();
          };
    } else {
      router.push(`/`);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated()) {
      if (students.length == 0) {
        router.push(`/convener`);
      }
    } else {
      router.push(`/`);
    }
  }, [students]);

  /**
   * Collects the dataset and element from the clicked doughnut chart
   * @param dataset dataset from current chart
   * @param element elements from current chart
   * @param chartData data from the current chart
   * @returns chart label, current element ranking and count, and all rankings
   */
  const getChartCtx = (
    dataset: InteractionItem[],
    element: InteractionItem[],
    chartData: IchartData,
  ): chartCtx => {
    if (!element.length || !dataset.length) return;

    const chartLabel = chartData.datasets[dataset[0].datasetIndex].label;
    const chartRanking = chartData.labels[element[0].index].split(` `)[0];
    const rankingCount =
      chartData.datasets[element[0].datasetIndex].data[element[0].index];

    return {
      chartLabel,
      chartRanking,
      rankingCount,
      rankings: assessments,
    };
  };

  /**
   * Event handler for doghnut charts
   * @param event
   * @param chartData data from the current chart
   * @returns
   */
  const onClick = (
    event: MouseEvent<HTMLCanvasElement>,
    chartData: IchartData,
    chartRef: any,
  ): void => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    const dataset = getDatasetAtEvent(chart, event);
    const element = getElementAtEvent(chart, event);

    if (dataset.length == 0 || element.length == 0) {
      return;
    } else {
      const { chartLabel, rankingCount, chartRanking, rankings } = getChartCtx(
        dataset,
        element,
        chartData,
      );
      setCurrentChartCtx({ chartLabel, rankingCount, chartRanking, rankings });
      onOpen();
    }
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
          mt={5}
        >
          <StudentsModal
            isOpen={isOpen}
            onClose={onClose}
            currentChartCtx={currentChartCtx}
          />
          <Box display="flex" flexDirection="column">
            <Center>
              <Text fontSize="5xl" fontWeight={700} mb={1}>
                Student Analysis
              </Text>
            </Center>
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
                <Tab>
                  <Text
                    onClick={() => exportToCsv2(strugglingStudents)}
                    fontSize="lg"
                  >
                    Download Struggling Students
                  </Text>
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
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.test1ChartData,
                          refs.test1ChartRef,
                        )
                      }
                      chartRef={refs.test1ChartRef}
                      chartData={chartData.test1ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Test 2"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.test2ChartData,
                          refs.test2ChartRef,
                        )
                      }
                      chartRef={refs.test2ChartRef}
                      chartData={chartData.test2ChartData}
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
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.assignment1ChartData,
                          refs.assignment1ChartRef,
                        )
                      }
                      chartRef={refs.assignment1ChartRef}
                      chartData={chartData.assignment1ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Assignment 2"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.assignment2ChartData,
                          refs.assignment2ChartRef,
                        )
                      }
                      chartRef={refs.assignment2ChartRef}
                      chartData={chartData.assignment2ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Assignment 3"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.assignment3ChartData,
                          refs.assignment3ChartRef,
                        )
                      }
                      chartRef={refs.assignment3ChartRef}
                      chartData={chartData.assignment3ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Assignment 4"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.assignment4ChartData,
                          refs.assignment4ChartRef,
                        )
                      }
                      chartRef={refs.assignment4ChartRef}
                      chartData={chartData.assignment4ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Assignment 5"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.assignment5ChartData,
                          refs.assignment5ChartRef,
                        )
                      }
                      chartRef={refs.assignment5ChartRef}
                      chartData={chartData.assignment5ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Assignment 6"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.assignment6ChartData,
                          refs.assignment6ChartRef,
                        )
                      }
                      chartRef={refs.assignment6ChartRef}
                      chartData={chartData.assignment6ChartData}
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
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.final1016ChartData,
                          refs.final1016ChartRef,
                        )
                      }
                      chartRef={refs.final1016ChartRef}
                      chartData={chartData.final1016ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Assignment Average"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.assignmentAverage1016ChartData,
                          refs.assignmentAverage1016ChartRef,
                        )
                      }
                      chartRef={refs.assignmentAverage1016ChartRef}
                      chartData={chartData.assignmentAverage1016ChartData}
                    />
                    <DoughnutChartLayout
                      chartTitle="Test Average"
                      chartOnClick={(event) =>
                        onClick(
                          event,
                          chartData.testAverage1016ChartData,
                          refs.testAverage1016ChartRef,
                        )
                      }
                      chartRef={refs.testAverage1016ChartRef}
                      chartData={chartData.testAverage1016ChartData}
                    />
                  </Grid>
                </TabPanel>
                <TabPanel>
                  {/* onClick={() => exportToCsv2(strugglingStudents)} */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default AnalysisResults;
