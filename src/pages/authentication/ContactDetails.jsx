import React, { Component } from 'react';
import { GridItem, Box, Flex, Grid, Image, Tab, Tabs, TabPanel, TabPanels, TabList } from '@chakra-ui/react';
import styled from "styled-components";
import CirclepassLogo from '../../assets/images/CirclepassLogo.png';
import Register from './Register';
import SignIn from './SignIn';

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

export class ContactDetails extends Component {
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
                                <Register/>
                            </TabPanel>
                            <TabPanel>
                                <SignIn/>
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

export default ContactDetails