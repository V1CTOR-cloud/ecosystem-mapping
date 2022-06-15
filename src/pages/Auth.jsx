import React, { Component } from 'react';
import { GridItem, Text, Box, Flex, Grid, Checkbox, Button, InputGroup, Input, Stack, Image, Tab, Tabs, TabPanel, TabPanels, TabList, InputLeftElement } from '@chakra-ui/react';
import styled from "styled-components";
import CirclepassLogo from './../assets/images/CirclepassLogo.png';
import { Icon } from '@iconify/react';

const LeftSideWrapper = styled.section `
    display: flex;
    width: 50%;
    background-color: #F4F1F4;
    padding: 32px 16px 16px;
    gap: 16px;
    justify-content: center;
    top: 32px;
`
const RightSideWrapper = styled.section`
    background-color: #3372f0;
    width: 50%;
    
`
const FormFieldWrapper = styled.section`
width: 564px;
height: 20px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.02em;
margin-top:24px;
/* margin-left:40px; */
color: #001011;
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`
const CirclepassLogoWrapper = styled.section`
    display: flex;
    width: 200px;
    justify-content: center;
    height: 56.58px;
`

// const AuthWrapper = styled.section`
// width: 75px;
// height: 24px;

// font-family: 'Lucida Sans';
// font-style: normal;
// font-weight: 400;
// font-size: 16px;
// line-height: 24px;
// display: flex;
// align-items: center;
// letter-spacing: 0.02em;
// color: #2A69AC;
// opacity: 0.5;
// flex: none;
// order: 0;
// flex-grow: 0;
// `
const ForgotMyUsername = styled.section`
    width: 274px;
height: 20px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.02em;


color: #2A69AC;
flex: none;
order: 0;
flex-grow: 1;
`
const Username = styled.section`
width: 564px;
height: 24px;

margin-top:24px;
/* margin-left:40px; */
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.02em;
color: #001011;

flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`


const Explanation = styled.section`
width: 564px;
height: 16px;
font-family: 'Lucida Sans Unicode';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
letter-spacing: 0.01em;
color: #718096;
margin-top: 8px;
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
`

const RememberMe = styled.section`
    width: 204px;
height: 20px;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
letter-spacing: 0.02em;
color: #001011;
flex: none;
order: 1;
flex-grow: 0;
top:10px;
`
const SignInWrapper = styled.section `
    width: 59px;
height: 24px;

font-family: 'Lucida Sans';
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
letter-spacing: 0.02em;
color: #FFFFFF;
flex: none;
order: 0;
flex-grow: 0;
`

const FooterText = styled.section`
width: 564px;
height: 20px;
justify-content: center;
font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.02em;
color: #001011;
flex: none;
order: 0;
flex-grow: 0;
`

export class Auth extends Component {
  render() {
    return (
    <>
     <Flex flexDirection="row">
        <LeftSideWrapper >
            <Grid
                templateAreas={`"header header"
                "nav main"
                "nav footer"`}
                gridTemplateRows={'90px 1fr 30px'}
            >
                <GridItem
                    pl='2' area={'header'}
                    display='flex' justifyContent='center'>
                    <CirclepassLogoWrapper>
                        <Image src={CirclepassLogo} />
                    </CirclepassLogoWrapper>
                </GridItem>
                <Box>
                <GridItem
                    pl='2' area={"main"}
                >
                    <Tabs>
                        <TabList>
                            <Tab size='16px' fontFamily='Lucida Sans' lineHeight='24px' w='22.5vw'>REGISTER</Tab>
                            <Tab size='16px' lineHeight='24px' w='22.5vw'>SIGN IN</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <p>REGISTER FORM.....</p>
                            </TabPanel>
                            <TabPanel>
                                <FormFieldWrapper>
                                    Sign in with your CirclePass account to access our apps and services
                                </FormFieldWrapper>
                                <Box>
                                    <Box>
                                    <Username color='#001011' size='16px' lineHeight='24px'>
                                        Username
                                    </Username>
                                        <InputGroup>
                                            <InputLeftElement
                                            pointerEvents='none'
                                            children={<Icon fontSize="20px" color='#A3A3A3' icon="mdi:tag-outline" />}
                                            />
                                                <Input  width='90%'  bgColor='#ffffff' type='Username' placeholder='    Username' />
                                        </InputGroup>
                                        <Explanation>
                                            Enter the username you have registered with
                                        </Explanation>
                                    </Box>
                                    <Box>
                                    <Username color='#001011' size='16px' lineHeight='24px'>
                                        Password
                                    </Username>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<Icon fontSize="20px" color='#A3A3A3' icon="mdi:lock-open-outline" />}
                                        />
                                        <Input width='90%'  bgColor='#ffffff' type='Password' placeholder='    Password' />
                                    </InputGroup>
                                    <Explanation>
                                        Enter the password you have registered with
                                    </Explanation>
                                   </Box>
                                   <Stack marginTop='15px'>
                                    <Checkbox colorScheme='blue' defaultChecked>
                                        <RememberMe>
                                            Remember my on this device
                                        </RememberMe>
                                    </Checkbox>
                                    </Stack>
                                    <Stack display='flex' justifyContent='center' spacing={4} direction='row' align='center'>
                                        <Button 
                                        top='30px'
                                        display='flex' 
                                        flex-direction= 'row'
                                        justify-content= 'center'
                                        align-items='center'
                                        padding='10px 16px'
                                        gap='8px'
                                        width= '91px'
                                        _hover={{ bg: "#00A0E9" }}
                                        height= '40px'
                                        background= '#00A0E9' 
                                        border-radius='6px'
                                        >
                                        <SignInWrapper>
                                            Sign in
                                        </SignInWrapper>
                                        </Button>
                                    </Stack>

                                    <Box
                                    marginTop={'230px'} marginLeft={'150px'}
                                    >
                                        <FooterText>
                                        Having a problem signing in?
                                        </FooterText>
                                        <Flex  marginLeft={'85px'} marginTop={'10px'} flexDirection={'row'}>
                                            <ForgotMyUsername>Forgot my username &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reset my password</ForgotMyUsername>                                            
                                        </Flex>
                                    </Box>
                                </Box>
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
}

export default Auth