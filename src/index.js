import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <ColorModeScript />
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </>
);
