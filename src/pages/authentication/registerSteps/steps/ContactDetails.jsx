import React from "react";

import {
  Text,
  Flex,
  InputLeftElement,
  InputGroup,
  Input,
  Button,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Tag } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";
import isEmail from "validator/lib/isEmail";

import { useStore } from "../../../../models/userStore";

function ContactDetails() {
  const { t } = useTranslation();
  const state = useStore();

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>{t("common.authentication.register.steps.1.content.title")}</Text>
      <Text marginY={4}>
        {t("common.authentication.register.steps.1.content.subtitle")}
      </Text>
      <EmailInput />
      <Center marginTop={4}>
        <Button
          onClick={() => {
            const isInvalid = !isEmail(state.email);
            if (isInvalid) {
              console.log("invalid");
            } else {
              console.log("ok");
            }
          }}
        >
          {t("common.submit")}
        </Button>
      </Center>
    </Flex>
  );
}
export default ContactDetails;

function EmailInput() {
  const { t } = useTranslation();
  const state = useStore();
  // Check every render if the email is valid and not empty to display the error message.
  const isInvalid = !isEmail(state.email) && state.email !== "";

  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel>
        {t("common.authentication.register.steps.1.content.email.input.label")}
      </FormLabel>
      <InputGroup marginY={2}>
        <InputLeftElement>
          <Tag size="20" color="#A3A3A3" />
        </InputLeftElement>
        <Input
          value={state.email}
          onChange={(e) => {
            state.updateEmail(e.target.value);
          }}
          placeholder={t(
            "common.authentication.register.steps.1.content.email.input.placeholder"
          )}
        />
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage>
          {t(
            "common.authentication.register.steps.1.content.email.input.error"
          )}
        </FormErrorMessage>
      ) : (
        <FormHelperText color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.1.content.email.input.helper"
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
}
