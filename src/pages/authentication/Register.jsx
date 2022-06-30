import { Container } from '@chakra-ui/react';
import React from 'react';
import styled from "styled-components";
import { Box, Tabs, TabList, TabPanel, TabPanels,Tab, InputLeftElement,InputGroup,Input, Button } from '@chakra-ui/react';
import {Tag } from '@styled-icons/bootstrap';
// import ContactDetails from './ContactDetails';
import AccountCredentials from './AccountCredentials';
import VerificationCompleted from './VerificationCompleted';
import EmailConfrimation from './EmailConfrimation';

const TextWrapper = styled.section`

font-family: 'Lucida Sans';
font-style: normal;
font-size: 14px;
color: #001011;
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
width: 564px;
height: 40px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.02em;
`

const EmailAddressWrapper = styled.section`
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
const EmailConfirmationText = styled.section`
margin-top:8px;
width: 564px;
height: 16px;

/* Circle Pass (+Teams)/text/xs */

font-family: 'Lucida Sans Unicode';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 16px;
/* identical to box height, or 133% */

letter-spacing: 0.01em;

/* gray/500 */

color: #718096;


/* Inside auto layout */

flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
`

const FooterWrapper = styled.section`
/* Auto layout */

display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

width: 684px;
height: 92px;


/* Inside auto layout */

flex: none;
order: 3;
align-self: stretch;
flex-grow: 0;
`

const TabStepsWrapper = styled.section`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
gap: 8px;

width: 684px;
height: 56px;


/* Inside auto layout */

flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
`

const TitleOfSteps = styled.section`
width: 165px;
height: 20px;


/* Circle Pass (+Teams)/text/md */

font-family: 'Lucida Sans';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

letter-spacing: 0.02em;

/* Circle Pass/CP Dark BG */

color: #001011;


/* Inside auto layout */

display:flex;
order: 1;
align-self: stretch;
flex-grow: 0;`
function Register() {
    return (
    <><Container maxW='container.lg' marginTop='35px'>
            <Box>
                <TextWrapper>
                    Create a CirclePass account to start using our apps and services
                </TextWrapper>
                <TextWrapper>
                    Fill in your primary email address which will be used as the main address for comunication and notifications.
                </TextWrapper>
            </Box>
            <Box marginTop={'20px'}>
                <EmailAddressWrapper>
                    Email Address
                </EmailAddressWrapper>
                <InputGroup marginTop={'10px'}>
                    <InputLeftElement
                        pointerEvents='none'
                    >
                    <Tag
                        size="20"
                        color='#A3A3A3' />
                    </InputLeftElement>
                <Input bgColor='#ffffff' placeholder='name@example.com' />
                </InputGroup>
                <EmailConfirmationText>
                    Enter your email address, a confirmation code will be sent.
                </EmailConfirmationText>
            </Box>
            <Box display={'flex'} justifyContent={'center'} marginTop={'16px'}>
                <Button colorScheme='blue'>Button</Button>
            </Box>
            </Container>
            <Box bottom={'30px'} position='absolute'>
            <FooterWrapper>
                <TextWrapper>
                    Provide your contact details to create a new account
                </TextWrapper>
            <TabStepsWrapper >
            <Tabs >
                <TabList >
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 1 <TitleOfSteps>Contact Details</TitleOfSteps>                    </Tab>
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 2 <TitleOfSteps>Email Verification</TitleOfSteps></Tab>
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 3 <TitleOfSteps>Account Credentials</TitleOfSteps></Tab>
                    <Tab alignItems={'flex-start'} flexDirection={'column'} fontSize={'12px'} color={'#00A0E9'} lineHeight={'16px'} fontFamily={'Lucida Sans Unicode'}>STEP 4 <TitleOfSteps>Completed</TitleOfSteps></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        {/* <ContactDetails /> */}
                    </TabPanel>
                    <TabPanel>
                        <EmailConfrimation />
                    </TabPanel>
                    <TabPanel>
                        <AccountCredentials />
                    </TabPanel>
                    <TabPanel>
                        <VerificationCompleted/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            </TabStepsWrapper> 
            </FooterWrapper>
        </Box>
        </>
    )
}

export default Register