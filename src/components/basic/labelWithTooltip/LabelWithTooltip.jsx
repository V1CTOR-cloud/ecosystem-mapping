import React from "react";
import { smallPadding } from "../../../helper/constant";
import { HStack, Text, Tooltip } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

function LabelWithTooltip(props) {
  return (
    <HStack marginBottom={smallPadding}>
      <Text marginRight={smallPadding}>{props.label}</Text>
      <Tooltip label={props.tooltipText} aria-label={props.tooltipAriaLabel}>
        <QuestionOutlineIcon w="12.5px" h="12.5px" />
      </Tooltip>
    </HStack>
  );
}

export default React.memo(LabelWithTooltip);