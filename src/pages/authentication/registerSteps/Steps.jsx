import React from "react";

import {
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  VStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { blueColor } from "../../../helper/constant";
import ContactDetails from "./steps/ContactDetails";
import EmailVerification from "./steps/EmailVerification";
import AccountCredentials from "./steps/AccountCredentials";
import Completed from "./steps/Completed";

function Steps() {
  const { t } = useTranslation();

  return (
    <Tabs isFitted h="100%">
      <TabPanels h="92.5%">
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <ContactDetails />
          <Text>{t("common.authentication.register.steps.1.text")}</Text>
        </TabPanel>
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <EmailVerification />
          <Text>{t("common.authentication.register.steps.2.text")}</Text>
        </TabPanel>
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <AccountCredentials />
          <Text>{t("common.authentication.register.steps.3.text")}</Text>
        </TabPanel>
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <Completed />
          <Text>{t("common.authentication.register.steps.4.text")}</Text>
        </TabPanel>
      </TabPanels>
      <TabList borderTop="2px solid #e2e8f0" borderBottom="none">
        <Tab
          padding="10px 0 0 0"
          borderBottom="none"
          _selected={{
            marginTop: "-2px",
            borderTop: `3px solid ${blueColor}`,
            borderBottom: "none",
          }}
        >
          <VStack spacing={0} align="start" w="100%">
            <Text>{t("common.authentication.register.steps.1")}</Text>
            <Text>{t("common.authentication.register.steps.1.details")}</Text>
          </VStack>
        </Tab>
        <Tab
          padding="10px 0 0 0"
          borderBottom="none"
          _selected={{
            marginTop: "-2px",
            borderTop: `3px solid ${blueColor}`,
            borderBottom: "none",
          }}
        >
          <VStack spacing={0} align="start">
            <Text>{t("common.authentication.register.steps.2")}</Text>
            <Text>{t("common.authentication.register.steps.2.details")}</Text>
          </VStack>
        </Tab>
        <Tab
          padding="10px 0 0 0"
          borderBottom="none"
          _selected={{
            marginTop: "-2px",
            borderTop: `3px solid ${blueColor}`,
            borderBottom: "none",
          }}
        >
          <VStack spacing={0} align="start">
            <Text>{t("common.authentication.register.steps.3")}</Text>
            <Text>{t("common.authentication.register.steps.3.details")}</Text>
          </VStack>
        </Tab>
        <Tab
          padding="10px 0 0 0"
          borderBottom="none"
          _selected={{
            marginTop: "-2px",
            borderTop: `3px solid ${blueColor}`,
            borderBottom: "none",
          }}
        >
          <VStack spacing={0} align="start">
            <Text>{t("common.authentication.register.steps.4")}</Text>
            <Text>{t("common.authentication.register.steps.4.details")}</Text>
          </VStack>
        </Tab>
      </TabList>
    </Tabs>
  );
}

export default Steps;
