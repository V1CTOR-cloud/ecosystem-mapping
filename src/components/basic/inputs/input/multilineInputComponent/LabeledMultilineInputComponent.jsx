import React from "react";

import { Box } from "@chakra-ui/react";

import MultilineInputComponent from "./MultilineInputComponent";
import LabelWithTooltip from "../../../labelWithTooltip/LabelWithTooltip";

function LabeledMultilineInputComponent(props) {
  return (
    <Box>
      <LabelWithTooltip
        tooltipText={props.tooltipText}
        tooltipAriaLabel={props.tooltipAriaLabel}
        label={props.label}
      />
      <MultilineInputComponent
        value={props.value}
        placeholder={props.placeholder}
        handleOnChange={props.handleOnChange}
      />
    </Box>
  );
}

export default React.memo(LabeledMultilineInputComponent);
