import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../../theme/theme";
import LabelWithTooltip from "../../components/basic/labelWithTooltip/LabelWithTooltip";

export default {
  title: "Mapping App/Basic/Label",
  component: LabelWithTooltip,
  parameters: {
    componentSubtitle:
      "Text with a tooltip that help the user understand the meaning of the text.",
  },
  argTypes: {
    label: {
      description: "Text that is display to the user to indicate something.",
    },
    tooltipText: {
      description:
        "Text that will be displayed inside the tooltip to help the user understand the meaning of the label.",
    },
    tooltipAriaLabel: {
      description: "Text that will be read for the screen readers",
    },
  },
};

export function Label(args) {
  return (
    <ChakraProvider theme={theme}>
      <LabelWithTooltip {...args} />
    </ChakraProvider>
  );
}

Label.args = {
  label: "Label",
  tooltipText: "Tooltip text",
  tooltipAriaLabel: "Label",
};
