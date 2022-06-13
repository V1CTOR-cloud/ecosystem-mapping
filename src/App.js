import React, { createContext, useEffect, useState } from "react";

import { Box, ChakraProvider, Grid, Text } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

import "./assets/css/Style.scss";
import Routing from "./Routing";
import { theme } from "./theme/theme";
import { Location } from "./service/location";
import { Industry } from "./service/industry";

export const AppProvider = createContext({});

function App() {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const locationsPromise = new Promise((resolve, reject) => {
      Location.getAllLocations()
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });

    const industriesPromise = new Promise((resolve, reject) => {
      Industry.getAllIndustries()
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });

    const translationPromise = new Promise((resolve, reject) => {
      axios
        .get(
          "https://jqdryvpiqf.execute-api.us-east-2.amazonaws.com/default/i18reader"
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });

    Promise.all([locationsPromise, industriesPromise, translationPromise])
      .then((values) => {
        // Set the translation
        i18n
          .use(initReactI18next)
          .init({
            resources: {
              en: {
                translation: {
                  ...values[2].translation,
                },
              },
            },
            lng: "en",
            interpolation: {
              escapeValue: false,
            },
          })
          .then();

        const formattedLocations = Location.formatLocations(values[0]);

        setData({ locations: formattedLocations, industries: values[1] });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AppProvider.Provider value={data}>
        <Box fontSize="xl">
          <Grid minH="100vh">
            {data ? <Routing /> : <Text>Loading...</Text>}
          </Grid>
        </Box>
      </AppProvider.Provider>
    </ChakraProvider>
  );
}

export default App;
