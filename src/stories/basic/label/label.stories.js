import React from "react";

import { Box } from "@chakra-ui/react";

import LabelWithTooltip from "../../../components/basic/labelWithTooltip/LabelWithTooltip";
import LabeledInputComponent from "../../../components/basic/inputs/input/inputComponent/LabeledInputComponent";
import LabeledMultilineInputComponent from "../../../components/basic/inputs/input/multilineInputComponent/LabeledMultilineInputComponent";
import LabeledMenu from "../../../components/basic/inputs/menu/LabeledMenu";

import LabeledDatePickerComponent from "../../../components/basic/inputs/date/LabeledDatePickerComponent";
import LabeledBudgetInputComponent from "../../../components/basic/inputs/budget/LabeledBudgetInputComponent";
import { withChakra } from "../../../../.storybook/preview";

const doc = {
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
};

export default {
  title: "Mapping App/Basic/Label",
  component: LabelWithTooltip,
  subcomponents: {
    "Labeled Input": LabeledInputComponent,
    "Labeled Multiline": LabeledMultilineInputComponent,
    "Labeled Menu": LabeledMenu,
    "Labeled Date Picker": LabeledDatePickerComponent,
    "Labeled Budget ": LabeledBudgetInputComponent,
  },
  decorators: [withChakra],
  parameters: {
    componentSubtitle:
      "Text with a tooltip that help the user understand the meaning of the text.",
  },
  argTypes: { ...doc },
};

export function Label(args) {
  return <LabelWithTooltip {...args} />;
}

Label.args = {
  label: "Label",
  tooltipText: "Tooltip text",
  tooltipAriaLabel: "Label",
};

export function LabelClassicInput(args) {
  return <LabeledInputComponent {...args} onChange={() => {}} />;
}

LabelClassicInput.args = {
  ...Label.args,
  initialValue: "Initial Value",
  placeholder: "Placeholder",
};

export function LabelMultiline(args) {
  return <LabeledMultilineInputComponent {...args} onChange={() => {}} />;
}

LabelMultiline.args = {
  ...LabelClassicInput.args,
};

export function LabelMenu(args) {
  return <LabeledMenu {...args} onChange={() => {}} />;
}

LabelMenu.args = {
  ...Label.args,
  initialValue: "Default Item",
  items: [
    { id: 0, name: "Default Item" },
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ],
};

export function LabelDatePicker(args) {
  return (
    <Box w="300px">
      <LabeledDatePickerComponent
        {...args}
        onChangeStartTime={() => {}}
        onChangeEndTime={() => {}}
      />
    </Box>
  );
}

LabelDatePicker.args = {
  ...Label.args,
  serviceStartTime: new Date(),
  serviceEndTime: new Date(),
};

export function LabelBudget(args) {
  return <LabeledBudgetInputComponent {...args} onChange={() => {}} />;
}

LabelBudget.args = {
  ...Label.args,
  initialBudgets: [
    { budgetTitle: "Title", budgetValue: "3", budgetCurrency: "€" },
  ],
};
