import React, { useContext } from "react";

import { Box, HStack, VStack, Text, Image, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";
import moment from "moment";
import { useNavigate } from "react-router";

import DashboardMenuOptions from "./DashboardMenuOptions";
import { AppProvider } from "../../../App";
import { useStore as userStore } from "../../../models/userStore";

function ListMap(props) {
  const { data } = props;
  const appProvider = useContext(AppProvider);
  let navigate;
  const firstName = userStore((state) => state.firstName);
  const lastName = userStore((state) => state.lastName);
  // For storybook
  if (appProvider.isApp) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate = useNavigate();
  }

  const transition = "color 0.25s";
  const groupBlackColor = { color: "black" };
  const greyColor = "blackAlpha.500";

  function formatString(variable) {
    return variable === null ? "" : variable;
  }

  return (
    <Box
      cursor="pointer"
      role="group"
      onClick={() => {
        if (appProvider.isApp) {
          navigate(`/dashboard/${data.id}`);
        }
      }}
    >
      <Box
        w="100%"
        h="150px"
        borderBottom="3px solid"
        borderColor={"blackAlpha.500"}
        transition="border-color 0.25s"
        padding={4}
        _groupHover={{ borderColor: "brand.500" }}
      >
        <HStack h="100%">
          <Image
            h="100px"
            w="200px"
            fit="cover"
            border="2px solid"
            borderRadius="base"
            borderColor="blackAlpha.500"
            src={data.image}
          />
          <HStack h="100%" w="100%" alignItems="end" paddingY={3} spacing={0}>
            <VStack align="start" h="100%" spacing={0}>
              <Text
                fontSize="xl"
                transition={transition}
                _groupHover={{ color: "brand.500" }}
              >
                {data.title}
              </Text>
              <Spacer />
              <Text
                color={greyColor}
                transition={transition}
                _groupHover={groupBlackColor}
              >
                {data.location[0].continent === null
                  ? "No location"
                  : formatString(data.location[0].continent) +
                    " " +
                    formatString(data.location[0].country) +
                    " " +
                    formatString(data.location[0].region) +
                    " " +
                    formatString(data.location[0].city)}
              </Text>
              <Text
                color={greyColor}
                paddingRight={5}
                transition={transition}
                _groupHover={groupBlackColor}
              >
                {data.industry[0].mainIndustry === null
                  ? "No industry"
                  : formatString(data.industry[0].mainIndustry) +
                    " " +
                    formatString(data.industry[0].subIndustry)}
              </Text>
            </VStack>
            <Spacer />
            <Text
              color={greyColor}
              transition={transition}
              _groupHover={groupBlackColor}
            >
              {/*This will need to change when the sharing of map will be available*/}
              Owner: {firstName + " " + lastName}
            </Text>
            <Text
              color={greyColor}
              transition={transition}
              _groupHover={groupBlackColor}
              paddingX={5}
            >
              {data.service.length} Services
            </Text>
            <Text
              color={greyColor}
              transition={transition}
              _groupHover={groupBlackColor}
            >
              Created:
              {" " + moment(data.creation, "YYYY-MM-DD").format("DD-MM-YYYY")}
            </Text>
            <VStack
              h="100%"
              justify="space-between"
              alignItems="end"
              paddingLeft={5}
            >
              <DashboardMenuOptions mapData={data} />
              <Text
                color={greyColor}
                transition={transition}
                _groupHover={groupBlackColor}
              >
                Modified:{" "}
                {" " +
                  moment(data.lastModification, "YYYY-MM-DD").format(
                    "DD-MM-YYYY"
                  )}
              </Text>
            </VStack>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default ListMap;

ListMap.defaultProps = {
  data: {
    id: "",
    mapStatus: "",
    title: "",
    owner: "",
    created: moment().format("DD-MM-YYYY"),
    lastModification: moment().format("DD-MM-YYYY"),
    image: "",
    location: {
      continent: "",
      country: "",
      region: "",
      city: "",
    },
    industry: {
      mainIndustry: "",
      subIndustry: "",
    },
    services: [],
  },
};

ListMap.propTypes = {
  /**
   * Argument that contains every information about the map: title, locations, last modifications etc.
   */
  data: PropTypes.object.isRequired,
};
