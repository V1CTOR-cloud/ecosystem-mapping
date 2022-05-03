import React from "react";

import { Box } from "@chakra-ui/react";

import LabelWithTooltip from "../../../labelWithTooltip/LabelWithTooltip";
import InputComponent from "./InputComponent";

function LabeledInputComponent(props) {
  return (
    <Box>
      <LabelWithTooltip
        tooltipText={props.tooltipText}
        tooltipAriaLabel={props.tooltipAriaLabel}
        label={props.label}
      />
      <InputComponent
        value={props.value}
        placeholder={props.placeholder}
        handleOnChange={props.handleOnChange}
      />
    </Box>
  );
}

export default React.memo(LabeledInputComponent);
