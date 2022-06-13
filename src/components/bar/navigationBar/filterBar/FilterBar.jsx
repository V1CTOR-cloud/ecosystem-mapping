import React, { useContext, useEffect, useState } from "react";

import {
  HStack,
  Spacer,
  Text,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Save } from "@styled-icons/boxicons-regular";
import { Check2Circle } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import FilterMenuButton from "./filtersButtons/FilterMenuButton";
import SaveFilterAlertDialog from "./SaveFilterAlertDialog";
import SavedFilterButton from "./filtersButtons/SavedFilterButton";
import DeleteFilterAlertDialog from "./DeleteFilterAlertDialog";
import { Map } from "../../../../service/map";
import { CanvasProvider } from "../../../../pages/MapCanvasPage";

function FilterBar(props) {
  const canvasProvider = useContext(CanvasProvider);
  const { filtersState, handleClearAllFilters } = props;
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDeleteDialog,
    onOpen: onOpenDeleteDialog,
    onClose: onCloseDeleteDialog,
  } = useDisclosure();
  const [filters, setFilters] = useState(filtersState[0]);
  const [isButtonsActive, setIsButtonsActive] = useState(
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
      setIsButtonsActive(true);
      setIsFilterApplied(false);
    }
  }, [filters]);

  function handleFilterChange(filter, index) {
    const tempFilters = [...filters];
    tempFilters[index] = filter;
    setValue("");
    setFilters(tempFilters);
    setIsFilterApplied(false);
  }

  function handleApplyFilter() {
    // Update in the canvas the display of the service every filter changes
    filtersState[1](filters);
    setIsFilterApplied(true);

    // If we apply no filters (default filters) then we are hiding the buttons.
    if (
      filters.every((filter) =>
        filter.id === 0 ? true : filter.selectedFilterCount === 0
      )
    ) {
      setIsButtonsActive(false);
    }
  }

  function handleClearFilters() {
    handleClearAllFilters();
    setIsButtonsActive(false);
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
        id: canvasProvider.mapId,
        filters: savedFilters,
      };

      const res = await Map.createSavedFilter(data);

      if (res.updateEcosystemMap) {
        const tempFilter = [...filters];

        // Get the index of the items that we want to delete
        const index = tempFilter[0].items.findIndex(
          (filter) => filter.name === name
        );

        tempFilter[0].items.splice(index, 1);

        filtersState[1](tempFilter);
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
    <HStack paddingY={3} paddingX={10} w="100%" h="60px">
      <Text color={"blackAlpha.800"}>
        {t("mapping.navigation.filter.bar.filter.by")}
      </Text>
      {filtersState[0].map((filter, index) => {
        if (index === 0) {
          return (
            <SavedFilterButton
              key={filter.name}
              propsFilter={filter}
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
              propFilter={filter}
              handleFilterChange={(filter) => handleFilterChange(filter, index)}
            />
          );
        }
      })}
      {isButtonsActive && !isFilterApplied && (
        <Button
          variant="ghost"
          rightIcon={<Check2Circle color={"brand.500"} size={25} />}
          onClick={handleApplyFilter}
        >
          {t("mapping.navigation.bar.apply.filter.button")}
        </Button>
      )}
      <Spacer />

      {isButtonsActive && (
        <Box paddingRight={3}>
          <Text
            as="u"
            cursor="pointer"
            color={"blackAlpha.800"}
            onClick={handleClearFilters}
          >
            {t("mapping.navigation.bar.clear.filter.button")}
          </Text>
        </Box>
      )}
      {isButtonsActive && (
        <Box paddingRight={2}>
          <Button
            variant={"solid"}
            isDisabled={isSavedFilterSelected}
            rightIcon={
              isSavedFilterSelected ? (
                <Check2Circle color={"brand.500"} size={25} />
              ) : (
                <Save color={"white"} size={25} />
              )
            }
            onClick={isSavedFilterSelected ? () => {} : handleSaveFilterClick}
          >
            {isSavedFilterSelected
              ? t("mapping.navigation.bar.saved.filter.text")
              : t("mapping.navigation.bar.saved.filter.button")}{" "}
          </Button>
        </Box>
      )}
      <SaveFilterAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        setFilters={filtersState[1]}
        filters={filters}
        isEditing={isEditing}
        name={name ? name : ""}
      />
      <DeleteFilterAlertDialog
        isOpen={isOpenDeleteDialog}
        onClose={onCloseDeleteDialog}
        handleDeleteSavedFilter={handleDeleteSavedFilter}
      />
    </HStack>
  );
}

FilterBar.propTypes = {
  filtersState: PropTypes.array.isRequired,
  handleClearAllFilters: PropTypes.func.isRequired,
};

export default FilterBar;
