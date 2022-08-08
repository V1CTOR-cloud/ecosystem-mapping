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

import { getUserAttributes, signIn } from "../../service/cognitoAuth";
import AuthInput from "../../components/authentication/AuthInput";
import { useStore as userStore } from "../../models/userStore";

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
    const user = await getUserAttributes();
    updateLastName(user.family_name);
    updateFirstName(user.given_name);
    updateEmail(user.email);
    updateUsername(values.username);

    console.log(user);
    if (res === true) {
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
              <Center marginTop={5}>
                <Button type="submit" isDisabled={isButtonDisabled}>
                  {t("common.authentication.sign.in")}
                </Button>
              </Center>
            </Form>
          );
        }}
      </Formik>

      <HStack marginTop={4}>
        <Checkbox defaultChecked>
          <Text>{t("common.authentication.sign.in.remember.me")}</Text>
        </Checkbox>
      </HStack>

      <Spacer />
      <Center flexDirection="column">
        <Text paddingBottom={2}>
          {t("common.authentication.sign.in.problem")}
        </Text>
        <HStack>
          <Link color="brand.500" fontSize="md">
            {t("common.authentication.sign.in.forgot.username")}
          </Link>
          <Box paddingX={10}>
            <Box w="1px" h="20px" bg="brand.500" />
          </Box>
          <Link color="brand.500" fontSize="md">
            {t("common.authentication.sign.in.forgot.password")}
          </Link>
        </HStack>
      </Center>
    </Flex>
  );
}

export default SignIn;
