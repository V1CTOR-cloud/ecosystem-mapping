import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import Sandbox from "./pages/Sandbox";
import ListMapPage from "./pages/ListMapPage";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./assets/css/Style.scss";
import { isLoggedIn } from "service/AuthenticationService";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import axios from "axios";

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
                  isLoggedIn() ? <HomePage /> : <Redirect to="/" />
                }
              />
              <Route
                exact
                path="/sandbox"
                render={() =>
                  isLoggedIn() ? <Sandbox /> : <Redirect to="/" />
                }
              />
              <Route
                exact
                path="/ecosystemmap"
                render={() =>
                  isLoggedIn() ? <ListMapPage /> : <Redirect to="/" />
                }
              />
              <Route
                exact
                path="/services/:serviceId"
                render={() =>
                  isLoggedIn() ? <HomePage /> : <Redirect to="/" />
                }
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
