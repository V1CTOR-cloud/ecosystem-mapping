import React, { useContext } from "react";

import { Button, Flex, Text, Center, Spacer } from "@chakra-ui/react";
import { Key } from "@styled-icons/boxicons-solid";
import { useTranslation } from "react-i18next";
import isNumeric from "validator/es/lib/isNumeric";
import { Field, Form, Formik } from "formik";

import { useStore as userStore } from "../../../../models/userStore";
import { TabsContext } from "../Steps";
import AuthInput from "../../../../components/authentication/AuthInput";

function EmailVerification() {
  const tabsContext = useContext(TabsContext);
  const { t } = useTranslation();

  const username = userStore((state) => state.username);
  const email = userStore((state) => state.email);
  const signIn = userStore((state) => state.signIn);
  const emailCodeVerification = userStore(
    (state) => state.emailCodeVerification
  );

  function validateConfirmationCode(value) {
    return !isNumeric(value) || value.length !== 6;
  }

  async function onSubmit(values) {
    await emailCodeVerification(values);

    signIn({ username: username }, true).then((res) => {
      // The account was created, we pass to the next steps
      if (res === true) {
        tabsContext[1](2);
      }
    });
  }

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>{t("common.authentication.register.steps.1.content.title")}</Text>
      <Text marginY={5}>
        {t("common.authentication.register.steps.2.content.subtitle.1")}
        <span style={{ color: "#98CE00" }}> {email}</span>
        {t("common.authentication.register.steps.2.content.subtitle.2")}
      </Text>
      <Formik
        initialValues={{ code: "" }}
        onSubmit={(values) => onSubmit(values)}
      >
        {() => (
          <Form>
            <Field name="code" validate={validateConfirmationCode}>
              {({ field, form }) => {
                const isButtonDisable =
                  form.values.code === "" ||
                  !isNumeric(form.values.code) ||
                  form.values.code.length !== 6;

                return (
                  <>
                    <AuthInput
                      field={field}
                      helper={t(
                        "common.authentication.register.steps.2.content.verification.code.input.helper"
                      )}
                      label={t(
                        "common.authentication.register.steps.2.content.verification.code.input.label"
                      )}
                      placeholder={t(
                        "common.authentication.register.steps.2.content.verification.code.input.placeholder"
                      )}
                      error={
                        "Please enter a 6-digits code sent at your email address."
                      }
                      validation={form.errors.code}
                      icon={<Key size="20" color="#A3A3A3" />}
                    />
                    <Center marginTop={4}>
                      <Button type="submit" isDisabled={isButtonDisable}>
                        {t(
                          "common.authentication.register.steps.2.content.button"
                        )}
                      </Button>
                    </Center>
                  </>
                );
              }}
            </Field>
          </Form>
        )}
      </Formik>
      <Spacer />
    </Flex>
  );
}

export default EmailVerification;
