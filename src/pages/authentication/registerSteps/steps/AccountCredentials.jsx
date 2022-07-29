import React from "react";

import {
  Checkbox,
  InputGroup,
  Button,
  InputLeftElement,
  Text,
  Input,
  Box,
  Flex,
  HStack,
  Center,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Tag, Person, Unlock } from "@styled-icons/bootstrap";

function AccountCredentials() {
  const { t } = useTranslation();

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text marginBottom={3}>
        {t("common.authentication.register.steps.3.content.title")}
      </Text>
      <Box>
        <Text fontSize="md">
          {t(
            "common.authentication.register.steps.3.content.full.name.input.label"
          )}
        </Text>
        <HStack marginY={1}>
          <InputGroup marginRight={2}>
            <InputLeftElement>
              <Person size="20" color="grey" />
            </InputLeftElement>
            <Input
              placeholder={t(
                "common.authentication.register.steps.3.content.first.name.input.placeholder"
              )}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement>
              <Person size="20" color="grey" />
            </InputLeftElement>
            <Input
              placeholder={t(
                "common.authentication.register.steps.3.content.last.name.input.placeholder"
              )}
            />
          </InputGroup>
        </HStack>

        <Text color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.3.content.full.name.input.helper"
          )}
        </Text>
      </Box>
      <Box marginY={4}>
        <Text fontSize="md">
          {t(
            "common.authentication.register.steps.3.content.username.input.label"
          )}
        </Text>
        <InputGroup marginY={1}>
          <InputLeftElement>
            <Tag size="20" color="grey" />
          </InputLeftElement>
          <Input
            placeholder={t(
              "common.authentication.register.steps.3.content.username.input.label"
            )}
          />
        </InputGroup>
        <Text color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.3.content.username.input.helper"
          )}
        </Text>
      </Box>
      <Box>
        <Text fontSize="md">
          {t(
            "common.authentication.register.steps.3.content.password.input.label"
          )}
        </Text>
        <InputGroup marginY={1}>
          <InputLeftElement>
            <Unlock size="20" color="#A3A3A3" />
          </InputLeftElement>
          <Input
            type="password"
            placeholder={t(
              "common.authentication.register.steps.3.content.password.input.label"
            )}
          />
        </InputGroup>
        <Text color="blackAlpha.500">
          {t(
            "common.authentication.register.steps.3.content.password.input.helper"
          )}
        </Text>
      </Box>
      <HStack marginTop={4}>
        <Checkbox defaultChecked>
          <Text>
            {t(
              "common.authentication.register.steps.3.content.term.and.conditions"
            )}
          </Text>
        </Checkbox>
      </HStack>
      <Center marginTop={4}>
        <Button disabled>{t("common.register")}</Button>
      </Center>
    </Flex>
  );
}

export default AccountCredentials;
