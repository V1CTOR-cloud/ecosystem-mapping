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
import isStrongPassword from "validator/es/lib/isStrongPassword";
import { useNavigate } from "react-router";

import { signIn } from "../../service/cognitoAuth";
import AuthInput from "../../components/authentication/AuthInput";
import { useStore as userStore } from "../../models/userStore";
import ToastComponent from "../../components/basic/ToastComponent";

function SignIn() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const updateIsLoggedIn = userStore((state) => state.updateIsLoggedIn);
  const updateFirstName = userStore((state) => state.updateFirstName);
  const updateLastName = userStore((state) => state.updateLastName);
  const updateUsername = userStore((state) => state.updateUsername);
  const updateEmail = userStore((state) => state.updateEmail);

  async function onSubmit(values) {
    const res = await signIn(values, updateIsLoggedIn);
    updateLastName(res.user.attributes.family_name);
    updateFirstName(res.user.attributes.given_name);
    updateEmail(res.user.attributes.email);
    updateUsername(res.user.username);

    if (res.value === true) {
      navigate("/dashboard/");
    }
  }

  function validateUsername(value) {
    return value.length <= 5 && value !== "";
  }

  function validatePassword(value) {
    return !isStrongPassword(value) && value !== "";
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
            values.password === "" ||
            !isStrongPassword(values.password) ||
            values.username === "" ||
            values.username.length <= 5;
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
          <Link
            color="brand.500"
            fontSize="md"
            onClick={() => ToastComponent("Not available for now!", "warning")}
          >
            {t("common.authentication.sign.in.forgot.password")}
          </Link>
        </HStack>
      </Center>
    </Flex>
  );
}

export default SignIn;
