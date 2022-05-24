import React, { useEffect, useState } from "react";

import {
  Box,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
  Text,
} from "@chakra-ui/react";

import {
  blueColor,
  borderRadius,
  defaultFontFamily,
  defaultFontSize,
  greyTextColor,
  smallPadding,
  verySmallPadding,
  whiteHoverColor,
} from "../../../../../helper/constant";
import InputComponent from "../../../../basic/inputs/input/inputComponent/InputComponent";

// Menu that open when we click on one of the filter. It displays all the possibilities to reduce the number of items displayed on the canvas
function SavedFilterButton(props) {
  const [filter] = useState(props.filter);
  const [secondaryFilter, setSecondaryFilter] = useState(props.filter);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    // Check if the button is active to every change in the component
    setIsButtonActive(filter.items.some((item) => item.value === true));
  });

  function handleInputChange(input) {
    const tempFilter = { ...filter };
    tempFilter.items = tempFilter.items.filter((value) =>
      value.name.toLowerCase().startsWith(input.toLowerCase())
    );
    setSecondaryFilter(tempFilter);
  }

  // Check the only item that was selected.
  function handleItemClick(filterName) {
    // Retrieve all the information of the saved filter that we clicked on.
    const selectedSavedFilter = props.savedFilters.find(
      (item) => item[0] === filterName
    );

    props.handleSavedFilterChange(selectedSavedFilter);
  }

  return (
    //  Wrap into a box because we have a warning in the console about margin error.
    <Box paddingX={verySmallPadding}>
      <Menu closeOnSelect={false} margin="0px">
        <MenuButton
          paddingX={smallPadding}
          paddingY={verySmallPadding}
          borderRadius={borderRadius}
          _hover={{ bg: whiteHoverColor }}
          _focus={{ boxShadow: "none" }}
        >
          <Text
            whiteSpace="nowrap"
            color={isButtonActive ? blueColor : greyTextColor}
          >
            {filter.name}
          </Text>
        </MenuButton>
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
          {secondaryFilter.items.length === 0 && (
            <Text textAlign="center">No result</Text>
          )}
          <MenuOptionGroup
            type="radio"
            paddingX={smallPadding}
            onChange={(e) => handleItemClick(e)}
            value={props.value}
          >
            {secondaryFilter.items.map((item) => (
              <MenuItemOption
                key={item.name}
                // isChecked={item.value}
                // value={item.value ? item.name : undefined}
                value={item.name}
                fontFamily={defaultFontFamily}
                fontSize={defaultFontSize}
              >
                {item.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default SavedFilterButton;
