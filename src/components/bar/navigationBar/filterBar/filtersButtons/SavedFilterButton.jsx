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
import PropTypes from "prop-types";

import InputComponent from "../../../../basic/inputs/input/inputComponent/InputComponent";
import { CheckIcon, EditIcon } from "@chakra-ui/icons";

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
    <Box paddingX={2}>
      <Menu closeOnSelect={false} margin="0px">
        <MenuButton
          paddingX={3}
          paddingY={2}
          borderRadius={"base"}
          _hover={{ bg: "gray.100" }}
          _focus={{ boxShadow: "none" }}
        >
          <Text whiteSpace="nowrap" color={"blackAlpha.600"}>
            {filter.name}
          </Text>
        </MenuButton>
        <MenuList
          h={secondaryFilter.items.length >= 11 ? "400px" : "auto"}
          overflowY="scroll"
        >
          <Box paddingX={3} paddingBottom={3}>
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
                bg: "gray.100",
              }}
              borderRadius={"base"}
              bg={item.name === value ? "gray.200" : "white"}
              paddingX={6}
              paddingY={2}
              cursor="pointer"
            >
              <HStack>
                <CheckIcon
                  w="12.5px"
                  h="12.5px"
                  visibility={item.name === value ? "visible" : "hidden"}
                />
                <Box w="200px" paddingLeft={3} paddingRight={3}>
                  <Text
                    w="100%"
                    value={item.name}
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
                  color={"blackAlpha.700"}
                  _hover={{
                    color: "brand.500",
                  }}
                  onClick={() => {
                    handleEditSavedFilter(item.name);
                  }}
                  cursor="pointer"
                />
                <Box paddingLeft={2}>
                  <CloseButton
                    w="17.5px"
                    h="17.5px"
                    padding="8px"
                    size="sm"
                    border="2px solid"
                    borderColor={"blackAlpha.700"}
                    borderRadius="100%"
                    color={"blackAlpha.700"}
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
  propsFilter: PropTypes.object.isRequired,
  handleSavedFilterChange: PropTypes.func.isRequired,
  handleEditSavedFilter: PropTypes.func.isRequired,
  handleOpenDeleteAlertDialog: PropTypes.func.isRequired,
};

export default SavedFilterButton;
