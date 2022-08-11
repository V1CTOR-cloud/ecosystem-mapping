import React from "react";

import { Button, Center, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Tag } from "@styled-icons/bootstrap";

import AuthInput from "../../../components/authentication/AuthInput";
import { useTranslation } from "react-i18next";
import { useStore as userStore } from "../../../models/userStore";
import PropTypes from "prop-types";
import { isUsernameInvalid, validateUsername } from "../../../helper/constant";

export default function UsernameInformation({ setIndex }) {
  const { t } = useTranslation();
  const forgotPassword = userStore(
    (state) => state.forgotPasswordUsernameInformation
  );

  // Sign in and if it was successful, we redirect to the dashboard.
  function onSubmit(values) {
    forgotPassword(values).then((res) => {
      if (res === true) {
        setIndex(1);
      }
    });
  }

  return (
    <>
      <Text marginY={2.5} fontSize="xl">
        {t("common.authentication.forgot.password.reset.title")}
      </Text>
      <Text marginBottom={2.5}>
        {t("common.authentication.forgot.password.reset.description")}
      </Text>
      <Formik
        initialValues={{
          username: "",
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values }) => {
          const isButtonDisabled = isUsernameInvalid(values.username);
          return (
            <Form>
              <Field name="username" validate={validateUsername}>
                {({ field, form }) => {
                  return (
                    <AuthInput
                      field={field}
                      helper={t(
                        "common.authentication.sign.in.username.helper"
                      )}
                      label={t("common.authentication.sign.in.username")}
                      placeholder={t("common.authentication.sign.in.username")}
                      error={t(
                        "common.authentication.register.steps.3.content.username.input.error"
                      )}
                      validation={form.errors.username}
                      icon={<Tag size="20" color="#A3A3A3" />}
                    />
                  );
                }}
              </Field>
              <Center marginTop={5}>
                <Button type="submit" isDisabled={isButtonDisabled}>
                  {t("common.confirm")}
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

UsernameInformation.propTypes = {
  setIndex: PropTypes.func.isRequired,
};
