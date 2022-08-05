import React, { useContext } from "react";

import { Text, Flex, Button, Center, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import isEmail from "validator/lib/isEmail";
import { Field, Form, Formik } from "formik";
import { Tag } from "@styled-icons/bootstrap";
import { Email } from "@styled-icons/material-outlined";

import { accountCreation } from "../../../../service/cognitoAuth";
import { useStore } from "../../../../models/userStore";
import { TabsContext } from "../Steps";
import AuthInput from "../../../../components/authentication/AuthInput";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import { Unlock } from "@styled-icons/feather";

function ContactDetails() {
  const tabsContext = useContext(TabsContext);
  const state = useStore();
  const { t } = useTranslation();

  function validateEmail(value) {
    return !isEmail(value) && value !== "";
  }

  function validateUsername(value) {
    return value.length <= 5 && value !== "";
  }

  function validatePassword(value) {
    return !isStrongPassword(value) && value !== "";
  }

  async function onSubmit(values) {
    const res = await accountCreation(values, state);

    // The account was created, we pass to the next steps
    if (res) {
      tabsContext[1](1);
    }
  }

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>{t("common.authentication.register.steps.1.content.title")}</Text>
      <Text marginY={4}>
        {t("common.authentication.register.steps.1.content.subtitle")}
      </Text>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values }) => {
          const isUsernameInvalid =
            values.username === "" || values.username.length <= 5;
          const isEmailInvalid = values.email === "" || !isEmail(values.email);
          const isPasswordInvalid =
            values.password === "" || !isStrongPassword(values.password);

          const isButtonDisable =
            isEmailInvalid || isUsernameInvalid || isPasswordInvalid;

          return (
            <Form>
              <Field name="username" validate={validateUsername}>
                {({ field, form }) => {
                  return (
                    <AuthInput
                      field={field}
                      form={form}
                      helper={t(
                        "common.authentication.register.steps.3.content.username.input.helper"
                      )}
                      label={t(
                        "common.authentication.register.steps.3.content.username.input.label"
                      )}
                      placeholder={t(
                        "common.authentication.register.steps.3.content.username.input.label"
                      )}
                      error={t(
                        "common.authentication.register.steps.3.content.username.input.error"
                      )}
                      validation={form.errors.username}
                      icon={<Tag size="20" color="#A3A3A3" />}
                    />
                  );
                }}
              </Field>
              <Box marginY={3}>
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => {
                    return (
                      <AuthInput
                        field={field}
                        form={form}
                        helper={t(
                          "common.authentication.register.steps.1.content.email.input.helper"
                        )}
                        label={t(
                          "common.authentication.register.steps.1.content.email.input.label"
                        )}
                        placeholder={t(
                          "common.authentication.register.steps.1.content.email.input.placeholder"
                        )}
                        error={t(
                          "common.authentication.register.steps.1.content.email.input.error"
                        )}
                        validation={form.errors.email}
                        icon={<Email size="20" color="#A3A3A3" />}
                      />
                    );
                  }}
                </Field>
              </Box>
              <Field name="password" validate={validatePassword}>
                {({ field, form }) => {
                  return (
                    <AuthInput
                      field={field}
                      form={form}
                      helper={t(
                        "common.authentication.register.steps.3.content.password.input.helper"
                      )}
                      label={t(
                        "common.authentication.register.steps.3.content.password.input.label"
                      )}
                      placeholder={t(
                        "common.authentication.register.steps.3.content.password.input.label"
                      )}
                      error={t(
                        "common.authentication.register.steps.3.content.password.input.error"
                      )}
                      validation={form.errors.password}
                      icon={<Unlock size="20" color="grey" />}
                      type={"password"}
                    />
                  );
                }}
              </Field>
              <Center marginTop={4}>
                <Button type="submit" isDisabled={isButtonDisable}>
                  {t("common.submit")}
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default ContactDetails;
