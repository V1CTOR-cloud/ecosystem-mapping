import React from "react";

import { Box } from "@chakra-ui/react";

import SelectComponent from "./SelectComponent";
import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import PropTypes from "prop-types";

export default function LabeledSelect({
  tooltipText,
  tooltipAriaLabel,
  label,
  initialValue,
  items,
  onChange,
}) {
  return (
    <Box maxWidth="200px">
      <LabelWithTooltip
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
        label={label}
      />
      <SelectComponent
        onChange={onChange}
        items={items}
        initialValue={initialValue}
      />
    </Box>
  );
}

LabeledSelect.propTypes = {
  /**
   * Array of object that are all the items available inside the overlay for the user to choose.
   */
  items: PropTypes.array.isRequired,
  /**
   * Text inside the tooltip to help the user understand the meaning of the label.
   */
  tooltipText: PropTypes.string.isRequired,
  /**
   * Text that will be read for the screen readers.
   */
  tooltipAriaLabel: PropTypes.string.isRequired,
  /**
   * Text to indicate to the user what the field corresponding to.
   */
  label: PropTypes.string.isRequired,
  /**
   * Initial value of the field. Useful when we are in edition mode.
   */
  initialValue: PropTypes.string.isRequired,
  /**
   * Function that will update the value of the model with a setState for example.
   */
  onChange: PropTypes.func.isRequired,
};
