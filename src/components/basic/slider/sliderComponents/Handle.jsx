import React from "react";

import PropTypes from "prop-types";

import { blueColor } from "../../../../helper/constant";

function Handle(props) {
  const { handle, getHandleProps } = props;
  return (
    <div
      style={{
        left: `${handle.percent}%`,
        position: "absolute",
        zIndex: 3,
        marginTop: 6,
        marginLeft: -7.5,
        width: 15,
        height: 15,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "50%",
        backgroundColor: blueColor,
      }}
      {...getHandleProps(handle.id)}
    />
  );
}

Handle.propTypes = {
  handle: PropTypes.object.isRequired,
  getHandleProps: PropTypes.func.isRequired,
};

export default Handle;
