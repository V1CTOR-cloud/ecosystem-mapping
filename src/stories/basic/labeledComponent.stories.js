import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../../theme/theme";
import LabeledInputComponent from "../../components/basic/inputs/input/inputComponent/LabeledInputComponent";
import LabeledMultilineInputComponent from "../../components/basic/inputs/input/multilineInputComponent/LabeledMultilineInputComponent";

export default {
  title: "Mapping App/Basic/Label/Labeled component",
  component: LabeledInputComponent,
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
    initialValue: {
      description:
        "Value that is given to the field during the first render of the component.",
    },
    placeholder: {
      description:
        "Text that will be displayed if the input is empty. It indicate what to type to the user.",
    },
  },
};

export function LabeledClassicInput(args) {
  return (
    <ChakraProvider theme={theme}>
      <LabeledInputComponent {...args} onChange={() => {}} />
    </ChakraProvider>
  );
}

LabeledClassicInput.args = {
  label: "Label",
  tooltipText: "Tooltip text",
  tooltipAriaLabel: "Label",
  initialValue: "Initial Value",
  placeholder: "Placeholder",
};

export function LabeledMultiline(args) {
  return (
    <ChakraProvider theme={theme}>
      <LabeledMultilineInputComponent {...args} onChange={() => {}} />
    </ChakraProvider>
  );
}

LabeledMultiline.args = {
  ...LabeledClassicInput.args,
};
