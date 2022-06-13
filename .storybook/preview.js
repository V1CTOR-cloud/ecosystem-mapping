import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";

import { theme } from "../src/theme/theme";

export const withChakra = () => {
  return (
    <ChakraProvider theme={theme}>
      <StoryFn />
    </ChakraProvider>
  );
};
