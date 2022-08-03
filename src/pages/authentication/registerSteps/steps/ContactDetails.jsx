import React, { useContext } from "react";

import {
  Text,
  Flex,
  InputLeftElement,
  InputGroup,
  Input,
  Button,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Tag } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";
import isEmail from "validator/lib/isEmail";
import { Field, Form, Formik } from "formik";

import { EmailCreation } from "../../../../service/cognitoAuth";
import { useStore } from "../../../../models/userStore";
import { TabsContext } from "../Steps";

function ContactDetails() {
  const tabsContext = useContext(TabsContext);
  const state = useStore();
  const { t } = useTranslation();

  function validateEmail(value) {
    return !isEmail(value) && value !== "";
  }

  async function onSubmit(values) {
    const res = await EmailCreation(values, state);

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
        initialValues={{ email: "" }}
        onSubmit={(values) => onSubmit(values)}
      >
        {() => (
          <Form>
            <Field name="email" validate={validateEmail}>
              {({ field, form }) => {
                const isButtonDisable =
                  form.values.email === "" || !isEmail(form.values.email);

                return (
                  <>
                    <FormControl isRequired isInvalid={form.errors.email}>
                      <FormLabel>
                        {t(
                          "common.authentication.register.steps.1.content.email.input.label"
                        )}
                      </FormLabel>
                      <InputGroup marginY={2}>
                        <InputLeftElement>
                          <Tag size="20" color="#A3A3A3" />
                        </InputLeftElement>
                        <Input
                          {...field}
                          placeholder={t(
                            "common.authentication.register.steps.1.content.email.input.placeholder"
                          )}
                        />
                      </InputGroup>
                      {form.errors.email ? (
                        <FormErrorMessage>
                          {t(
                            "common.authentication.register.steps.1.content.email.input.error"
                          )}
                        </FormErrorMessage>
                      ) : (
                        <FormHelperText color="blackAlpha.500">
                          {t(
                            "common.authentication.register.steps.1.content.email.input.helper"
                          )}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <Center marginTop={4}>
                      <Button type="submit" isDisabled={isButtonDisable}>
                        {t("common.submit")}
                      </Button>
                    </Center>
                  </>
                );
              }}
            </Field>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default ContactDetails;
