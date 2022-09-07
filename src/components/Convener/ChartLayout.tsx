import { DoughnutChartLayoutProps } from '@/types/convener';
import { Box, Text } from '@chakra-ui/react';
import { Chart } from 'react-chartjs-2';

export const DoughnutChartLayout: React.FC<DoughnutChartLayoutProps> = ({
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
