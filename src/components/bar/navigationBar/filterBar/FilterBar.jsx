import React from "react";

import { HStack, Spacer, Text } from "@chakra-ui/react";
import { Save } from "@styled-icons/boxicons-regular";
import { useTranslation } from "react-i18next";

import {
  defaultPadding,
  greyColor,
  greyTextColor,
  smallPadding,
} from "../../../../helper/constant";
import FilterMenuButton from "./FilterMenuButton";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";

function FilterBar(props) {
  const { t } = useTranslation();

  return (
    <HStack paddingY={smallPadding} paddingX={defaultPadding} w="100%" h="60px">
      <Text color={greyTextColor}>
        {t("mapping.navigation.filter.bar.filter.by")}
      </Text>
      {props.filtersState[0].map((filter) => (
        <FilterMenuButton
          key={filter.name}
          filter={filter}
          filtersState={props.filtersState}
        />
      ))}
      <Spacer />
      <ButtonComponent
        isWithoutBorder={true}
        buttonText={"Save Filter"}
        icon={<Save color={greyColor} size={25} />}
        color={greyColor}
        onClick={() => {
          //todo
          console.log("save");
        }}
      />
    </HStack>
  );
}

export default FilterBar;
