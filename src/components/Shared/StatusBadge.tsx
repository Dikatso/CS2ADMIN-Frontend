import { StatusBadgeProps } from '@/types/global';
import { Box } from '@chakra-ui/react';
import { Badge } from '@mantine/core';

/**
 * UI Function component for displaying enquiry status based on its status
 * @param {object} props Component props
 * @param {} placeholder
 * @param {string} props.enquiryStatus selected enquiry status
 * @param {MantineSize} props.size size of the bade
 * @param {React.Dispatch<React.SetStateAction<string>>} props.onChange setState function for updating no of days
 * @returns {JSX.Element} JSX Element
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  enquiryStatus,
  size,
}): JSX.Element => {
  let color = ``;

  switch (enquiryStatus) {
    case `Recieved`:
      color = `yellow`;
      break;
    case `Approved`:
      color = `green`;
      break;
    case `Reviewed`:
      color = `indigo`;
      break;
    default:
      color = `red`;
  }

  return (
    <Box pr={8}>
      <Badge color={color} size={size} variant="outline">
        {enquiryStatus}
      </Badge>
    </Box>
  );
};
