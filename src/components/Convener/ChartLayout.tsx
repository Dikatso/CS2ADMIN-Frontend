import { DoughnutChartLayoutProps } from '@/types/global';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { Chart } from 'react-chartjs-2';

/**
 * UI Function component container for pie charts
 * @param param0
 * @returns JSX.Element
 */
export const DoughnutChartLayout: React.FC<DoughnutChartLayoutProps> = ({
  chartTitle,
  chartOnClick,
  chartRef,
  chartData,
}) => {
  const textColor = useColorModeValue(`#1A202C`, `white`);
  const boxColor = useColorModeValue(`#F1F6F9`, `#4A5568`);

  return (
    <Box w="400px" py={5} bg={boxColor} rounded="lg" boxShadow="lg">
      <Text fontSize="3xl" textAlign="center" color={textColor}>
        {chartTitle}
      </Text>
      <Chart
        ref={chartRef}
        type="doughnut"
        onClick={chartOnClick}
        data={chartData}
        options={{ plugins: { legend: { labels: { color: textColor } } } }}
      />
    </Box>
  );
};
