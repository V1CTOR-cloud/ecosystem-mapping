import React from "react";
import {
  Box,
  Button,
  Text,
  Accordion,
  AccordionItem,
  Link,
} from "@chakra-ui/react";
import { useHistory  } from "react-router-dom";
import { SDPComponent } from "components/reusable-components";
import enhancer from "components/formik-enhancer/classifierDemoEnhancer";

const ShowClassifierSDP = (props) => {
  const history = useHistory();
  return (
    <Accordion allowToggle className="" margin="auto" width="80%">
      <AccordionItem className="extra-border box-shadow p-15">
        <Box flex="1" textAlign="left" p="15px">
          <Text
            className="event-name ellipse-text p-r-38"
            fontSize="30px"
            color="#2C5282"
          >
            SDP Classifier Demo
          </Text>
          <Box h="30px" />
          <Box p="20px">
          <Text 
            className="event-name ellipse-text"
            fontSize="25px"
            color="#4A5568"
          >
          {history.location.state.title}
          </Text>
          <Box h="20px" />
          <Text w="95%" fontSize="18px">
          {history.location.state.description}
            </Text>
          </Box>
          <Box h="30px" />
          <SDPComponent />
          <Box h="40px" />
          <Box style={{ display: "flow-root" }}>
            <Button
              className={"register-btn"}
              type="submit"
              colorScheme="blue"
              w="10rem"
              background="#2C5282"
              textColor="white"
              onClick={() => {history.push("/createclassifier")}}
            >
              Try Another One
            </Button>
            <Text  fontSize="17px" color="#718096">
            About{" "}
              <Link color="#718096" href="#">
              Startup Development Phases
              </Link> - {" "}
              <Link color="#718096" href="#">
              Get your API key
              </Link> 
            </Text>
          </Box>
        </Box>
      </AccordionItem>
    </Accordion>
  );
};
export default enhancer(ShowClassifierSDP);
