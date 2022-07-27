import React from "react";

import styled from "styled-components";
import {
  Container,
  Box,
  Tabs,
  TabList,
  Tab,
  Text,
  InputLeftElement,
  InputGroup,
  Input,
  Button,
} from "@chakra-ui/react";
import { Tag } from "@styled-icons/bootstrap";

const TabStepsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 8px;

  width: 684px;
  height: 56px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

function Register() {
  return (
    <>
      <Container maxW="container.lg" marginTop="35px">
        <Box>
          <Text
            alignSelf={"stretch"}
            fontSize="14px"
            color="#001011"
            width={"564px"}
            height={"40px"}
            order="0"
          >
            Create a CirclePass account to start using our apps and services
          </Text>
          <Text
            alignSelf={"stretch"}
            fontSize="14px"
            color="#001011"
            width={"564px"}
            height={"40px"}
            order="0"
          >
            Fill in your primary email address which will be used as the main
            address for comunication and notifications.
          </Text>
        </Box>
        <Box marginTop={"20px"}>
          <Text>Email Address</Text>
          <InputGroup marginTop={"10px"}>
            <InputLeftElement pointerEvents="none">
              <Tag size="20" color="#A3A3A3" />
            </InputLeftElement>
            <Input bgColor="#ffffff" placeholder="name@example.com" />
          </InputGroup>
          <Text marginTop="10px">
            Enter your email address, a confirmation code will be sent.
          </Text>
        </Box>
        <Box display={"flex"} justifyContent={"center"} marginTop={"25px"}>
          <Button colorScheme="blue">Button</Button>
        </Box>
      </Container>
      <Box bottom={0} position="absolute">
        <Box>
          <Text
            alignSelf={"stretch"}
            fontSize="14px"
            color="#001011"
            width={"564px"}
            height={"40px"}
            order="0"
          >
            Provide your contact details to create a new account
          </Text>
          <TabStepsWrapper>
            <Tabs>
              <TabList>
                <Tab
                  alignItems={"flex-start"}
                  flexDirection={"column"}
                  fontSize={"12px"}
                  color={"#00A0E9"}
                  lineHeight={"16px"}
                  fontFamily={"Lucida Sans Unicode"}
                >
                  STEP 1{" "}
                  <Text
                    fontSize="14px"
                    width="165px"
                    height="20px"
                    color="#001011"
                    alignSelf={"stretch"}
                  >
                    {" "}
                    Contact Details
                  </Text>
                </Tab>
                <Tab
                  alignItems={"flex-start"}
                  flexDirection={"column"}
                  fontSize={"12px"}
                  color={"#00A0E9"}
                  lineHeight={"16px"}
                  fontFamily={"Lucida Sans Unicode"}
                >
                  STEP 2{" "}
                  <Text
                    fontSize="14px"
                    width="165px"
                    height="20px"
                    color="#001011"
                    alignSelf={"stretch"}
                  >
                    {" "}
                    Email Verification
                  </Text>
                </Tab>
                <Tab
                  alignItems={"flex-start"}
                  flexDirection={"column"}
                  fontSize={"12px"}
                  color={"#00A0E9"}
                  lineHeight={"16px"}
                  fontFamily={"Lucida Sans Unicode"}
                >
                  STEP 3{" "}
                  <Text
                    fontSize="14px"
                    width="165px"
                    height="20px"
                    color="#001011"
                    alignSelf={"stretch"}
                  >
                    {" "}
                    Account Credentials
                  </Text>
                </Tab>
                <Tab
                  alignItems={"flex-start"}
                  flexDirection={"column"}
                  fontSize={"12px"}
                  color={"#00A0E9"}
                  lineHeight={"16px"}
                  fontFamily={"Lucida Sans Unicode"}
                >
                  STEP 4{" "}
                  <Text
                    fontSize="14px"
                    width="165px"
                    height="20px"
                    color="#001011"
                    alignSelf={"stretch"}
                  >
                    {" "}
                    Completed
                  </Text>
                </Tab>
              </TabList>
            </Tabs>
          </TabStepsWrapper>
        </Box>
      </Box>
    </>
  );
}

export default Register;
