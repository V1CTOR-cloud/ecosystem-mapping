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

import { smallPadding, verySmallPadding } from "../../../../../helper/constant";
import service from "../../../../../assets/servicesFocus.json";

function ServiceFocusComponent(props) {
  const [value, setValue] = useState(props.serviceFocus);

  function handleOnChange(serviceFocus) {
    setValue(serviceFocus);
    props.onChange(serviceFocus);
  }

  return (
    <Box paddingLeft={verySmallPadding}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Box w="15px" h="15px" bg={value.color} borderRadius="50%" />
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

export default ServiceFocusComponent;
