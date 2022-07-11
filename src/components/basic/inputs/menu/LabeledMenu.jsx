import React from "react";

import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import MenuComponent from "./MenuComponent";

function LabeledMenu(props) {
  const {
    tooltipText,
    tooltipAriaLabel,
    label,
    initialValue,
    items,
    onChange,
  } = props;
  return (
    <Box>
      <LabelWithTooltip
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
        label={label}
      />
      <MenuComponent
        initialValue={initialValue}
        items={items}
        onChange={onChange}
      />
    </Box>
  );
}

LabeledMenu.propTypes = {
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

export default LabeledMenu;
