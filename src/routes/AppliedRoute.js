import React from "react";

import PropTypes from "prop-types";
export default function AppliedRoute({ children }) {
  return  <React.Suspense fallback={"Loading routing..."}>{children} </React.Suspense>
}

AppliedRoute.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
}  
