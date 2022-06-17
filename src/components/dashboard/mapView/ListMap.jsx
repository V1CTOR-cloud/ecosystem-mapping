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
  Spacer,
} from "@chakra-ui/react";
import { Share, ThreeDotsVertical } from "@styled-icons/bootstrap";
import PropTypes from "prop-types";
import moment from "moment";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Archive } from "@styled-icons/boxicons-regular";

function ListMap(props) {
  const { data } = props;

  const transition = "color 0.25s";
  const groupBlackColor = { color: "black" };
  const greyColor = "blackAlpha.500";

  const dashboardMenuOptions = [
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
    <Box role="group">
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
                {data.location.continent +
                  " " +
                  data.location.country +
                  " " +
                  data.location.region +
                  " " +
                  data.location.city}
              </Text>
              <Text
                color={greyColor}
                paddingRight={5}
                transition={transition}
                _groupHover={groupBlackColor}
              >
                {data.industry.mainIndustry + " " + data.industry.subIndustry}
              </Text>
            </VStack>
            <Spacer />
            <Text
              color={greyColor}
              transition={transition}
              _groupHover={groupBlackColor}
            >
              Owner: {data.owner.profileName}
            </Text>
            <Text
              color={greyColor}
              transition={transition}
              _groupHover={groupBlackColor}
              paddingX={5}
            >
              {data.services.length} Services
            </Text>
            <Text
              color={greyColor}
              transition={transition}
              _groupHover={groupBlackColor}
            >
              Created: {data.created}
            </Text>
            <VStack
              h="100%"
              justify="space-between"
              alignItems="end"
              paddingLeft={5}
            >
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
                  {dashboardMenuOptions.map((button) => {
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
              <Text
                color={greyColor}
                transition={transition}
                _groupHover={groupBlackColor}
              >
                Modified: {data.created}
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

ListMap.propTypes = {
  /**
   * Argument that contains every information about the map: title, locations, last modifications etc.
   */
  data: PropTypes.object.isRequired,
};
