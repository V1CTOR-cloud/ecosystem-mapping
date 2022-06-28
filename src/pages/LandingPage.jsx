import React from "react";

import { Box, Flex, Grid, SimpleGrid, VStack, Image } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import NavigationBarLandingPage from "../components/bar/navigationBar/NavigationBarLandingPage";
import imgSource from "../assets/images/LandingPageImage.png";

const headerStyle = {
  fontFamily: "Ubuntu",
  fontSize: "64px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "90px",
  letterSpacing: "0em",
  textAlign: "left",
};

const hTagStyle = {
  fontFamily: "Ubuntu",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "28px",
  letterSpacing: "0em",
  textAlign: "left",
  mt: "24px",
};

const LandingPage = () => {
  const { t } = useTranslation();
  return (
    <Box className="wrapper">
      <VStack spacing={8} align="start">
        <Grid className="topNav">
          <NavigationBarLandingPage />
        </Grid>
        <Flex justifyContent="start" alignItems="start" width="100%" mt="90px">
          <Box
            w="33.33%"
            alignSelf="center"
            justifySelf="center"
            bg="#EEF4F6.500"
          >
            <h1 style={headerStyle}>
              {t("startup.landing.page.content.welcome.message")}
            </h1>
            <h1 style={hTagStyle}>
              {t("startup.landing.page.content.welcome.tagline.text")}
            </h1>
          </Box>
          <Box bg="#EEF4F6.500" flex="1">
            <Image width="70%" ml="auto" src={imgSource} alt="image" />
          </Box>
        </Flex>
        <SimpleGrid>
          <Box
            w="66.66%"
            alignSelf="center"
            justifySelf="center"
            bg="#EEF4F6.500"
          />
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default LandingPage;
