import React, { useContext } from "react";

import { Text, Flex, Button, Center, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import { Tag } from "@styled-icons/bootstrap";
import { Email } from "@styled-icons/material-outlined";

import { useStore as userStore } from "../../../../models/userStore";
import { TabsContext } from "../Steps";
import AuthInput from "../../../../components/authentication/AuthInput";
import { Unlock } from "@styled-icons/feather";
import {
  isEmailInvalid,
  isPasswordInvalid,
  isUsernameInvalid,
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../../helper/constant";

function ContactDetails() {
  const tabsContext = useContext(TabsContext);
  const createAccount = userStore((state) => state.createAccount);
  const { t } = useTranslation();

  async function onSubmit(values) {
    createAccount(values).then((res) => {
      // The account was created, we pass to the next steps
      if (res === true) {
        tabsContext[1](1);
      }
    });
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
          const isButtonDisable =
            isEmailInvalid(values.email) ||
            isUsernameInvalid(values.username) ||
            isPasswordInvalid(values.password);

          return (
            <Form>
              <Field name="username" validate={validateUsername}>
                {({ field, form }) => {
                  return (
                    <AuthInput
                      field={field}
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
