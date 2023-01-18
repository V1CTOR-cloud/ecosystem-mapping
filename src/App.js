import React, { createContext, useEffect, useReducer,useContext } from "react";

import { Box, ChakraProvider, Grid, Text } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//import axios from "axios";
//import Amplify from "aws-amplify";

import "./assets/css/Style.scss";
//import Routing from "./Routing";
import Routes from "./routes/AppRouterDynamic";
import { theme } from "./theme/theme";
import { Location } from "./service/location";
import { Industry } from "./service/industry";
import { UserProvider } from "./models/userStore";
//import { awsConfiguration } from "./aws-configuration";

//Amplify.configure(awsConfiguration);

import translations from "./lib/locales/en.js";

export const AppProvider = createContext({});


export function useAppContext() {
  return useContext(AppProvider);
}

function App() {


 // const [data, setData] = useState(undefined);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isLoading: true,
      currentUser: {},
      locations: {},
      industries: {},
      isApp: true,
      isAuthenticated: false
    },
  );



  useEffect(() => {
    // Set the translation
    i18n.use(initReactI18next).init({
            resources: {
              en: {
                translation: {
                  ...translations,
                },
              },
            },
            lng: "en",
            interpolation: {
              escapeValue: false,
            },
          })
          .then();

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

    /*
    const translationPromise = new Promise((resolve, reject) => {
      axios
        .get(
          "https://jqdryvpiqf.execute-api.us-east-2.amazonaws.com/default/i18reader"
        )
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
    */

    Promise.all([locationsPromise, industriesPromise])
      .then((values) => {
      
        const formattedLocations = Location.formatLocations(values[0]);

        
        setState({
          locations: formattedLocations,
          industries: values[1].industries,
          isApp: true,
          isLoading:false
        });
        
      })
      .catch((error) => console.log(error));
  }, []);


  const userAuth = auth => {
    console.log("AUTH SET ", state.isAuthenticated, auth);
    if (state.isAuthenticated && !auth) {
        /*
        Auth.signOut().then(() => {
          setState({ isAuthenticated: auth });
          history.replace("/");
        });
      */
    } else {
      setState({ isAuthenticated: auth });
    }
  };


  const { currentUser, isLoading, isAuthenticated, locations,industries,isApp } =
    state;

  return (
    <ChakraProvider theme={theme}>
      <AppProvider.Provider  value={{
        isAuthenticated,
        currentUser,
        userAuth,
        locations,
        industries,
        isApp,
      }}>
        <UserProvider>
        
          <Box fontSize="xl">
            <Grid minH="100vh">
              {isLoading ? <Text>Loading...</Text>:<Routes /> }
            </Grid>
          </Box>
         
        </UserProvider>
      </AppProvider.Provider>
    </ChakraProvider>
  );
}

export default App;
