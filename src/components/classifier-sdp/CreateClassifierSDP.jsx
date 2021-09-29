import React from "react";
import {
  Box,
  Input,
  Textarea,
  Button,
  Text,
  Accordion,
  AccordionItem,
  Link,
} from "@chakra-ui/react";
import { useHistory  } from "react-router-dom";
import { SDPComponent } from "components/reusable-components";
import enhancer from "components/formik-enhancer/classifierDemoEnhancer";

const CreateClassifierSDP = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    isValid,
  } = props;
  const history = useHistory();

  const handleFormsSubmit = (e) => {
      history.push({
      pathname: "/showclassifier",
      state: { 
        title : values.title,
        description : values.desc
      },
    });
  };

  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Accordion allowToggle className="" margin="auto" width="80%">
      <AccordionItem className="extra-border box-shadow p-15">
        <Box flex="1" textAlign="left" p="15px">
          <form onSubmit={handleFormsSubmit}>
            <Text
              className="event-name ellipse-text p-r-38"
              fontSize="30px"
              color="#2C5282"
            >
              SDP Classifier Demo
            </Text>
            <Box h="30px" />
            <Input
              className="ipBox"
              w="50%"
              size="lg"
              placeholder="Event Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              id="title"
            />

            <Box h="5px" />
            <Error field="title" />
            <Box h="15px" />
            <Textarea
              className="ipBox"
              placeholder="Event Description"
              id="desc"
              size="lg"
              value={values.desc}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error field="desc" />
            <Box h="30px" />
            <SDPComponent />
            <Box h="40px" />
            <Box style={{ display: "flow-root" }}>
              <Button
                className={isValid ? "register-btn" : "addEventSubmitBtn"}
                disabled={isValid ? false : true}
                type="submit"
                colorScheme="blue"
                w="7rem"
                background="#2C5282"
                textColor="white"
                cursor="pointer"
              >
                SUBMIT
              </Button>
              <Text fontSize="17px" color="#718096">
            About{" "}
              <Link color="#718096" href="#" as='u'>
              Startup Development Phases
              </Link> - {" "}
              <Link color="#718096" href="#">
              Get your API key
              </Link> 
            </Text>
            </Box>
          </form>
        </Box>
      </AccordionItem>
    </Accordion>
  );
};
export default enhancer(CreateClassifierSDP);
