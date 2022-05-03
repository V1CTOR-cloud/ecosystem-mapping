import React from "react";

import { HStack, Spacer, Text } from "@chakra-ui/react";
import { Save } from "@styled-icons/boxicons-regular";

import {
  defaultPadding,
  greyColor,
  smallPadding,
} from "../../../../helper/constant";
import IconButtonComponent from "../../../basic/Buttons/IconButtonComponent";
import FilterMenuButton from "./FilterMenuButton";

function FilterBar(props) {
  return (
    <HStack paddingY={smallPadding} paddingX={defaultPadding} w="100%" h="60px">
      <Text>Filter by:</Text>
      {props.filters.map((filter) => (
        <FilterMenuButton
          key={filter.name}
          text={filter.name}
          items={filter.items}
          isButtonActive={props.isButtonActive}
          handleAllClick={props.handleAllClick}
          handleNoneClick={props.handleNoneClick}
          handleItemClick={props.handleItemClick}
          filter={filter}
        />
      ))}
      <Spacer />
      <IconButtonComponent
        icon={<Save color={greyColor} w="15px" h="15px" />}
        onClick={props.handleSave}
      />
    </HStack>
  );
}

export default FilterBar;
