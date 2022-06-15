import React from "react";

import { Box, Flex, Grid, SimpleGrid, VStack } from "@chakra-ui/react";

import NavigationBarLandingPage from "../components/bar/navigationBar/NavigationBarLandingPage";
import DashboardImages from "../components/miscellaneousComponents/DashboardImages";
import AddMapModal from "components/miscellaneousComponents/AddMapModal";

const LandingPage = () => {
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
            <AddMapModal isAdd={false} isEdit={false} />
          </Box>
          <Box bg="#EEF4F6.500" flex="1">
            <DashboardImages />
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
