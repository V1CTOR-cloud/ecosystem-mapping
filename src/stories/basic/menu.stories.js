import React from "react";

import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "../../theme/theme";
import MenuComponent from "../../components/basic/inputs/menu/MenuComponent";

export default {
  title: "Mapping App/Basic/Menu",
  component: MenuComponent,
  parameters: {
    componentSubtitle:
      "Allow the user to pick an item through a predefined selection.",
  },
  argTypes: {
    wantScroll: {
      description:
        "Boolean that either let the menu with a fixed height and to scroll inside when we reach a list with more than 11 element or to have the height defined by the number of element inside the list.",
    },
    isDisabled: {
      description: "Boolean that can disable the field if needed.",
    },
    initialValue: {
      description:
        "Initial value that is given to the menu. Useful if we are in edition mode.",
    },
    width: {
      description:
        "Can fix the width of this element by giving him a size in pixel.",
    },
    items: {
      description:
        "List of element that will be displayed in the menu overlay.",
    },
    onChange: {
      description:
        "Function that will update the value of the model with a setState for example.",
    },
  },
};

export function Menu(args) {
  return (
    <ChakraProvider theme={theme}>
      <MenuComponent {...args} />
    </ChakraProvider>
  );
}

Menu.args = {
  wantScroll: false,
  isDisabled: false,
  width: undefined,
  initialValue: "Default Item",
  items: [
    { id: 0, name: "Default Item" },
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ],
  onChange: () => {},
};
