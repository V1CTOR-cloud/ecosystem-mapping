import React, { useContext } from "react";

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
import { MapContext } from "../../../../../pages/MapCanvasPage";

function ServiceFocusComponent() {
  const [formValues, setFormValues] = useContext(MapContext);

  return (
    <Box paddingLeft={verySmallPadding}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          <Box
            w="15px"
            h="15px"
            bg={formValues["serviceFocus"].color}
            borderRadius="50%"
          />
        </MenuButton>
        {/* Keep Zindex >= 4 to not have the slider above the menu that have an index of 3*/}
        <MenuList zIndex={4}>
          {service.servicesFocus.map((serviceFocus) => {
            return (
              <MenuItem
                key={serviceFocus.name}
                onClick={() =>
                  setFormValues(serviceFocus, "serviceFocus", "classicOnChange")
                }
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
