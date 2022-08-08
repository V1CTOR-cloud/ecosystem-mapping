import React, { useContext } from "react";

import {
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Person } from "@styled-icons/bootstrap";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";

import { TabsContext } from "../Steps";
import { updateUserInfo } from "../../../../service/cognitoAuth";
import AuthInput from "../../../../components/authentication/AuthInput";
import { useStore as userStore } from "../../../../models/userStore";

function AccountCredentials() {
  const navigate = useNavigate();
  const tabsContext = useContext(TabsContext);
  const updateFirstName = userStore((state) => state.updateFirstName);
  const updateLastName = userStore((state) => state.updateLastName);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const { t } = useTranslation();

  async function onSubmit(values) {
    const res = await updateUserInfo(values, updateFirstName, updateLastName);

    // The account was created, we pass to the next steps
    if (res === true) {
      if (isLoggedIn) {
        setTimeout(() => {
          navigate("/dashboard/");
        }, 2500);
      }

      tabsContext[1](3);
    }
  }

  function validateFirstName(value) {
    return value.length <= 2 && value !== "";
  }

  function validateLastName(value) {
    return value.length <= 2 && value !== "";
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
    const isLastNameInvalid =
      values.lastName === "" || values.lastName.length <= 2;
    const isFirstNameInvalid =
      values.firstName === "" || values.firstName.length <= 2;

    // Check if all the fields are valid
    return isFirstNameInvalid || isLastNameInvalid || isCheckBoxInvalid;
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
                    <AuthInput
                      field={field}
                      helper={t(
                        "common.authentication.register.steps.3.content.first.name.input.helper"
                      )}
                      label={t(
                        "common.authentication.register.steps.3.content.first.name.input.placeholder"
                      )}
                      placeholder={t(
                        "common.authentication.register.steps.3.content.first.name.input.placeholder"
                      )}
                      error={t(
                        "common.authentication.register.steps.3.content.first.name.input.error"
                      )}
                      validation={form.errors.firstName}
                      icon={<Person size="20" color="grey" />}
                    />
                  )}
                </Field>
                <Field name="lastName" validate={validateLastName}>
                  {({ field, form }) => (
                    <AuthInput
                      field={field}
                      helper={t(
                        "common.authentication.register.steps.3.content.last.name.input.helper"
                      )}
                      label={t(
                        "common.authentication.register.steps.3.content.last.name.input.placeholder"
                      )}
                      placeholder={t(
                        "common.authentication.register.steps.3.content.last.name.input.placeholder"
                      )}
                      error={t(
                        "common.authentication.register.steps.3.content.last.name.input.error"
                      )}
                      validation={form.errors.lastName}
                      icon={<Person size="20" color="grey" />}
                    />
                  )}
                </Field>
              </HStack>
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
