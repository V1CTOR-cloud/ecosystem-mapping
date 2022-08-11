import React from "react";

import { Button, Center, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

import email from "../../../assets/images/Email.png";

export default function CodeSend({ setIndex }) {
  return (
    <>
      <Text marginY={2.5} fontSize="xl">
        Reset Password
      </Text>
      <Center marginY={4}>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={email}
          alt="email send image"
        />
      </Center>
      <Text>
        An email have been sent to the inbox attached with your account with a
        code to reset your password.
      </Text>
      <Center marginTop={2.5}>
        <Button onClick={() => setIndex(2)}>Set my new password</Button>
      </Center>
    </>
  );
}

CodeSend.propTypes = {
  setIndex: PropTypes.func.isRequired,
};
