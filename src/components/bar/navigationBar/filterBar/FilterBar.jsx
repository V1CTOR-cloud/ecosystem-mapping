import React, { useState } from "react";

import { HStack, Spacer, Text, Box, useDisclosure } from "@chakra-ui/react";
import { Save } from "@styled-icons/boxicons-regular";
import { useTranslation } from "react-i18next";

import {
  blueColor,
  defaultPadding,
  greyTextColor,
  smallPadding,
  verySmallPadding,
} from "../../../../helper/constant";
import FilterMenuButton from "./FilterMenuButton";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import SaveFilterAlertDialog from "./SaveFilterAlertDialog";

function FilterBar(props) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState(props.filtersState[0]);

  const isActive = filters.some((filter) => filter.selectedFilterCount > 0);

  function handleFilterChange(filter, index) {
    const tempFilters = [...filters];
    tempFilters[index] = filter;
    setFilters(tempFilters);
  }

  function handleApplyFilter() {
    // Update in the canvas the display of the service every filter changes
    props.filtersState[1](filters);
  }

  return (
    <HStack paddingY={smallPadding} paddingX={defaultPadding} w="100%" h="60px">
      <Text color={greyTextColor}>
        {t("mapping.navigation.filter.bar.filter.by")}
      </Text>
      {props.filtersState[0].map((filter, index) => (
        <FilterMenuButton
          key={filter.name}
          filter={filter}
          handleFilterChange={(filter) => handleFilterChange(filter, index)}
        />
      ))}
      <Spacer />

      {isActive && (
        <Box paddingRight={smallPadding}>
          <Text
            as="u"
            cursor="pointer"
            color={greyTextColor}
            onClick={props.handleClearAllFilters}
          >
            {t("mapping.navigation.bar.clear.filter.button")}
          </Text>
        </Box>
      )}

      {isActive && (
        <Box paddingRight={verySmallPadding}>
          <ButtonComponent
            buttonText={"Save Filter"}
            isPrimary={false}
            icon={<Save color={blueColor} size={25} />}
            onClick={onOpen}
          />
        </Box>
      )}
      {isActive && (
        <ButtonComponent
          buttonText={"Apply Filters"}
          isPrimary={true}
          onClick={handleApplyFilter}
        />
      )}
      <SaveFilterAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        setFilters={props.filtersState[1]}
        filters={filters}
        mapId={props.mapId}
      />
    </HStack>
  );
}

export default FilterBar;
