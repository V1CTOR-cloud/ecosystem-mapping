import React from "react";

import { Box, Button, Center, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Key } from "@styled-icons/boxicons-solid";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";

import AuthInput from "../../../components/authentication/AuthInput";
import { Unlock } from "@styled-icons/feather";
import { useStore as userStore } from "../../../models/userStore";
import ToastComponent from "../../../components/basic/ToastComponent";
import {
  isCodeInvalid,
  isPasswordInvalid,
  validateConfirmationCode,
  validatePassword,
} from "../../../helper/constant";

export default function ResetPassword({ setIndex }) {
  const { t } = useTranslation();
  const forgotPasswordCodeVerification = userStore(
    (state) => state.forgotPasswordCodeVerification
  );

  function onSubmit(values) {
    // Check the validity of the verification code and redirect to the sign in page if it is valid.
    forgotPasswordCodeVerification(values).then((res) => {
      if (res === true) {
        setIndex(0);
        ToastComponent("Your password has been reset", "success", 5000);
      }
    });
  }

  return (
    <>
      <Text marginY={2.5} fontSize="xl">
        Reset Password
      </Text>
      <Formik
        initialValues={{
          code: "",
          password: "",
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values }) => {
          const isButtonDisabled =
            isPasswordInvalid(values.password) || isCodeInvalid(values.code);

          return (
            <Form>
              <Field name="code" validate={validateConfirmationCode}>
                {({ field, form }) => {
                  return (
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
                  );
                }}
              </Field>

              <Box marginTop={2.5}>
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
              </Box>
              <Center marginTop={5}>
                <Button type="submit" isDisabled={isButtonDisabled}>
                  Reset password
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

ResetPassword.propTypes = {
  setIndex: PropTypes.func.isRequired,
};
