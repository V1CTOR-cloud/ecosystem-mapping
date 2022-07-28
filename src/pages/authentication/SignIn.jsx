import React from "react";

import {
  Flex,
  Box,
  Text,
  Center,
  Checkbox,
  Button,
  InputGroup,
  Input,
  HStack,
  Link,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import { Tag, Unlock } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";

function SignIn() {
  const { t } = useTranslation();

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text marginY={2.5}>
        {t("common.authentication.sign.in.explanation")}
      </Text>
      <Text fontSize="md">{t("common.authentication.sign.in.username")}</Text>
      <InputGroup marginY={2}>
        <InputLeftElement>
          <Tag size="20" color="grey" />
        </InputLeftElement>
        <Input placeholder={t("common.authentication.sign.in.username")} />
      </InputGroup>
      <Text color="blackAlpha.500">
        {t("common.authentication.sign.in.username.helper")}
      </Text>
      <Box marginTop={4}>
        <Text fontSize="md">
          {t("common.authentication.sign.in.password.helper")}
        </Text>
        <InputGroup marginY={2}>
          <InputLeftElement>
            <Unlock color="grey" size="20" />
          </InputLeftElement>
          <Input
            type="Password"
            placeholder={t("common.authentication.sign.in.password.helper")}
          />
        </InputGroup>
        <Text color="blackAlpha.500">
          {t("common.authentication.sign.in.password.helper")}
        </Text>
      </Box>
      <HStack marginTop={4}>
        <Checkbox defaultChecked>
          <Text>{t("common.authentication.sign.in.remember.me")}</Text>
        </Checkbox>
      </HStack>
      <Center marginTop={5}>
        <Button>{t("common.authentication.sign.in")}</Button>
      </Center>
      <Spacer />
      <Center flexDirection="column">
        <Text paddingBottom={2}>
          {t("common.authentication.sign.in.problem")}
        </Text>
        <HStack>
          <Link color="brand.500" fontSize="md">
            {t("common.authentication.sign.in.forgot.username")}
          </Link>
          <Box paddingX={10}>
            <Box w="1px" h="20px" bg="brand.500" />
          </Box>
          <Link color="brand.500" fontSize="md">
            {t("common.authentication.sign.in.forgot.password")}
          </Link>
        </HStack>
      </Center>
    </Flex>
  );
}

export default SignIn;
