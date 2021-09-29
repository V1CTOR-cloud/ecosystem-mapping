import React from "react";
import {
  Box,
  Button,
  Text,
  Accordion,
  AccordionItem,
  Link,
  Center,
} from "@chakra-ui/react";
import enhancer from "components/formik-enhancer/classifierDemoEnhancer";

const ClassifierSDPPage = (props) => {
  return (
    <Accordion allowToggle className="" margin="auto" width="70%"> 
      <AccordionItem className="extra-border box-shadow p-15">
        <Box flex="1" textAlign="center" p="15px">
          <Text
            className="event-name ellipse-text p-r-38"
            fontSize="30px"
            color="#2C5282"
            textAlign="center"
          >
            SDP Classifier
          </Text>
          <Box h="38px"/>
          <Box>
            <Text
              className="event-name ellipse-text"
              fontWeight="600"
              fontSize="22px"
              color="#4A5568"
              textAlign="center"
              mr="40px"
            >
              Thanks for testing!
            </Text>
            <Box h="22px" />
            <Text
              className="event-name md-6"
              textAlign="center"
              fontWeight="400"
              fontSize="16px"
              color="#4A5568"
            >
              To start automatically labelling startup events for your
              ecosystem, get your ‘SDP classifier' API key by clicking the
              button below.
            </Text>
            <Box h="20px" />
            <Text textAlign="center" fontSize="18px"> 
              <Link color="#718096">
                Contact our sales 
              </Link>{" "}  if you need support for implementing it to
                your system. If you dont have an event portal, then {" "}
                <Link color="#718096" >check out
                our aggregated events hub
                </Link>{" "} solution.
            </Text>
            <Box h="36px" />
            <Center>
              <Button
                className={"register-btn"}
                type="submit"
                colorScheme="blue"
                w="10rem"
                background="#2C5282"
                textColor="white"
              >
                Get API Key
              </Button>
            </Center>
          </Box>
        </Box>
      </AccordionItem>
    </Accordion>
  );
};
export default enhancer(ClassifierSDPPage);
