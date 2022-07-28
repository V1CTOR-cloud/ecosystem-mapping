import React from "react";

import {
  InputGroup,
  Button,
  InputLeftElement,
  Input,
  Flex,
  Text,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { Key } from "@styled-icons/boxicons-solid";

function EmailVerification() {
  const email = "alhasan.mhd.ali@gmail.com";

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>
        Create a CirclePass account to start using our apps and services
      </Text>
      <Text marginY={5}>
        We have sent an email to {email}, please copy the activation code here
        to activate your account.
      </Text>
      <Text>Verification Code</Text>
      <InputGroup marginY={2}>
        <InputLeftElement>
          <Key size="20" color="grey" />
        </InputLeftElement>
        <Input placeholder="123456" />
      </InputGroup>
      <Text color="blackAlpha.500">
        Enter the 6-digits verification code you have received.
      </Text>
      <Center marginTop={4}>
        <Button>Verify</Button>
      </Center>
      <Spacer />
    </Flex>
  );
}

export default EmailVerification;
