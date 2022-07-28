import React from "react";

import {
  Text,
  Flex,
  InputLeftElement,
  InputGroup,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { Tag } from "@styled-icons/bootstrap";

function ContactDetails() {
  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>
        Create a CirclePass account to start using our apps and services
      </Text>
      <Text marginY={4}>
        Fill in your primary email address which will be used as the main
        address for communication and notifications.
      </Text>
      <Text fontSize="md">Email Address</Text>
      <InputGroup marginY={2}>
        <InputLeftElement pointerEvents="none">
          <Tag size="20" color="#A3A3A3" />
        </InputLeftElement>
        <Input placeholder="name@example.com" />
      </InputGroup>
      <Text color="blackAlpha.500">
        Enter your email address, a confirmation code will be sent.
      </Text>
      <Center marginTop={4}>
        <Button>Submit</Button>
      </Center>
    </Flex>
  );
}

export default ContactDetails;
