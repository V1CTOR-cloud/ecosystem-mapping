import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../../theme/theme";
import SliderComponent from "../../components/basic/slider/SliderComponent";

export default {
  title: "Mapping App/Basic/Slider",
  component: SliderComponent,
  parameters: {
    componentSubtitle:
      "Slider that allow the user to select the startup phases through predefined value -3 to 4.",
  },
  argTypes: {
    servicePhaseRange: {
      description:
        "Set the default value, by default it is set at -1.0 and 1.0 for the startPhase and endPhase.",
    },
  },
};

export function Slider(args) {
  return (
    <ChakraProvider theme={theme}>
      <SliderComponent {...args} />
    </ChakraProvider>
  );
}

Slider.args = {
  servicePhaseRange: {
    startPhase: -1.0,
    endPhase: 1.0,
  },
};
