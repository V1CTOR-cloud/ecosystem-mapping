import React from "react";

import {
  GridItem,
  Stack,
  Checkbox,
  Container,
  InputGroup,
  Button,
  InputLeftElement,
  Text,
  Input,
  Tag,
  Box,
  Flex,
  Grid,
  Image,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
} from "@chakra-ui/react";
import styled from "styled-components";

import CirclepassLogo from "../../assets/images/CirclepassLogo.png";
import SignIn from "./SignIn";

const LeftSideWrapper = styled.section`
  display: flex;
  width: 50%;
  background-color: #f4f1f4;
  padding: 32px 16px 16px;
  gap: 16px;
  justify-content: center;
  top: 32px;
`;
const RightSideWrapper = styled.section`
  background-color: #3372f0;
  width: 50%;
`;
const RememberMe = styled.section`
  width: 204px;
  height: 20px;
  font-family: "Lucida Sans", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.02em;
  color: #001011;
  flex: none;
  order: 1;
  flex-grow: 0;
  top: 10px;
`;

const CirclepassLogoWrapper = styled.section`
  display: flex;
  width: 200px;
  justify-content: center;
  height: 56.58px;
`;

const FooterWrapper = styled.section`
  /* Auto layout */

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 16px;

  width: 684px;
  height: 92px;

  /* Inside auto layout */

  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
`;

const TabStepsWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 8px;

  width: 684px;
  height: 56px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

function AccountCredentials() {
  return (
    <>
      <Flex flexDirection="row">
        <LeftSideWrapper>
          <Grid
            templateAreas={`"header header"
                "nav main"
                "nav footer"`}
            gridTemplateRows={"90px 1fr 30px"}
          >
            <GridItem
              pl="2"
              area={"header"}
              display="flex"
              justifyContent="center"
            >
              <CirclepassLogoWrapper>
                <Image src={CirclepassLogo} />
              </CirclepassLogoWrapper>
            </GridItem>
            <Box>
              <GridItem pl="2" area={"main"}>
                <Tabs>
                  <TabList>
                    <Tab
                      size="16px"
                      fontFamily="Lucida Sans"
                      lineHeight="24px"
                      w="22.5vw"
                    >
                      REGISTER
                    </Tab>
                    <Tab size="16px" lineHeight="24px" w="22.5vw">
                      SIGN IN
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Container maxW="container.lg" marginTop="35px">
                        <Box>
                          {/* <TextWrapper>
                Fill in your personal information and account credentials to setup your account 
                </TextWrapper> */}
                          <Box>
                            <Text>Full Name</Text>

                            <InputGroup marginTop={"10px"}>
                              <InputLeftElement pointerEvents="none">
                                <Tag size="20" color="#A3A3A3" />
                              </InputLeftElement>
                              <Input
                                w="45%"
                                bgColor="#FFFFFF"
                                placeholder="First Name"
                              />
                              <Input
                                left="2%"
                                w="45%"
                                bgColor="#FFFFFF"
                                placeholder="Last Name"
                              />
                            </InputGroup>
                            <Text size="12px" color="#718096">
                              Type your full name including first and last name
                            </Text>
                          </Box>
                          <Box marginTop={"25px"}>
                            <Text>Username</Text>
                            <InputGroup marginTop={"10px"}>
                              <InputLeftElement pointerEvents="none">
                                <Tag size="20" color="#A3A3A3" />
                              </InputLeftElement>
                              <Input
                                w="100%"
                                bgColor="#FFFFFF"
                                placeholder="Username"
                              />
                            </InputGroup>
                            <Text size="12px" color="#718096">
                              Type your username, this will also be used for
                              your account URL
                            </Text>
                          </Box>
                          <Box marginTop={"25px"}>
                            <Text>Password</Text>
                            <InputGroup marginTop={"10px"}>
                              <InputLeftElement pointerEvents="none">
                                <Tag size="20" color="#A3A3A3" />
                              </InputLeftElement>
                              <Input
                                type="password"
                                w="100%"
                                bgColor="#FFFFFF"
                                placeholder="Password"
                              />
                            </InputGroup>
                            <Text size="12px" color="#718096">
                              Choose a strong password that contains at least 8
                              characters, one uppercase letter, one lowercase
                              letter, one number, and one special character.
                            </Text>
                          </Box>
                          <Box marginTop={"25px"}>
                            <Stack>
                              <Checkbox colorScheme="blue" defaultChecked>
                                <RememberMe>
                                  Remember my on this device
                                </RememberMe>
                              </Checkbox>
                            </Stack>
                          </Box>
                        </Box>

                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          marginTop={"30px"}
                        >
                          <Button
                            marginRight={"10%"}
                            disabled
                            colorScheme="blue"
                          >
                            Register
                          </Button>
                        </Box>
                      </Container>
                      <Box bottom={"30px"} position="absolute">
                        <FooterWrapper>
                          {/* <TextWrapper>
                Fill your personal information to copmlete your account
                </TextWrapper> */}
                          <TabStepsWrapper>
                            <Tabs>
                              <TabPanels>
                                <TabPanel>{/* <ContactDetails /> */}</TabPanel>
                                <TabPanel>
                                  {/* <EmailConfrimation /> */}
                                </TabPanel>
                                <TabPanel>
                                  {/* <AccountCredentials /> */}
                                </TabPanel>
                                <TabPanel>
                                  {/* <VerificationCompleted/> */}
                                </TabPanel>
                              </TabPanels>
                            </Tabs>
                          </TabStepsWrapper>
                        </FooterWrapper>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <SignIn />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </GridItem>
            </Box>
          </Grid>
        </LeftSideWrapper>
        <RightSideWrapper />
      </Flex>
    </>
  );
}

export default AccountCredentials;
