import React, { useContext } from "react";

import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Person, Tag, Unlock } from "@styled-icons/bootstrap";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";

import { TabsContext } from "../Steps";
import { UpdateUserInfo } from "../../../../service/cognitoAuth";

function AccountCredentials() {
  const tabsContext = useContext(TabsContext);
  const { t } = useTranslation();

  async function onSubmit(values) {
    console.log(values);
    const res = UpdateUserInfo(values);
    console.log(res);
    // The account was created, we pass to the next steps
    if (res) {
      tabsContext[1](3);
    }
  }

  function validateFirstName(value) {
    return value.length <= 2 && value !== "";
  }

  function validateLastName(value) {
    return value.length <= 2 && value !== "";
  }

  function validateUsername(value) {
    return value.length <= 5 && value !== "";
  }

  function validatePassword(value) {
    return !isStrongPassword(value) && value !== "";
  }

  function validateTermsAndConditions(value) {
    return value === false;
  }

  /**
   * Check if the button needs to be disable or not.
   * @param values The values of the form inputs.
   * @return {boolean} True if the button needs to be disabled, false otherwise.
   */
  function isButtonDisabled(values) {
    // Store every validation field in a variable
    const isCheckBoxInvalid = !values.checkbox;
    const isUsernameInvalid =
      values.username === "" || values.username.length <= 5;
    const isLastNameInvalid =
      values.lastName === "" || values.lastName.length <= 2;
    const isFirstNameInvalid =
      values.firstName === "" || values.firstName.length <= 2;
    const isPasswordInvalid =
      values.password === "" || !isStrongPassword(values.password);

    // Check if all the fields are valid
    return (
      isUsernameInvalid ||
      isFirstNameInvalid ||
      isLastNameInvalid ||
      isPasswordInvalid ||
      isCheckBoxInvalid
    );
  }

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text marginBottom={3}>
        {t("common.authentication.register.steps.3.content.title")}
      </Text>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          password: "",
          username: "",
          checkbox: false,
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values }) => {
          const isButtonDisable = isButtonDisabled(values);

          return (
            <Form>
              <HStack marginY={1}>
                <Field name="firstName" validate={validateFirstName}>
                  {({ field, form }) => (
                    <FirstNameInput form={form} field={field} />
                  )}
                </Field>
                <Field name="lastName" validate={validateLastName}>
                  {({ field, form }) => (
                    <LastNameInput form={form} field={field} />
                  )}
                </Field>
              </HStack>
              <Box marginY={4}>
                <Field name="username" validate={validateUsername}>
                  {({ field, form }) => (
                    <UsernameInput form={form} field={field} />
                  )}
                </Field>
              </Box>
              <Field name="password" validate={validatePassword}>
                {({ field, form }) => (
                  <PasswordInput form={form} field={field} />
                )}
              </Field>

              <HStack marginTop={4}>
                <Field
                  type="checkbox"
                  name="checkbox"
                  validate={validateTermsAndConditions}
                >
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.checkbox}>
                      <Checkbox {...field}>
                        <Text>
                          {t(
                            "common.authentication.register.steps.3.content.term.and.conditions"
                          )}
                          <span style={{ color: "red" }}> *</span>
                        </Text>
                      </Checkbox>
                    </FormControl>
                  )}
                </Field>
              </HStack>
              <Center marginTop={4}>
                <Button isDisabled={isButtonDisable} type="submit">
                  {t("common.register")}
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default AccountCredentials;

function FirstNameInput({ form, field }) {
  const { t } = useTranslation();

  return (
    <FormControl isRequired isInvalid={form.errors.firstName}>
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
          {...field}
          placeholder={t(
            "common.authentication.register.steps.3.content.first.name.input.placeholder"
          )}
        />
      </InputGroup>
      {form.errors.firstName ? (
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

FirstNameInput.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
};

function LastNameInput({ form, field }) {
  const { t } = useTranslation();

  return (
    <FormControl isRequired isInvalid={form.errors.lastName}>
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
          {...field}
          placeholder={t(
            "common.authentication.register.steps.3.content.last.name.input.placeholder"
          )}
        />
      </InputGroup>
      {form.errors.lastName ? (
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

LastNameInput.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
};

function UsernameInput({ field, form }) {
  const { t } = useTranslation();

  return (
    <FormControl isRequired isInvalid={form.errors.username}>
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
          {...field}
          placeholder={t(
            "common.authentication.register.steps.3.content.username.input.label"
          )}
        />
      </InputGroup>
      {form.errors.username ? (
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

UsernameInput.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
};

function PasswordInput({ field, form }) {
  const { t } = useTranslation();

  return (
    <FormControl isRequired isInvalid={form.errors.password}>
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
          {...field}
          placeholder={t(
            "common.authentication.register.steps.3.content.password.input.label"
          )}
        />
      </InputGroup>
      {form.errors.password ? (
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

PasswordInput.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
};
