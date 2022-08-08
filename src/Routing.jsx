import React, { lazy, Suspense } from "react";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useStore as userStore } from "models/userStore";
import { Navigate } from "react-router";
// Pages
const Home = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Canvas = lazy(() => import("./pages/MapCanvasPage"));
const PageNotFound = lazy(() => import("./pages/404"));
const Auth = lazy(() => import("./pages/authentication/Auth"));

function Routing() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  // Check if the user is logged in, redirect to the connection page if not, otherwise go to the exact URL.
  function checkIsLoggedIn(route) {
    if (isLoggedIn) {
      return route;
    }
    return <Navigate to="/authentication" />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route
            path="/dashboard"
            element={checkIsLoggedIn(<Dashboard />)}
            exact
          />
          <Route
            path="/dashboard/:mapId"
            element={checkIsLoggedIn(<Canvas />)}
            exact
          />
          <Route path="/*" element={<PageNotFound />} />
          {/* If the user is forcing to go to the authentication page while he is connected, redirect him to the dashboard*/}
          <Route
            path="/authentication"
            element={!isLoggedIn ? <Auth /> : <Navigate to="/dashboard" />}
            exact
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Routing;
