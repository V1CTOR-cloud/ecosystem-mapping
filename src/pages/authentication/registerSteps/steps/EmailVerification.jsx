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
import { useTranslation } from "react-i18next";

function EmailVerification() {
  const { t } = useTranslation();
  const email = "alhasan.mhd.ali@gmail.com";

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>{t("common.authentication.register.steps.1.content.title")}</Text>
      <Text marginY={5}>
        {t("common.authentication.register.steps.2.content.subtitle.1")}
        <span style={{ color: "#98CE00" }}> {email}</span>
        {t("common.authentication.register.steps.2.content.subtitle.2")}
      </Text>
      <Text>
        {t(
          "common.authentication.register.steps.2.content.verification.code.input.label"
        )}
      </Text>
      <InputGroup marginY={2}>
        <InputLeftElement>
          <Key size="20" color="grey" />
        </InputLeftElement>
        <Input
          placeholder={t(
            "common.authentication.register.steps.2.content.verification.code.input.placeholder"
          )}
        />
      </InputGroup>
      <Text color="blackAlpha.500">
        {t(
          "common.authentication.register.steps.2.content.verification.code.input.helper"
        )}
      </Text>
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
