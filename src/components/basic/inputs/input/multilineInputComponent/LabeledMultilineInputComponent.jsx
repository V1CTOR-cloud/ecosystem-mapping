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
  tooltipText: PropTypes.string.isRequired,
  tooltipAriaLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LabeledMultilineInputComponent);
