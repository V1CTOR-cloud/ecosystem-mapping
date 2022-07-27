import React, { Component } from 'react';
import { Container } from '@chakra-ui/react';
import {  Box, Text, Flex,  Checkbox, Button, InputGroup, Input, Stack,Link, InputLeftElement } from '@chakra-ui/react';
import {Tag, Unlock} from '@styled-icons/bootstrap';

export class SignIn extends Component {
  render() {
    return (
        <Container maxW='container.lg' marginTop='35px'>
             <Text alignSelf={'stretch'} fontSize='14px' color='#001011' width={'564px'} height={'40px'} order="0">
        Sign in with your CirclePass account to access our apps and services
    </Text>
    <Box>
        <Box marginTop='20px'>
        <Text color='#001011' size='16px' lineHeight='24px'>
            Username
        </Text>
            <InputGroup>
                <InputLeftElement
                pointerEvents='none'
                ><Tag
                size="20"
                color='#A3A3A3'
                />
        </InputLeftElement>
            <Input  width='90%'  bgColor='#ffffff' type='Username' placeholder='    Username' />
        </InputGroup>
        <Text  marginTop='7px' fontSize='12px' letter-spacing='0.01em' color="#718096">
            Enter the username you have registered with
        </Text>
        </Box>
        <Box marginTop='20px'>
        <Text color='#001011' size='16px' lineHeight='24px'>
            Password
        </Text>
        <InputGroup>
        <InputLeftElement
            pointerEvents='none'
            ><Unlock
            color='#A3A3A3'
            size="20"
            />
        </InputLeftElement>
            <Input width='90%'  bgColor='#ffffff' type='Password' placeholder='    Password' />
        </InputGroup>
        <Text   marginTop='7px' fontSize='12px' letter-spacing='0.01em' color='#718096'>
            Enter the password you have registered with
        </Text>
       </Box>
       <Stack marginTop='15px'>
        <Checkbox marginTop={'10px'} colorScheme='blue' defaultChecked>
            <Text fontSize={'14px'} width='204px' height='20px'>
                Remember my on this device
            </Text>
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
           
                Sign in
            </Button>
        </Stack>
        {/* Some changes to be done... */}
        <Box bottom={'30px'} position='absolute'
        marginTop={'230px'} marginLeft={'150px'}
        >
            <Text fontSize={'14px'} width={'564px'} height={'20px'}>
            Having a problem signing in?
            </Text>
            <Flex  flexDirection='row' display='flex'>
                <Link color='#2A69AC' fontSize='14px' width={'274px'} height='20px'>Forgot my username</Link>

                <Link color='#2A69AC' fontSize='14px' width={'274px'} height='20px'>Reset my passord</Link>                                        
            </Flex>
        </Box>
    </Box>
        </Container>
       
    )
  }
}

export default SignIn