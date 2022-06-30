import React, { lazy, Suspense } from "react";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import { Authentication } from "./service/authentication";

// Pages
const Home = lazy(() => import("./pages/LandingPage"));
const MapList = lazy(() => import("./pages/ListMapPage"));
const Canvas = lazy(() => import("./pages/MapCanvasPage"));
const Auth = lazy(()=>import("./pages/authentication/Auth"));
const ContactDetails = lazy(()=>import("./pages/authentication/ContactDetails"));
const EmailVerification = lazy(()=>import("./pages/authentication/EmailVerification"));
const AccountCredentials = lazy(()=>import("./pages/authentication/AccountCredentials"));


function Routing() {
  // TODO once the auth is ready check if the user is connected
  // const isLoggedIn = Authentication.isLoggedIn();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/dashboard" element={<MapList />} exact />
          <Route path="/dashboard/:mapId" element={<Canvas />} exact />
          <Route path="/dashboard/:mapId" element={<Canvas />} exact />
          <Route path="/authentication" element={<Auth />} exact />
          <Route path="/contactdetails" element={<ContactDetails />} exact />
          <Route path="/emailverification" element={<EmailVerification/>} exact />
          <Route path="/credentials" element={<AccountCredentials/>} exact />
          <Route path="*" element={<div>404 Not found</div>} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default Routing;
