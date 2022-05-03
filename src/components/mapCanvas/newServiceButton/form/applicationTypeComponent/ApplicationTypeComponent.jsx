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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { smallPadding, verySmallPadding } from "../../../../../helper/constant";
import service from "../../../../../assets/servicesFocus.json";

function ApplicationTypeComponent(props) {
  return (
    <Box paddingLeft={verySmallPadding}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Box
            w="15px"
            h="15px"
            bg={props.serviceFocus.color}
            borderRadius="50%"
          />
        </MenuButton>
        <MenuList>
          {service.servicesFocus.map((serviceFocus) => {
            return (
              <MenuItem
                key={serviceFocus.name}
                onClick={() => props.handleServiceFocusChange(serviceFocus)}
              >
                <HStack>
                  <Box
                    h="15px"
                    w="15px"
                    bg={serviceFocus.color}
                    borderRadius="50%"
                    marginRight={smallPadding}
                  />
                  <Text>{serviceFocus.name}</Text>
                </HStack>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default ApplicationTypeComponent;
