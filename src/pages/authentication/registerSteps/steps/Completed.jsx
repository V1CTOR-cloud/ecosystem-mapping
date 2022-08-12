import React from "react";

import { Text, Flex, Center } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

function Completed() {
  const { t } = useTranslation();

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      <Text fontSize="xl" color="#98CE00">
        {t("common.authentication.register.steps.4.content.title")}
      </Text>
      <Text marginY={4}>
        {t("common.authentication.register.steps.4.content.subtitle")}
      </Text>
      <Center>
        <Text>
          {t("common.authentication.register.steps.4.content.subtitle.2")}
        </Text>
      </Center>
    </Flex>
  );
}

export default Completed;
