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

import { blueColor } from "../../../helper/constant";
import ContactDetails from "./steps/ContactDetails";
import EmailVerification from "./steps/EmailVerification";

function Steps() {
  return (
    <Tabs isFitted h="100%">
      <TabPanels h="92.5%">
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <ContactDetails />
          <Text>Provide your contact details to create a new account.</Text>
        </TabPanel>
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <EmailVerification />
          <Text>
            Verify your email address to continue to create a new account.
          </Text>
        </TabPanel>
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <p>three!</p>
          <Text>Fill your personal information to complete your account.</Text>
        </TabPanel>
        <TabPanel h="100%" paddingBottom={8} paddingLeft={0}>
          <p>four!</p>
          <Text>Account created, you can login with your credentials.</Text>
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
            <Text>STEP 1</Text>
            <Text>Contact Details</Text>
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
            <Text>STEP 2</Text>
            <Text>Email Verification</Text>
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
            <Text>STEP 3</Text>
            <Text>Account Credentials</Text>
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
            <Text>STEP 4</Text>
            <Text>Completed</Text>
          </VStack>
        </Tab>
      </TabList>
    </Tabs>
  );
}

export default Steps;
