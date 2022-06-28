import React from "react";

import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import MultilineInputComponent from "./MultilineInputComponent";
import LabelWithTooltip from "../../../labelWithTooltip/LabelWithTooltip";

function LabeledMultilineInputComponent(props) {
  const {
    tooltipText,
    tooltipAriaLabel,
    label,
    initialValue,
    placeholder,
    onChange,
  } = props;

  return (
    <Box>
      <LabelWithTooltip
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
        label={label}
      />
      <MultilineInputComponent
        initialValue={initialValue}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Box>
  );
}

LabeledMultilineInputComponent.propTypes = {
  /**
   * Text inside the tooltip to help the user understand the meaning of the label.
   */
  tooltipText: PropTypes.string.isRequired,
  /**
   * Text that will be read for the screen readers.
   */
  tooltipAriaLabel: PropTypes.string.isRequired,
  /**
   * Text to indicate to the user what the input corresponding to.
   */
  label: PropTypes.string.isRequired,
  /**
   * Initial value of the field. Useful when we are in edition mode.
   */
  initialValue: PropTypes.string.isRequired,
  /**
   * Text displayed if the input is empty. Indicate the kind of data that we want in the field.
   */
  placeholder: PropTypes.string.isRequired,
  /**
   * Function that will update the value of the model with a setState for example.
   */
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LabeledMultilineInputComponent);
