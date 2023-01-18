import React, { useState } from "react";

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

import service from "../../../../../assets/servicesFocus.json";
import PropTypes from "prop-types";

function ServiceFocusComponent(props) {
  const { serviceFocus, onChange } = props;
  const [value, setValue] = useState(serviceFocus);

  function handleOnChange(serviceFocus) {
    //console.log("CHANGE ", serviceFocus)
    setValue(serviceFocus);
    onChange(serviceFocus);
  }

  return (
    <Box paddingLeft={2}>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="outline"
          color="black"
          borderColor="blackAlpha.500"
          _hover={{ bg: "blackAlpha.200" }}
          _active={{ bg: "blackAlpha.300" }}
          w="90%"
        >
          <HStack>
            <Box
              h="15px"
              w="15px"
              bg={value.name.length > 0 ? value.color : "default"}
              borderRadius="50%"
              marginRight={3}
            />
            <Text>{value.name}</Text>
          </HStack>

        </MenuButton>
        {/* Keep Zindex >= 4 to not have the slider above the menu that have an index of 3*/}
        <MenuList zIndex={4}>
          {service.servicesFocus.map((serviceFocus) => {
            return (
              <MenuItem
                key={serviceFocus.name}
                onClick={() => handleOnChange(serviceFocus)}
              >
                <HStack>
                  <Box
                    h="15px"
                    w="15px"
                    bg={serviceFocus.name.length > 0 ? serviceFocus.color : "default"}
                    borderRadius="50%"
                    marginRight={3}
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

ServiceFocusComponent.propTypes = {
  serviceFocus: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ServiceFocusComponent;
