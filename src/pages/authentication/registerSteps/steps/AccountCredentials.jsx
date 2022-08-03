import React, { useState } from "react";

import {
  Checkbox,
  InputGroup,
  Button,
  InputLeftElement,
  Text,
  Input,
  Box,
  Flex,
  HStack,
  Center,
  FormHelperText,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Tag, Person, Unlock } from "@styled-icons/bootstrap";

import { useStore } from "../../../../models/userStore";
import isStrongPassword from "validator/es/lib/isStrongPassword";

function AccountCredentials() {
  const { t } = useTranslation();

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text marginBottom={3}>
        {t("common.authentication.register.steps.3.content.title")}
      </Text>
      <HStack marginY={1}>
        <FirstNameInput />
        <LastNameInput />
      </HStack>
      <Box marginY={4}>
        <UsernameInput />
      </Box>
      <PasswordInput />
      <HStack marginTop={4}>
        <FormControl isInvalid={true}>
          <Checkbox>
            <Text>
              <span style={{ color: "red" }}>* </span>
              {t(
                "common.authentication.register.steps.3.content.term.and.conditions"
              )}
            </Text>
          </Checkbox>
        </FormControl>
      </HStack>
      <Center marginTop={4}>
        <Button disabled>{t("common.register")}</Button>
      </Center>
    </Flex>
  );
}

export default AccountCredentials;

function FirstNameInput() {
  const { t } = useTranslation();
  const state = useStore();

  const isInvalid = state.firstName !== "" && state.firstName.length <= 2;

  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel>
        {t(
          "common.authentication.register.steps.3.content.first.name.input.placeholder"
        )}
      </FormLabel>
      <InputGroup marginRight={2}>
        <InputLeftElement>
          <Person size="20" color="grey" />
        </InputLeftElement>
        <Input
          value={state.firstName}
          onChange={(e) => state.updateFirstName(e.target.value)}
          placeholder={t(
            "common.authentication.register.steps.3.content.first.name.input.placeholder"
          )}
        />
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage>
          {t(
            "common.authentication.register.steps.3.content.first.name.input.error"
          )}
        </FormErrorMessage>
      ) : (
        <FormHelperText color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.3.content.first.name.input.helper"
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
}

function LastNameInput() {
  const { t } = useTranslation();
  const state = useStore();

  const isInvalid = state.lastName !== "" && state.lastName.length <= 2;

  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel>
        {t(
          "common.authentication.register.steps.3.content.last.name.input.placeholder"
        )}
      </FormLabel>
      <InputGroup marginRight={2}>
        <InputLeftElement>
          <Person size="20" color="grey" />
        </InputLeftElement>
        <Input
          value={state.lastName}
          onChange={(e) => state.updateLastName(e.target.value)}
          placeholder={t(
            "common.authentication.register.steps.3.content.last.name.input.placeholder"
          )}
        />
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage>
          {t(
            "common.authentication.register.steps.3.content.last.name.input.error"
          )}
        </FormErrorMessage>
      ) : (
        <FormHelperText color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.3.content.last.name.input.helper"
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
}

function UsernameInput() {
  const { t } = useTranslation();
  const state = useStore();

  const isInvalid = state.username !== "" && state.username.length <= 2;

  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel>
        {t(
          "common.authentication.register.steps.3.content.username.input.label"
        )}
      </FormLabel>
      <InputGroup marginY={1}>
        <InputLeftElement>
          <Tag size="20" color="grey" />
        </InputLeftElement>
        <Input
          value={state.username}
          onChange={(e) => state.updateUsername(e.target.value)}
          placeholder={t(
            "common.authentication.register.steps.3.content.username.input.label"
          )}
        />
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage>
          {t(
            "common.authentication.register.steps.3.content.username.input.error"
          )}
        </FormErrorMessage>
      ) : (
        <FormHelperText color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.3.content.username.input.helper"
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
}

function PasswordInput() {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  let isInvalid = !isStrongPassword(password) && password !== "";

  return (
    <FormControl isRequired isInvalid={isInvalid}>
      <FormLabel>
        {t(
          "common.authentication.register.steps.3.content.password.input.label"
        )}
      </FormLabel>
      <InputGroup marginY={1}>
        <InputLeftElement>
          <Unlock size="20" color="grey" />
        </InputLeftElement>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t(
            "common.authentication.register.steps.3.content.password.input.label"
          )}
        />
      </InputGroup>
      {isInvalid ? (
        <FormErrorMessage>
          {t(
            "common.authentication.register.steps.3.content.password.input.error"
          )}
        </FormErrorMessage>
      ) : (
        <FormHelperText color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.3.content.password.input.helper"
          )}
        </FormHelperText>
      )}
    </FormControl>
  );
}
