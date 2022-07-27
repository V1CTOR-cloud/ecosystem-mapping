import React from "react";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Text,
} from "@chakra-ui/react";
import Authentication from "../../authentication/Authentication";
import { useTranslation } from "react-i18next";

const headerStyle = {
  fontFamily: "Ubuntu",
  fontSize: "20px",
  textShadow: "2px 2px 8px #afaebc",
};

const NavigationBarLandingPage = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Flex>
        <Box w="80%" m="15px">
          <Breadcrumb separator="" pt="5" pb="5">
            <BreadcrumbItem ml="0">
              <Text style={headerStyle}>
                {t("mapping.landing.navigation.title")}
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box w="20%" mt="30px">
          <Authentication />
        </Box>
      </Flex>
    </Box>
  );
};

export default NavigationBarLandingPage;
