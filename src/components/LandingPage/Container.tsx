import { Box } from '@chakra-ui/react';

interface LandingPageContainerProps {
  children: JSX.Element;
}

export const LandingPageContainer: React.FC<LandingPageContainerProps> = ({
  children,
}) => {
  return (
    <Box bg="white" w="100%" height="100%">
      {children}
    </Box>
  );
};
