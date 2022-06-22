import React from "react";

import { Image, Box, Flex } from "@chakra-ui/react";

import imgSource from "../../assets/images/LandingPageImage.png";

const DashboardImages = () => {
  return (
    <Flex>
      <Box flex="1">
        <Image width="70%" ml="auto" src={imgSource} alt="image" />
      </Box>
    </Flex>
  );
};

export default DashboardImages;
