import React, { useEffect, useState } from "react";

import { HStack, Spacer, Text, Box, useDisclosure } from "@chakra-ui/react";
import { Save } from "@styled-icons/boxicons-regular";
import { Check2Circle } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";

import {
  blueColor,
  defaultPadding,
  greyTextColor,
  smallPadding,
  verySmallPadding,
  whiteColor,
} from "../../../../helper/constant";
import FilterMenuButton from "./filtersButtons/FilterMenuButton";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import SaveFilterAlertDialog from "./SaveFilterAlertDialog";
import SavedFilterButton from "./filtersButtons/SavedFilterButton";
import DeleteFilterAlertDialog from "./DeleteFilterAlertDialog";
import EcosystemMapServices from "../../../../service/EcosystemMapServices";

function FilterBar(props) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteDialog,
    onOpen: onOpenDeleteDialog,
    onClose: onCloseDeleteDialog,
  } = useDisclosure();
  const [filters, setFilters] = useState(props.filtersState[0]);
  const [isActive, setIsActive] = useState(
    filters.some((filter) => filter.selectedFilterCount > 0)
  );
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [value, setValue] = useState("");
  const [isSavedFilterSelected, setIsSavedFilterSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    setIsSavedFilterSelected(value !== "");
  }, [value]);

  useEffect(() => {
    if (filters.some((filter) => filter.selectedFilterCount > 0)) {
      setIsActive(true);
      setIsFilterApplied(false);
    }
  }, [filters]);

  function handleFilterChange(filter, index) {
    const tempFilters = [...filters];
    tempFilters[index] = filter;
    setValue("");
    setFilters(tempFilters);
  }

  function handleApplyFilter() {
    // Update in the canvas the display of the service every filter changes
    props.filtersState[1](filters);
    setIsFilterApplied(true);
  }

  function handleClearAllFilters() {
    props.handleClearAllFilters();
    setIsActive(false);
  }

  function handleSavedFilterChange(filter) {
    const savedFilterEntries = Object.entries(filter.selectedFilters);

    const tempFilters = [...filters];

    // Clear all fields
    tempFilters.forEach((filter) => {
      filter.isAllSelected = false;
      filter.selectedFilterCount = 0;
      filter.items.forEach((item) => (item.value = false));
    });

    // Go through all the filter saved
    savedFilterEntries.forEach((thisFilter) => {
      // Get the value of each element in a specific filter
      thisFilter[1].selectedFilters.forEach((item) => {
        const index = tempFilters[thisFilter[0]].items.findIndex(
          (thisItem) => thisItem.name === item
        );

        // Set the value to true from the specific filter
        tempFilters[thisFilter[0]].items[index].value = true;
      });

      // Set the selectedFilterCount
      tempFilters[thisFilter[0]].selectedFilterCount =
        thisFilter[1].selectedFilters.length;
    });

    setFilters(tempFilters);

    setValue(filter[0]);
  }

  // Open the dialog to edit a previous saved filter
  function handleEditSavedFilter(itemName) {
    setIsEditing(true);
    onOpen();
    setName(itemName);
  }

  // Delete the saved filter from the filter list and from the database
  async function handleDeleteSavedFilter() {
    let savedFilters = {};

    if (filters[0].items !== []) {
      filters[0].items.forEach((savedFilter) => {
        if (savedFilter.name !== name) {
          savedFilters = {
            ...savedFilters,
            [savedFilter.name]: savedFilter.selectedFilters,
          };
        }
      });

      const data = {
        id: props.mapId,
        filters: savedFilters,
      };

      const res = await EcosystemMapServices.createSavedFilter(data);

      if (res.updateEcosystemMap) {
        const tempFilter = [...filters];

        // Get the index of the items that we want to delete
        const index = tempFilter[0].items.findIndex(
          (filter) => filter.name === name
        );

        tempFilter[0].items.splice(index, 1);

        props.filtersState[1](tempFilter);
        onCloseDeleteDialog();
      }
    }
  }

  // Open the dialog to delete a previous saved filter
  function handleOpenDeleteAlertDialog(itemName) {
    setName(itemName);
    onOpenDeleteDialog();
  }

  // Open the alert dialog to save a filter
  function handleSaveFilterClick() {
    setIsEditing(false);
    onOpen();
  }

  return (
    <HStack paddingY={smallPadding} paddingX={defaultPadding} w="100%" h="60px">
      <Text color={greyTextColor}>
        {t("mapping.navigation.filter.bar.filter.by")}
      </Text>
      {props.filtersState[0].map((filter, index) => {
        if (index === 0) {
          return (
            <SavedFilterButton
              key={filter.name}
              filter={filter}
              value={value}
              handleSavedFilterChange={(filter) =>
                handleSavedFilterChange(filter)
              }
              handleEditSavedFilter={handleEditSavedFilter}
              handleOpenDeleteAlertDialog={handleOpenDeleteAlertDialog}
            />
          );
        } else {
          return (
            <FilterMenuButton
              key={filter.name}
              filter={filter}
              savedFilters={props.savedFilters}
              handleFilterChange={(filter) => handleFilterChange(filter, index)}
            />
          );
        }
      })}
      {isActive && !isFilterApplied && (
        <ButtonComponent
          buttonText={"Apply Filters"}
          isWithoutBorder={true}
          isSelected={true}
          icon={<Check2Circle color={blueColor} size={25} />}
          onClick={handleApplyFilter}
        />
      )}
      <Spacer />

      {isActive && (
        <Box paddingRight={smallPadding}>
          <Text
            as="u"
            cursor="pointer"
            color={greyTextColor}
            onClick={handleClearAllFilters}
          >
            {t("mapping.navigation.bar.clear.filter.button")}
          </Text>
        </Box>
      )}
      {isActive && (
        <Box paddingRight={verySmallPadding}>
          <ButtonComponent
            buttonText={isSavedFilterSelected ? "Saved Filter" : "Save Filter"}
            isPrimary={!isSavedFilterSelected}
            isWithoutBorder={isSavedFilterSelected}
            isSelected={isSavedFilterSelected}
            icon={
              isSavedFilterSelected ? (
                <Check2Circle color={blueColor} size={25} />
              ) : (
                <Save color={whiteColor} size={25} />
              )
            }
            onClick={isSavedFilterSelected ? () => {} : handleSaveFilterClick}
          />
        </Box>
      )}
      <SaveFilterAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        setFilters={props.filtersState[1]}
        filters={filters}
        mapId={props.mapId}
        savedFilters={props.savedFilters}
        isEditing={isEditing}
        name={name}
      />
      <DeleteFilterAlertDialog
        isOpen={isOpenDeleteDialog}
        onClose={onCloseDeleteDialog}
        handleDeleteSavedFilter={handleDeleteSavedFilter}
      />
    </HStack>
  );
}

export default FilterBar;
