import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import * as React from "react"



export const withChakra = () => {

  return (
    <ChakraProvider theme={theme}>
        <StoryFn />
    </ChakraProvider>
  )
}

