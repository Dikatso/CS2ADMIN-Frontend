import { Enquiry } from '@/types/convener';
import {
  Button,
  Box,
  Text,
  Spacer,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';

interface TabDetailsProps {
  enquiry: Enquiry;
  view: 'student' | 'convener';
}

export const TabDetails: React.FC<TabDetailsProps> = ({ enquiry, view }) => {
  const fileBlob = enquiry.attatchmentLink.split(`/`);
  const fileName = fileBlob[fileBlob.length - 1];

  return (
    <>
      <Text color="#333333" fontSize={`xl`} as="b">
        Message and Attachements
      </Text>
      <Box
        my={3}
        borderColor="#bfbfbf"
        bgColor="white"
        boxShadow="xs"
        borderRadius={10}
      >
        <Tabs isFitted>
          <TabList>
            <Tab>
              <Text color="#969799" as="b">
                Message
              </Text>
            </Tab>
            <Tab>
              <Text color="#969799" as="b">
                Attatchments
              </Text>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text>
                {view === `convener`
                  ? enquiry.messageFromStudent
                  : enquiry.messageFromConvener}
              </Text>
            </TabPanel>
            <TabPanel>
              <Box display="flex" flexDirection="row">
                <Text mt={2} color="blue.600">
                  {fileName}
                </Text>
                <Spacer />
                <Link href={enquiry.attatchmentLink} isExternal>
                  <Button>
                    <AiOutlineFilePdf />
                    <Text ml={1}>View PDF</Text>
                  </Button>
                </Link>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
