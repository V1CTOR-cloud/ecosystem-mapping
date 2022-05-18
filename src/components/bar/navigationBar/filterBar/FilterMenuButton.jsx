import React, { useEffect, useState } from "react";

import {
  Box,
  Checkbox,
  CloseButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VStack,
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
import InputComponent from "../../../basic/inputs/input/inputComponent/InputComponent";

// Menu that open when we click on one of the filter. It displays all the possibilities to reduce the number of items displayed on the canvas
function FilterMenuButton(props) {
  const [filter, setFilter] = useState(props.filter);
  const [secondaryFilter, setSecondaryFilter] = useState(props.filter);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    // Check if the button is active to every change in the component
    setIsButtonActive(filter.items.some((item) => item.value === true));

    // Update in the canvas the display of the service every filter changes
    const tempFilters = [...props.filtersState[0]];
    tempFilters[tempFilters.indexOf(props.filter)] = filter;
    props.filtersState[1](tempFilters);
  }, [filter]);

  function handleInputChange(input) {
    const tempFilter = { ...filter };
    tempFilter.items = tempFilter.items.filter((value) =>
      value.name.toLowerCase().startsWith(input.toLowerCase())
    );
    setSecondaryFilter(tempFilter);
  }

  // Check all the items in the filter
  function handleAllClick(event) {
    let tempFilter = { ...filter };

    // Set all items to true
    tempFilter.isAllSelected = event.target.checked;
    tempFilter.items.forEach((item) => (item.value = tempFilter.isAllSelected));

    tempFilter.selectedFilterCount = tempFilter.isAllSelected
      ? tempFilter.items.length
      : 0;

    setFilter(tempFilter);
  }

  // Uncheck all items in the filter
  function handleNoneClick() {
    let tempFilter = { ...filter };

    // Unselected everything
    tempFilter.isAllSelected = false;
    tempFilter.items.forEach((item) => (item.value = false));
    tempFilter.selectedFilterCount = 0;

    setFilter(tempFilter);
  }

  // Check the only item that was selected.
  function handleItemClick(item, event) {
    const indexItem = filter.items.indexOf(item);

    let tempFilter = { ...filter };
    tempFilter.items[indexItem].value = event.target.checked;

    // Check if all items are selected, if true then update the allSelected field
    tempFilter.isAllSelected = tempFilter.items.every(
      (item) => item.value === true
    );

    // Count all items selected to display the right number
    tempFilter.selectedFilterCount = 0;
    tempFilter.items.forEach((item) => {
      if (item.value) {
        tempFilter.selectedFilterCount += 1;
      }
    });

    setFilter(tempFilter);
  }

  return (
    //  Wrap into a box because we have a warning in the console about margin error.
    <Box paddingRight={smallPadding}>
      <Menu closeOnSelect={false} margin="0px">
        <Box>
          {filter.items.some((item) => item.value === true) && (
            <Text
              w="15px"
              h="15px"
              bg={accentColor}
              position="absolute"
              borderRadius="100%"
              fontSize={filter.selectedFilterCount >= 100 ? "8px" : "10px"}
              paddingTop={filter.selectedFilterCount >= 100 ? "1.5px" : "0"}
              color={whiteColor}
              align="center"
              transform="translate(-5px, -5px)"
            >
              {filter.selectedFilterCount}
            </Text>
          )}
          <Box
            marginRight={verySmallPadding}
            paddingX={smallPadding}
            paddingY={verySmallPadding}
            borderRadius={borderRadius}
            bg={isButtonActive ? whiteActiveColor : whiteColor}
            _hover={{ bg: whiteHoverColor }}
            _focus={{ boxShadow: "none" }}
            _active={{ bg: whiteActiveColor, color: blueColor }}
          >
            <HStack h="100%">
              <Text
                as={MenuButton}
                whiteSpace="nowrap"
                color={isButtonActive ? blueColor : greyTextColor}
              >
                {filter.name}
              </Text>
              {isButtonActive && (
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
                    onClick={handleNoneClick}
                  />
                </Box>
              )}
            </HStack>
          </Box>
        </Box>
        <MenuList
          h={secondaryFilter.items.length >= 11 ? "400px" : "auto"}
          overflowY="scroll"
        >
          <Box paddingX={smallPadding} paddingBottom={smallPadding}>
            <InputComponent
              value={""}
              placeholder={"Find a " + filter.name}
              onChange={(input) => handleInputChange(input)}
            />
          </Box>
          {secondaryFilter.items.length !== 0 && (
            <Checkbox
              paddingX={smallPadding}
              isChecked={filter.isAllSelected}
              onChange={(e) => {
                handleAllClick(e);
              }}
              fontFamily={defaultFontFamily}
              fontSize={defaultFontSize}
            >
              Select all
            </Checkbox>
          )}
          {secondaryFilter.items.length === 0 && (
            <Text textAlign="center">No result</Text>
          )}
          <VStack align={"start"} paddingX={smallPadding}>
            {secondaryFilter.items.map((item) => (
              <Checkbox
                key={item.name}
                isChecked={item.value}
                onChange={(e) => handleItemClick(item, e)}
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
