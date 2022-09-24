import { Enquiry } from '@/types/global';
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
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';

interface TabDetailsProps {
  enquiry: Enquiry;
  view: 'student' | 'convener';
}

export const TabDetails: React.FC<TabDetailsProps> = ({ enquiry, view }) => {
  const fileBlob = enquiry?.attatchmentLink?.split(`/`);
  let fileName = ``;
  if (fileBlob != undefined) {
    fileName = fileBlob[fileBlob.length - 1];
  }
  const bgColor = useColorModeValue(`white`, `#4A5568`);
  const textColor = useColorModeValue(`#1A202C`, `white`);
  const linkColor = useColorModeValue(`blue.600`, `white`);
  const buttonColor = useColorModeValue(`blue.500`, `blue.200`);

  return (
    <>
      <Text color={textColor} fontSize={`xl`} as="b">
        Message and Attachements
      </Text>
      <Box
        my={3}
        borderColor="#bfbfbf"
        bgColor={bgColor}
        boxShadow="xs"
        borderRadius={10}
      >
        <Tabs isFitted>
          <TabList>
            <Tab>
              <Text color={textColor} as="b">
                Message
              </Text>
            </Tab>
            <Tab>
              <Text color={textColor} as="b">
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
                {fileBlob == undefined ? (
                  <Center>
                    <Text fontSize="sm"></Text>
                  </Center>
                ) : (
                  <>
                    <Text mt={2} color={linkColor}>
                      {fileName}
                    </Text>
                    <Spacer />
                    <Link href={enquiry.attatchmentLink} isExternal>
                      <Button bgColor={buttonColor} color="white">
                        <AiOutlineFilePdf />
                        <Text ml={1}>View PDF</Text>
                      </Button>
                    </Link>
                  </>
                )}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};
