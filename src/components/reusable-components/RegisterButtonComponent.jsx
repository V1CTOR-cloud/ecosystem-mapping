import React from 'react';
import { Button } from '@chakra-ui/react';
import styled from 'styled-components';

const RegisterButton = ({mobile,link}) => {
  
    const Section = styled.section`
    padding:5px;
    `;
  return (
    <Section>
      <Button onClick={()=>link!==undefined&&window.open(link)} className={mobile===true?"register-btn-mobile":"register-btn"} bg="register.100">
        Register
      </Button>
    </Section>
  );
};
export default RegisterButton;
