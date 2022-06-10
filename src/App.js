import React, { useEffect, useState } from "react";

import { Box, ChakraProvider, extendTheme, Grid } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

import "./assets/css/Style.scss";
import Routing from "./Routing";
import { fonts } from "./theme/fonts/fonts";
import { colors } from "./theme/colors/colors";
import { text } from "./theme/components/text";

const theme = extendTheme({
  fonts: fonts,
  colors: colors,
  components: {
    Text: text,
  },
});

function App() {
  const [resource, setResource] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://jqdryvpiqf.execute-api.us-east-2.amazonaws.com/default/i18reader"
      )
      .then((response) => {
        setResource(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: {
            ...resource.translation,
          },
        },
      },
      lng: "en",
      interpolation: {
        escapeValue: false,
      },
    })
    .then();

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh">
          {resource === "" ? <div>Loading...</div> : <Routing />}
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
