import React from "react";
import {  Navigate } from "react-router-dom";


import useStatus from "./useStatus";
//import { useAppContext } from "../App";


import PropTypes from "prop-types";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default function UnauthenticatedRoute({children }) {



  const { status, error, isChecking } = useStatus();

  const redirect = querystring("redirect");

  let landingPage = "/dashboard";


  const getStatus = () => {
    if (error) return <h2>Error while checking: {error}</h2>;
    if (!status && isChecking) return <h2>Checking...</h2>;
   
    
    if (!status) return <React.Suspense fallback={"Loading routing..."}>{children} </React.Suspense>

    if (status && redirect!==null && redirect!=="") {
      landingPage=redirect;
    }

  return   <Navigate replace to={landingPage} />
  }
/*
  (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={redirect === "" || redirect === null ? landingPage : redirect}
        />
      )}
    </Route>
  );
*/
return <>
{!isChecking && getStatus()}
</>
  
}

UnauthenticatedRoute.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
