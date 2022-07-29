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
import { useTranslation } from "react-i18next";

function ContactDetails() {
  const { t } = useTranslation();
  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>{t("common.authentication.register.steps.1.content.title")}</Text>
      <Text marginY={4}>
        {t("common.authentication.register.steps.1.content.subtitle")}
      </Text>
      <Text fontSize="md">
        {t("common.authentication.register.steps.1.content.email.input.label")}
      </Text>
      <InputGroup marginY={2}>
        <InputLeftElement>
          <Tag size="20" color="#A3A3A3" />
        </InputLeftElement>
        <Input
          placeholder={t(
            "common.authentication.register.steps.1.content.email.input.placeholder"
          )}
        />
      </InputGroup>
      <Text color="blackAlpha.500">
        {t("common.authentication.register.steps.1.content.email.input.helper")}
      </Text>
      <Center marginTop={4}>
        <Button>{t("common.submit")}</Button>
      </Center>
    </Flex>
  );
}

export default ContactDetails;
