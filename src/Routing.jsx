import React, { lazy, Suspense } from "react";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Authentication } from "./service/authentication";

// Pages
const Home = lazy(() => import("./pages/LandingPage"));
const MapList = lazy(() => import("./pages/ListMapPage"));
const Canvas = lazy(() => import("./pages/MapCanvasPage"));

function Routing() {
  const isLoggedIn = Authentication.isLoggedIn();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<MapList />} exact />
              <Route path="/dashboard/:mapId" element={<Canvas />} exact />
            </>
          ) : (
            <Route path="/" element={<Home />} exact />
          )}
          <Route path="*" element={<div>404 Not found</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Routing;
