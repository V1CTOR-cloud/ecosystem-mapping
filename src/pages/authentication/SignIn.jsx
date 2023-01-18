import React from "react";

import {
  Flex,
  Box,
  Text,
  Center,
  Checkbox,
  Button,
  HStack,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { Tag, Unlock } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

import AuthInput from "../../components/authentication/AuthInput";
import { useStore as userStore } from "../../models/userStore";
import ToastComponent from "../../components/basic/ToastComponent";
import {
  isPasswordInvalid,
  isUsernameInvalid,
  validatePassword,
  validateUsername,
} from "../../helper/constant";

function SignIn({ setIndex }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const signIn = userStore((state) => state.signIn);

  // Sign in and if it was successful, we redirect to the dashboard.
  function onSubmit(values) {
    signIn(values, false).then((res) => {
      if (res === true) {
        navigate("/dashboard/", { replace: true });
      }
    });
  }

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text marginY={2.5}>
        {t("common.authentication.sign.in.explanation")}
      </Text>
      <Formik
        initialValues={{
          password: "",
          username: "",
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values }) => {
          const isButtonDisabled =
            isPasswordInvalid(values.password) ||
            isUsernameInvalid(values.username);

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
              <Box marginTop={4}>
                <Field name="password" validate={validatePassword}>
                  {({ field, form }) => {
                    return (
                      <AuthInput
                        field={field}
                        helper={t(
                          "common.authentication.sign.in.password.helper"
                        )}
                        label={t("common.authentication.sign.in.password")}
                        placeholder={t(
                          "common.authentication.sign.in.password.helper"
                        )}
                        error={t(
                          "common.authentication.register.steps.3.content.password.input.error"
                        )}
                        validation={form.errors.password}
                        icon={<Unlock size="20" color="#A3A3A3" />}
                        type={"password"}
                      />
                    );
                  }}
                </Field>
              </Box>
              <HStack marginTop={4}>
                <Checkbox defaultChecked>
                  <Text>{t("common.authentication.sign.in.remember.me")}</Text>
                </Checkbox>
              </HStack>
              <Center marginTop={5}>
                <Button type="submit" isDisabled={isButtonDisabled}>
                  {t("common.authentication.sign.in")}
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>
      <Spacer />
      <Center flexDirection="column">
        <Text paddingBottom={2}>
          {t("common.authentication.sign.in.problem")}
        </Text>
        <HStack>
          <Link
            color="brand.500"
            fontSize="md"
            onClick={() => ToastComponent("Not available for now!", "warning")}
          >
            {t("common.authentication.sign.in.forgot.username")}
          </Link>
          <Box paddingX={10}>
            <Box w="1px" h="20px" bg="brand.500" />
          </Box>
          {/* <Link color="brand.500" fontSize="md" onClick={() => setIndex(1)}> */}
          <Link color="brand.500" fontSize="md" onClick={() => ToastComponent("Not available for now!", "warning")}>
            {t("common.authentication.sign.in.forgot.password")}
          </Link>
        </HStack>
      </Center>
    </Flex>
  );
}

export default SignIn;

SignIn.propTypes = {
  setIndex: PropTypes.func.isRequired,
};
