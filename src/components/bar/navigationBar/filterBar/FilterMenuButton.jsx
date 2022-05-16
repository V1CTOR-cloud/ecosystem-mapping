import React from "react";

import {
  Box,
  Menu,
  MenuButton,
  Checkbox,
  MenuList,
  VStack,
  Text,
  HStack,
  CloseButton,
} from "@chakra-ui/react";

import {
  accentColor,
  blueColor,
  borderRadius,
  defaultFontFamily,
  defaultFontSize,
  greyTextColor,
  smallPadding,
  verySmallPadding,
  whiteActiveColor,
  whiteColor,
  whiteHoverColor,
} from "../../../../helper/constant";

// Menu that open when we click on one of the filter. It displays all the possibilities to reduce the number of items displayed on the canvas
function FilterMenuButton(props) {
  return (
    //  Wrap into a box because we have a warning in the console about margin error.
    <Box paddingRight={smallPadding}>
      <Menu closeOnSelect={false} margin="0px">
        <Box>
          {props.filter.items.some((item) => item.value === true) && (
            <Text
              w="15px"
              h="15px"
              bg={accentColor}
              position="absolute"
              borderRadius="100%"
              fontSize="10px"
              color={whiteColor}
              align="center"
              transform="translate(-5px, -5px)"
            >
              {props.filter.selectedFilterCount}
            </Text>
          )}
          <Box
            as={MenuButton}
            marginRight={verySmallPadding}
            paddingX={smallPadding}
            paddingY={verySmallPadding}
            borderRadius={borderRadius}
            bg={props.isButtonActive ? whiteActiveColor : whiteColor}
            _hover={{ bg: whiteHoverColor }}
            _focus={{ boxShadow: "none" }}
            _active={{ bg: whiteActiveColor, color: blueColor }}
          >
            <HStack h="100%">
              <Text
                whiteSpace="nowrap"
                color={props.isButtonActive ? blueColor : greyTextColor}
              >
                {props.text}
              </Text>
              {props.filter.items.some((item) => item.value === true) && (
                <Box paddingLeft={verySmallPadding} h="100%" w={"100%"}>
                  <CloseButton
                    w="17.5px"
                    h="17.5px"
                    padding="8px"
                    size="sm"
                    border="2px solid"
                    borderColor={blueColor}
                    borderRadius="100%"
                    color={blueColor}
                    _focus={{
                      boxShadow: "none",
                    }}
                    onClick={() => props.handleNoneClick(props.filter)}
                  />
                </Box>
              )}
            </HStack>
          </Box>
        </Box>

        <MenuList>
          <Checkbox
            paddingX={smallPadding}
            isChecked={props.filter.isAllSelected}
            onChange={(e) => {
              props.handleAllClick(props.filter, e);
            }}
            fontFamily={defaultFontFamily}
            fontSize={defaultFontSize}
          >
            Select all
          </Checkbox>
          <VStack align={"start"} paddingX={smallPadding}>
            {props.items.map((item) => (
              <Checkbox
                key={item.name}
                isChecked={item.value}
                onChange={(e) => props.handleItemClick(props.filter, item, e)}
                fontFamily={defaultFontFamily}
                fontSize={defaultFontSize}
              >
                {item.name}
              </Checkbox>
            ))}
          </VStack>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default FilterMenuButton;
