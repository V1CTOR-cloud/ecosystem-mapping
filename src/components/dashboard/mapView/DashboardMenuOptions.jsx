import React from "react";

import {
  Box,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CopyIcon, EditIcon } from "@chakra-ui/icons";
import { Share, ThreeDotsVertical } from "@styled-icons/bootstrap";
import { Archive } from "@styled-icons/boxicons-regular";

function DashboardMenuOptions() {
  const transition = "color 0.25s";

  const menuOptions = [
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
      description: "Create a new Ecosystem map with the same settings.",
      icon: <CopyIcon w="25px" h="25px" />,
      buttonFunction: () => console.log("Duplicate"),
    },
    {
      id: 2,
      title: "Share",
      description: "Invite others to collaborate on developing the map.",
      icon: <Share size="25px" />,
      buttonFunction: () => console.log("Share"),
    },
    {
      id: 3,
      title: "Archive",
      description: "Move the ecosystem map and mark it as unpublished.",
      icon: <Archive size="25px" />,
      buttonFunction: () => console.log("Archive"),
    },
  ];

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        variant="greyGhost"
        borderColor="blackAlpha.500"
        _hover={{ bg: "blackAlpha.200" }}
        _active={{ bg: "blackAlpha.300" }}
      >
        <ThreeDotsVertical size="22.5px" />
      </MenuButton>
      <MenuList w="300px">
        {menuOptions.map((button, index) => {
          return (
            <MenuItem
              className="menuItem"
              key={button.id}
              _hover={{
                backgroundColor: index === 3 ? "red.100" : undefined,
              }}
              borderTopRadius={index === 0 ? "base" : undefined}
              borderBottomRadius={index === 3 ? "base" : undefined}
            >
              <HStack>
                <Box>{button.icon}</Box>
                <VStack paddingLeft="2" spacing="0">
                  <Text
                    className="title"
                    w="100%"
                    fontSize="sm"
                    transition={transition}
                    sx={{
                      ".menuItem:hover &": {
                        color: index === 3 ? "red" : "brand.500",
                      },
                    }}
                  >
                    {button.title}
                  </Text>
                  <Text
                    className="description"
                    fontSize="xs"
                    color="blackAlpha.500"
                    transition={transition}
                    sx={{
                      ".menuItem:hover &": {
                        color: "black",
                      },
                    }}
                  >
                    {button.description}
                  </Text>
                </VStack>
              </HStack>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default DashboardMenuOptions;
