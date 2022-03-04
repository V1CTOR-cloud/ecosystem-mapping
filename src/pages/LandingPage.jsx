import React, { useEffect } from "react";
import { Box, VStack, Grid, SimpleGrid } from "@chakra-ui/react";
import NavBar from "../components/miscellaneousComponents/NavBar";
import DashboardImages from "../components/miscellaneousComponents/DashboardImages";
import { Flex } from "@chakra-ui/react";
import AddMapModal from "components/miscellaneousComponents/AddMapModal";
import Service from "../service/RegionServices";
//import {isLoggedIn} from "../service/AuthenticationService"

const LandingPage = () => {
   useEffect(() => {
    Service.listAllRegions();
    Service.listAllIndustries();
  });
// const notified = () => {
//   isLoggedIn()
//   window.location.reload()
// }
  return (
    <>
      <Box className="wrapper">
        <VStack spacing={8} align="start">
          <Grid className="topnav">
            <NavBar /* notifyParent={() => notified()} */ />
          </Grid>

          <Flex
            justifyContent="start"
            alignItems="start"
            width="100%"
            mt="90px"
          >
            <Box
              w="33.33%"
              alignSelf="center"
              justifySelf="center"
              bg="#EEF4F6.500"
            >
              <AddMapModal
                isAdd={false}
                isEdit={false}
              />
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
            ></Box>
          </SimpleGrid>
          {/* <MapButton/> */}
        </VStack>
      </Box>
    </>
  );
};
export { LandingPage };
