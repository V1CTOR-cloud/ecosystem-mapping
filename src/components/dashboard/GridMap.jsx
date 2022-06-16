import React from "react";

import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  Menu,
  MenuList,
  MenuItem,
  Button,
  MenuButton,
} from "@chakra-ui/react";
import { ThreeDotsVertical } from "@styled-icons/bootstrap";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Share } from "@styled-icons/bootstrap";
import { Archive } from "@styled-icons/boxicons-regular";
import PropTypes from "prop-types";
import moment from "moment";

function GridMap(props) {
  const { data } = props;

  const buttons = [
    {
      id: 0,
      title: "Edit",
      description: "Change the name or other info of the map.",
      icon: <EditIcon w="25px" h="25px" />,
      buttonFunction: () => console.log("Edit"),
    },
    {
      id: 1,
      title: "Duplicate",
      description: "Create a new Ecosystem map with the same settings",
      icon: <CopyIcon w="25px" h="25px" />,
      buttonFunction: () => console.log("Duplicate"),
    },
    {
      id: 2,
      title: "Share",
      description: "Invite others to collaborate on developing the map",
      icon: <Share size="25px" />,
      buttonFunction: () => console.log("Share"),
    },
    {
      id: 3,
      title: "Archive",
      description: "Move the ecosystem map and mark it as unpublished",
      icon: <Archive size="25px" />,
      buttonFunction: () => console.log("Archive"),
    },
  ];

  return (
    <Box
      w="300px"
      h="275px"
      borderRadius="base"
      padding="3"
      border="1px solid"
      borderColor="blackAlpha.500"
      boxShadow="lg"
    >
      <VStack h="100%" align="start" spacing={0}>
        <HStack w="100%" justify="space-between">
          <Text fontSize="xl">{data.title}</Text>
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              variant="greyGhost"
              borderColor="blackAlpha.500"
              _hover={{ bg: "blackAlpha.200" }}
              _active={{ bg: "blackAlpha.300" }}
            >
              <ThreeDotsVertical size="1.5rem" />
            </MenuButton>
            <MenuList w="300px">
              {buttons.map((button) => {
                return (
                  <MenuItem key={button.id}>
                    <HStack>
                      <Box>{button.icon}</Box>
                      <VStack paddingLeft="2" spacing="0">
                        <Text w="100%" fontSize="ms">
                          {button.title}
                        </Text>
                        <Text fontSize="xs">{button.description}</Text>
                      </VStack>
                    </HStack>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </HStack>
        <Text color="blackAlpha.600" fontSize="xs">
          {data.owner.profileName}
        </Text>
        <Text w="100%" color="blackAlpha.600" fontSize="xs" align="end">
          Modified: {data.lastModification}
        </Text>
        <Image
          h="100%"
          w="100%"
          fit="cover"
          border="2px solid"
          borderRadius="base"
          borderColor="blackAlpha.500"
          src={data.image}
        />
        <Text
          paddingY={1}
          h="2.5rem"
          w="100%"
          color="blackAlpha.600"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {data.location.continent +
            " " +
            data.location.country +
            " " +
            data.location.region +
            " " +
            data.location.city}
        </Text>
        <Text
          h="2.8rem"
          w="100%"
          color="blackAlpha.600"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {data.industry.mainIndustry + " " + data.industry.subIndustry}
        </Text>
      </VStack>
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
  },
};

GridMap.propTypes = {
  /**
   * Argument that contains every information about the map: title, locations, last modifications etc.
   */
  data: PropTypes.object.isRequired,
};
