import React from "react";

import PropTypes from "prop-types";
import { Select, Text, VStack } from "@chakra-ui/react";

function SelectComponent(props) {
  const { initialValue, disabled, onChange, items, isWithLabel, label } = props;

  return (
    <VStack align="self-start" w="100%">
      {isWithLabel && (
        <Text fontSize={"xs"} color={"blackAlpha.600"}>
          {label}
        </Text>
      )}
      <Select
        w="100%"
        disabled={disabled}
        value={initialValue !== null ? initialValue : "Select option"}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="Select option">Select option</option>
        {items.map((item, index) => {
          return (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </Select>
    </VStack>
  );
}

export default SelectComponent;

SelectComponent.defaultProps = {
  initialValue: null,
  label: "Label",
  disabled: false,
  isWithLabel: false,
};

SelectComponent.propTypes = {
  /**
   * Allow the field to be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Add a label on top of the field if set to true.
   */
  isWithLabel: PropTypes.bool,
  /**
   * If the variable isWithLabel is set to true, then we can set the text for the label with this property.
   */
  label: PropTypes.string,
  /**
   * Allow the field to be set if a value was selected before, mainly for the edition in a form.
   */
  initialValue: PropTypes.string,
  /**
   * Select field that allow the user to pick through a predefined list of items.
   */
  items: PropTypes.array.isRequired,
  /**
   * Function that will update the value of the model with a setState for example.
   */
  onChange: PropTypes.func.isRequired,
};
