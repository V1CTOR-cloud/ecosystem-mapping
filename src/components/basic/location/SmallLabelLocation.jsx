import React from "react";

import { Text, VStack } from "@chakra-ui/react";

import MenuComponent from "../inputs/menu/MenuComponent";
import { greyTextColor, smallFontSize } from "../../../helper/constant";

function SmallLabelLocation(props) {
  return (
    <VStack align="self-start">
      <Text fontSize={smallFontSize} color={greyTextColor}>
        {props.label}
      </Text>
      <MenuComponent
        wantScroll={props.wantScroll}
        width="140px"
        items={props.items}
        item={props.item}
        onChange={props.onChange}
        isDisabled={props.isDisabled}
      />
    </VStack>
  );
}

export default SmallLabelLocation;
