import React from "react";

import { Box } from "@chakra-ui/react";

import MultilineInputComponent from "./MultilineInputComponent";
import LabelWithTooltip from "../../../labelWithTooltip/LabelWithTooltip";
import PropTypes from "prop-types";

function LabeledMultilineInputComponent(props) {
  const { tooltipText, tooltipAriaLabel, label, value, placeholder, onChange } =
    props;

  return (
    <Box>
      <LabelWithTooltip
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
        label={label}
      />
      <MultilineInputComponent
        propValue={value}
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
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LabeledMultilineInputComponent);
