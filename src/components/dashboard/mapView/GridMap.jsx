import React from "react";

import { Box, HStack, VStack, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import moment from "moment";

import DashboardMenuOptions from "./DashboardMenuOptions";

function GridMap(props) {
  const navigate = useNavigate();
  const { data } = props;

  const transition = "color 0.25s";
  const groupBlackColor = { color: "black" };
  const greyColor = "blackAlpha.500";

  function formatString(variable) {
    return variable === null ? "" : variable;
  }

  return (
    <Box
      role="group"
      w="300px"
      h="275px"
      onClick={() => navigate(`/dashboard/${data.id}`)}
    >
      <Box
        w="100%"
        h="100%"
        borderRadius="base"
        padding={3}
        border="1px solid"
        borderColor={greyColor}
        boxShadow="lg"
        transition="border-width 0.25s"
        _groupHover={{ borderColor: "brand.500", borderWidth: "3px" }}
      >
        <VStack h="100%" align="start" spacing={0}>
          <HStack w="100%" justify="space-between">
            <Text
              fontSize="xl"
              transition={transition}
              _groupHover={{ color: "brand.500" }}
            >
              {data.title}
            </Text>
            <DashboardMenuOptions mapData={data} />
          </HStack>
          <Text
            color="blackAlpha.500"
            fontSize="xs"
            transition={transition}
            _groupHover={groupBlackColor}
          >
            {data.owner.profileName}
          </Text>
          <Text
            w="100%"
            color="blackAlpha.500"
            fontSize="xs"
            align="end"
            transition={transition}
            _groupHover={groupBlackColor}
          >
            Modified:
            {" " +
              moment(data.lastModification, "YYYY-MM-DD").format("DD-MM-YYYY")}
          </Text>
          <Image
            h="100%"
            w="100%"
            fit="cover"
            border="2px solid"
            borderRadius="base"
            borderColor={greyColor}
            src={data.image}
          />
          <Text
            paddingY={1}
            h="2.5rem"
            w="100%"
            color="blackAlpha.500"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
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
            h="2.8rem"
            w="100%"
            color="blackAlpha.500"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
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
      </Box>
    </Box>
  );
}

export default GridMap;

GridMap.defaultProps = {
  data: {
    id: "",
    mapStatus: "",
    title: "",
    owner: {
      profileName: "",
    },
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

GridMap.propTypes = {
  /**
   * Argument that contains every information about the map: title, locations, last modifications etc.
   */
  data: PropTypes.object.isRequired,
};
