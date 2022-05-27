import React from "react";

import { Box } from "@chakra-ui/react";

import LabelWithTooltip from "../../labelWithTooltip/LabelWithTooltip";
import MenuComponent from "./MenuComponent";

function LabeledMenu(props) {
  return (
    <Box>
      <LabelWithTooltip
        tooltipText={props.tooltipText}
        tooltipAriaLabel={props.tooltipAriaLabel}
        label={props.label}
      />
      <MenuComponent
        item={props.item}
        items={props.items}
        onChange={props.onChange}
      />
    </Box>
  );
}

export default React.memo(LabeledMenu);
