import React, { useState } from "react";

import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  Text,
  CloseButton,
  HStack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import {
  blueColor,
  borderRadius,
  defaultFontFamily,
  defaultFontSize,
  greyColor,
  greyTextColor,
  mediumPadding,
  smallPadding,
  verySmallPadding,
  whiteActiveColor,
  whiteColor,
  whiteHoverColor,
} from "../../../../../helper/constant";
import InputComponent from "../../../../basic/inputs/input/inputComponent/InputComponent";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";

// Menu that open when we click on one of the filter. It displays all the possibilities to reduce the number of items displayed on the canvas
function SavedFilterButton(props) {
  const {
    propsFilter,
    handleSavedFilterChange,
    handleEditSavedFilter,
    handleOpenDeleteAlertDialog,
  } = props;
  const { t } = useTranslation();
  const [filter] = useState(propsFilter);
  const [secondaryFilter, setSecondaryFilter] = useState(propsFilter);
  const [value, setValue] = useState("");

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
    const selectedSavedFilter = filter.items.find(
      (item) => item.name === filterName
    );

    setValue(filterName);

    handleSavedFilterChange(selectedSavedFilter);
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
          <Text whiteSpace="nowrap" color={greyTextColor}>
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
              placeholder={
                t("mapping.navigation.bar.search.placeholder.text") +
                filter.name
              }
              onChange={(input) => handleInputChange(input)}
            />
          </Box>
          {secondaryFilter.items.length === 0 && (
            <Text textAlign="center">No result</Text>
          )}
          {secondaryFilter.items.map((item) => (
            <Box
              key={item.name}
              _hover={{
                bg: whiteHoverColor,
              }}
              borderRadius={borderRadius}
              bg={item.name === value ? whiteActiveColor : whiteColor}
              paddingX={mediumPadding}
              paddingY={verySmallPadding}
              cursor="pointer"
            >
              <HStack>
                <CheckIcon
                  w="12.5px"
                  h="12.5px"
                  visibility={item.name === value ? "visible" : "hidden"}
                />
                <Box
                  w="200px"
                  paddingLeft={smallPadding}
                  paddingRight={smallPadding}
                >
                  <Text
                    w="100%"
                    value={item.name}
                    fontFamily={defaultFontFamily}
                    fontSize={defaultFontSize}
                    onClick={() => {
                      handleItemClick(item.name);
                    }}
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {item.name}
                  </Text>
                </Box>
                <EditIcon
                  color={greyColor}
                  _hover={{
                    color: blueColor,
                  }}
                  onClick={() => {
                    handleEditSavedFilter(item.name);
                  }}
                  cursor="pointer"
                />
                <Box paddingLeft={verySmallPadding}>
                  <CloseButton
                    w="17.5px"
                    h="17.5px"
                    padding="8px"
                    size="sm"
                    border="2px solid"
                    borderColor={greyColor}
                    borderRadius="100%"
                    color={greyColor}
                    _focus={{
                      boxShadow: "none",
                    }}
                    _hover={{
                      borderColor: "red",
                      color: "red",
                    }}
                    onClick={() => {
                      handleOpenDeleteAlertDialog(item.name);
                    }}
                  />
                </Box>
              </HStack>
            </Box>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
}

SavedFilterButton.propTypes = {
  propsFilter: PropTypes.array.isRequired,
  handleSavedFilterChange: PropTypes.func.isRequired,
  handleEditSavedFilter: PropTypes.func.isRequired,
  handleOpenDeleteAlertDialog: PropTypes.func.isRequired,
};

export default SavedFilterButton;
