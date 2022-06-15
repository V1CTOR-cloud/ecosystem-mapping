import React from "react";

import { Button } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";

import { withChakra } from "../../../.storybook/preview";

export default {
  title: "Mapping App/Basic/Button",
  component: Button,
  decorators: [withChakra],
  parameters: {
    componentSubtitle:
      "Displays a button with different color depending of the use case.",
  },
  argTypes: {
    variant: {
      defaultValue: { summary: "solid" },
      description: "Parameter that can change the overall theme of the button.",
      control: {
        type: "select",
        options: ["solid", "outline", "ghost", "greyGhost", "blackGhost"],
      },
    },
    text: {
      description: "Text that will be displayed inside the button.",
    },
  },
};

const Template = (args) => (
  <Button {...args} onClick={action("button-Click")}>
    {args.text}
  </Button>
);

export const Primary = Template.bind({});

Primary.args = {
  text: "Button",
  variant: "solid",
};

export const Outline = Template.bind({});
Outline.args = { ...Primary.args, variant: "outline" };

export const Ghost = Template.bind({});
Ghost.args = { ...Primary.args, variant: "ghost" };

export const GreyGhost = Template.bind({});
GreyGhost.args = { ...Primary.args, variant: "greyGhost" };

export const BlackGhost = Template.bind({});
BlackGhost.args = { ...Primary.args, variant: "blackGhost" };
