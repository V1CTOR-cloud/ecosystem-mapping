import React, { useState } from "react";

import {
  InputGroup,
  Button,
  InputLeftElement,
  Input,
  Flex,
  Text,
  Center,
  Spacer,
  FormHelperText,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Key } from "@styled-icons/boxicons-solid";
import { useTranslation } from "react-i18next";
import isNumeric from "validator/es/lib/isNumeric";

import { useStore } from "../../../../models/userStore";

function EmailVerification() {
  const { t } = useTranslation();
  const state = useStore();

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>{t("common.authentication.register.steps.1.content.title")}</Text>
      <Text marginY={5}>
        {t("common.authentication.register.steps.2.content.subtitle.1")}
        <span style={{ color: "#98CE00" }}> {state.email}</span>
        {t("common.authentication.register.steps.2.content.subtitle.2")}
      </Text>
      <VerificationCodeInput />
      <Center marginTop={4}>
        <Button>
          {t("common.authentication.register.steps.2.content.button")}
        </Button>
      </Center>
      <Spacer />
    </Flex>
  );
}

export default EmailVerification;

function VerificationCodeInput() {
  const [verificationCode, setVerificationCode] = useState("");
  const { t } = useTranslation();
  let isInvalid =
    (!isNumeric(verificationCode) || verificationCode.length !== 6) &&
    verificationCode !== "";

  function handleInputChange(e) {
    setVerificationCode(e.target.value);
  }

  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel>
        {t(
          "common.authentication.register.steps.2.content.verification.code.input.label"
        )}
      </FormLabel>
      <InputGroup marginY={2}>
        <InputLeftElement>
          <Key size="20" color="grey" />
        </InputLeftElement>
        <Input
          value={verificationCode}
          onChange={handleInputChange}
          placeholder={t(
            "common.authentication.register.steps.2.content.verification.code.input.placeholder"
          )}
        />
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage>
          Please enter a 6-digits code sent at your email address.
        </FormErrorMessage>
      ) : (
        <FormHelperText color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.2.content.verification.code.input.helper"
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
}
