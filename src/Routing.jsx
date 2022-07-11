import React, { lazy, Suspense } from "react";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import { Authentication } from "./service/authentication";

// Pages
const Home = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Canvas = lazy(() => import("./pages/MapCanvasPage"));

function Routing() {
  // TODO once the auth is ready check if the user is connected
  // const isLoggedIn = Authentication.isLoggedIn();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />
          <Route path="/dashboard/:mapId" element={<Canvas />} exact />
          <Route path="*" element={<div>404 Not found</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Routing;
