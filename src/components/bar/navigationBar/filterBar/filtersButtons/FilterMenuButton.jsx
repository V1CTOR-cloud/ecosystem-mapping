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
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import InputComponent from "../../../../basic/inputs/input/inputComponent/InputComponent";

// Menu that open when we click on one of the filter. It displays all the possibilities to reduce the number of items displayed on the canvas
function FilterMenuButton(props) {
  const { propFilter, handleFilterChange } = props;
  const { t } = useTranslation();
  const [filter, setFilter] = useState(propFilter);
  const [secondaryFilter, setSecondaryFilter] = useState(propFilter);
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    function setButtonActive() {
      // Check if the button is active to every change in the component
      setIsButtonActive(filter.items.some((item) => item.value === true));
    }

    setButtonActive();
  });

  // Update the filters (when we add a new location for instance)
  useEffect(() => {
    setFilter(propFilter);
    setSecondaryFilter(propFilter);
  }, [propFilter]);

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
    handleFilterChange(tempFilter);
  }

  // Uncheck all items in the filter
  function handleNoneClick() {
    let tempFilter = { ...filter };

    // Unselected everything
    tempFilter.isAllSelected = false;
    tempFilter.items.forEach((item) => (item.value = false));
    tempFilter.selectedFilterCount = 0;

    setFilter(tempFilter);
    handleFilterChange(tempFilter);
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
    handleFilterChange(tempFilter);
  }

  return (
    //  Wrap into a box because we have a warning in the console about margin error.
    <Box paddingRight={2}>
      <Menu closeOnSelect={false} margin="0px">
        <Box>
          {filter.items.some((item) => item.value === true) && (
            <Text
              w="15px"
              h="15px"
              bg={"pink.600"}
              position="absolute"
              borderRadius="100%"
              fontSize={filter.selectedFilterCount >= 100 ? "8px" : "10px"}
              paddingTop={filter.selectedFilterCount >= 100 ? "1.5px" : "0"}
              color={"white"}
              align="center"
              transform="translate(-5px, -5px)"
            >
              {filter.selectedFilterCount}
            </Text>
          )}
          <Box
            marginRight={2}
            paddingX={3}
            paddingY={2}
            borderRadius={"base"}
            bg={isButtonActive ? "gray.200" : "white"}
            _hover={{ bg: "gray.100" }}
            _focus={{ boxShadow: "none" }}
            _active={{ bg: "gray.200", color: "brand.500" }}
          >
            <HStack h="100%">
              <Text
                as={MenuButton}
                whiteSpace="nowrap"
                color={isButtonActive ? "brand.500" : "blackAlpha.600"}
              >
                {filter.name}
              </Text>
              {isButtonActive && (
                <Box paddingLeft={2} h="100%" w={"100%"}>
                  <CloseButton
                    w="17.5px"
                    h="17.5px"
                    padding="8px"
                    size="sm"
                    border="2px solid"
                    borderColor={"brand.500"}
                    borderRadius="100%"
                    color={"brand.500"}
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
          {secondaryFilter.items.length !== 0 && (
            <Checkbox
              paddingX={3}
              isChecked={filter.isAllSelected}
              onChange={(e) => {
                handleAllClick(e);
              }}
            >
              Select all
            </Checkbox>
          )}
          {secondaryFilter.items.length === 0 && (
            <Text textAlign="center">No result</Text>
          )}
          <VStack align={"start"} paddingX={3}>
            {secondaryFilter.items.map((item) => (
              <Checkbox
                key={item.name}
                isChecked={item.value}
                onChange={(e) => handleItemClick(item, e)}
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

FilterMenuButton.propTypes = {
  propFilter: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default FilterMenuButton;
