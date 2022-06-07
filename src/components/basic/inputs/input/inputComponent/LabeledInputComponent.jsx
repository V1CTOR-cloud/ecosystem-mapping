import React from "react";

import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

import LabelWithTooltip from "../../../labelWithTooltip/LabelWithTooltip";
import InputComponent from "./InputComponent";

function LabeledInputComponent(props) {
  const {
    tooltipText,
    tooltipAriaLabel,
    label,
    value,
    placeholder,
    handleOnChange,
    onChange,
  } = props;

  return (
    <Box>
      <LabelWithTooltip
        tooltipText={tooltipText}
        tooltipAriaLabel={tooltipAriaLabel}
        label={label}
      />
      <InputComponent
        value={value}
        placeholder={placeholder}
        handleOnChange={handleOnChange}
        onChange={onChange}
      />
    </Box>
  );
}

LabeledInputComponent.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  tooltipAriaLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(LabeledInputComponent);
