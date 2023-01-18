import React from "react";
import {  Navigate, useLocation } from "react-router-dom";

//import { useAppContext } from "../App";

//import { useStore as userStore } from "../models/userStore";
import useStatus from "./useStatus";

import PropTypes from "prop-types";

export default function AuthenticatedRoute({ children}) {
  const { pathname, search } = useLocation();
  const { status, error, isChecking } = useStatus();

  const getStatus = () => {
    if (error) return <h2>Error while checking: {error}</h2>;
    if (!status && isChecking) return <h2>Checking...</h2>;
    if (!status) return <Navigate replace to={`/login?redirect=${pathname}${search}`} />


  return <React.Suspense fallback={"Loading routing..."}>{children}</React.Suspense>
  }
  //const isLoggedIn = userStore((state) => state.isLoggedIn);
  //const { isAuthenticated, currentUser } = useAppContext();

  //const isAuthenticated=isLoggedIn();

  //console.log("AUTH ROUTE ", isAuthenticated);  // promise ???
 
  return <>
      {!isChecking && getStatus()}
      </>
  
}


AuthenticatedRoute.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};