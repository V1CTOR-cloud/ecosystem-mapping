import React from "react";

import { Text, VStack } from "@chakra-ui/react";

import MenuComponent from "../inputs/menu/MenuComponent";
import { greyTextColor, smallFontSize } from "../../../helper/constant";
import PropTypes from "prop-types";

function SmallLabelLocation(props) {
  const { label, wantScroll, items, item, onChange, isDisabled } = props;
  return (
    <VStack align="self-start">
      <Text fontSize={smallFontSize} color={greyTextColor}>
        {label}
      </Text>
      <MenuComponent
        wantScroll={wantScroll}
        width="140px"
        items={items}
        item={item}
        onChange={onChange}
        isDisabled={isDisabled}
      />
    </VStack>
  );
}

SmallLabelLocation.defaultProp = {
  isDisabled: false,
  wantScroll: false,
};

SmallLabelLocation.propTypes = {
  isDisabled: PropTypes.bool,
  wantScroll: PropTypes.bool,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SmallLabelLocation;
