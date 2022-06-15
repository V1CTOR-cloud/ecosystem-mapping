import React, { useEffect, useState } from "react";

import { Box, ChakraProvider, Grid, theme } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

import "./assets/css/Style.scss";
import LandingPage from "./pages/LandingPage";
import ListMapPage from "./pages/ListMapPage";
import MapCanvasPage from "./pages/MapCanvasPage";
import { Authentication } from "./service/authentication";
import Auth from './pages/Auth';

function App() {
  const [resource, setresource] = useState("");
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://jqdryvpiqf.execute-api.us-east-2.amazonaws.com/default/i18reader"
      )
      .then((response) => {
        setresource(response.data);
        setFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (fetched) {
    i18n.use(initReactI18next).init({
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
    });
  }

  return fetched ? (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh">
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                exact
                path="/home"
                render={() =>
                  Authentication.isLoggedIn() ? <MapCanvasPage /> : <Redirect to="/" />
                }
              />
              <Route
                exact
                path="/ecosystemmap"
                render={() =>
                  Authentication.isLoggedIn() ? <ListMapPage /> : <Redirect to="/" />
                }
              />
               <Route
                exact
                path="/authentication"
                render={() =>
                  Authentication.isLoggedIn() ? <Auth /> : <Redirect to="/" />
                }
               />
              <Route
                exact
                path="/services/:serviceId"
                render={() => {
                  const pathName = window.location.pathname.toString();
                  const pathNameSplit = pathName.split("/");
                  const mapId = pathNameSplit[2];

                  return Authentication.isLoggedIn() ? (
                    <MapCanvasPage mapId={mapId} />
                  ) : (
                    <Redirect to="/" />
                  );
                }}
              />
              <Route render={() => <LandingPage />} />
            </Switch>
          </Router>
        </Grid>
      </Box>
    </ChakraProvider>
  ) : (
    <Box>Loading...</Box>
  );
}

export default App;
