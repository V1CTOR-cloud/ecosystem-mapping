import React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { Event } from "pages/EventListing";
import { Classifier } from "pages/Classifier";
import { ShowClassfier } from "pages/ShowClassfier"
import { ClassifierPage } from "pages/ClassifierPage"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {

  return (
    <div>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Router>
            <Switch>
              <Route exact path="/" component={Event} />
              <Route exact path="/createClassifier" component={Classifier} />
              <Route exact path="/showClassifier" component={ShowClassfier} />
              <Route exact path="/pageClassifier" component={ClassifierPage} />
            </Switch>
          </Router>
        </Box>
      </ChakraProvider>
    </div>
  );
}

export default App;
