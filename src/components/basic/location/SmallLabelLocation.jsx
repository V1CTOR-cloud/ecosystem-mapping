import React from "react";

import { Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

import MenuComponent from "../inputs/menu/MenuComponent";

function SmallLabelLocation(props) {
  const { label, wantScroll, items, item, onChange, isDisabled } = props;
  return (
    <VStack align="self-start">
      <Text fontSize={"xs"} color={"blackAlpha.600"}>
        {label}
      </Text>
      <MenuComponent
        wantScroll={wantScroll}
        width="140px"
        items={items}
        initialValue={item}
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
  item: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SmallLabelLocation;
