import { Box } from '@chakra-ui/react';
import { Badge, MantineSize } from '@mantine/core';

interface StatusBadgeProps {
  enquiryStatus: string;
  size: MantineSize;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  enquiryStatus,
  size,
}) => {
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
