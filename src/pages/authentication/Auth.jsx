import React from "react";

import {
  Box,
  HStack,
  Image,
  Flex,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Center,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import circlePassLogo from "../../assets/images/CirclepassLogo.png";
import SignIn from "./SignIn";
import Steps from "./registerSteps/Steps";

function Auth() {
  const { t } = useTranslation();

  return (
    <HStack w="100%" spacing={0}>
      <Flex w="50%" h="100%" paddingY={5} flexDirection="column">
        <Center>
          <Image w="250px" objectFit="scale-down" src={circlePassLogo} />
        </Center>
        <Box flex="1">
          <Tabs h="100%">
            <TabList>
              <Tab
                w="100%"
                color="blackAlpha.500"
                _selected={{ color: "brand.500", borderColor: "brand.500" }}
              >
                {t("common.authentication.sign.in.upper.case")}
              </Tab>
              <Tab
                w="100%"
                color="blackAlpha.500"
                _selected={{ color: "brand.500", borderColor: "brand.500" }}
              >
                {t("common.authentication.register")}
              </Tab>
            </TabList>
            <TabPanels h="95%">
              <TabPanel h="100%">
                <SignIn />
              </TabPanel>
              <TabPanel h="100%">
                <Steps />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Box w="50%" h="100%" bg="brand.500" />
    </HStack>
  );
}

export default Auth;
