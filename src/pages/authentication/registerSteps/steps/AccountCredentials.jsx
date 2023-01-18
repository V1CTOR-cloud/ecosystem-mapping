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

import { TabsContext } from "../Steps";
import AuthInput from "../../../../components/authentication/AuthInput";
import { useStore as userStore } from "../../../../models/userStore";
import { useNavigate } from "react-router";
import { isNamesInvalid, validateNames } from "../../../../helper/constant";

function AccountCredentials() {
  const navigate = useNavigate();
  const tabsContext = useContext(TabsContext);
  const updateUserInfo = userStore((state) => state.updateUserInfo);
  const setIsAuthenticated = userStore((state) => state.setIsAuthenticated);
  //const updateIsLoggedIn = userStore((state) => state.updateIsLoggedIn);
  const { t } = useTranslation();

  async function onSubmit(values) {
    updateUserInfo(values).then((res) => {
      // The account was created, we pass to the next steps
      if (res === true) {
        // Set a timeout to let the time going to the step 4 and then update the isLoggedIn to true and redirect.
        setTimeout(() => {
          //updateIsLoggedIn(true);
          setIsAuthenticated(true);
          navigate("/dashboard/", { replace: true });
        }, 5000);

        tabsContext[1](3);
      }
    });
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
    // Check if all the fields are valid
    return (
      isNamesInvalid(values.firstName) ||
      isNamesInvalid(values.lastName) ||
      !values.checkbox
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
          checkbox: false,
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values }) => {
          const isButtonDisable = isButtonDisabled(values);

          return (
            <Form>
              <HStack marginY={1}>
                <Field name="firstName" validate={validateNames}>
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
                <Field name="lastName" validate={validateNames}>
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
