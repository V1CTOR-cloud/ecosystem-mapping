import React, { useContext } from "react";

import {
  InputGroup,
  Button,
  InputLeftElement,
  Input,
  Flex,
  Text,
  Center,
  Spacer,
  FormHelperText,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Key } from "@styled-icons/boxicons-solid";
import { useTranslation } from "react-i18next";
import isNumeric from "validator/es/lib/isNumeric";
import { Field, Form, Formik } from "formik";

import { useStore } from "../../../../models/userStore";
import { TabsContext } from "../Steps";
import { emailCodeVerification, signIn } from "../../../../service/cognitoAuth";

function EmailVerification() {
  const tabsContext = useContext(TabsContext);
  const { t } = useTranslation();
  const state = useStore();

  function validateConfirmationCode(value) {
    return !isNumeric(value) || value.length !== 6;
  }

  async function onSubmit(values) {
    await emailCodeVerification(values);

    const res = await signIn({ username: state.username });

    console.log(res);

    // The account was created, we pass to the next steps
    if (res === true) {
      tabsContext[1](2);
    }
  }

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text>{t("common.authentication.register.steps.1.content.title")}</Text>
      <Text marginY={5}>
        {t("common.authentication.register.steps.2.content.subtitle.1")}
        <span style={{ color: "#98CE00" }}> {state.email}</span>
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
                    <FormControl isRequired isInvalid={form.errors.code}>
                      <FormLabel>
                        {t(
                          "common.authentication.register.steps.2.content.verification.code.input.label"
                        )}
                      </FormLabel>
                      <InputGroup marginY={2}>
                        <InputLeftElement>
                          <Key size="20" color="#A3A3A3" />
                        </InputLeftElement>
                        <Input
                          {...field}
                          placeholder={t(
                            "common.authentication.register.steps.2.content.verification.code.input.placeholder"
                          )}
                        />
                      </InputGroup>
                      {form.errors.code ? (
                        <FormErrorMessage>
                          Please enter a 6-digits code sent at your email
                          address.
                        </FormErrorMessage>
                      ) : (
                        <FormHelperText color="blackAlpha.500">
                          {t(
                            "common.authentication.register.steps.2.content.verification.code.input.helper"
                          )}
                        </FormHelperText>
                      )}
                    </FormControl>
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
