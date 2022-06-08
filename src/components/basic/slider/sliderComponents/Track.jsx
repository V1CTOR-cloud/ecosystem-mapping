import React from "react";

import PropTypes from "prop-types";

import { blueHoverColor, borderRadius } from "../../../../helper/constant";

function Track(props) {
  const { source, target } = props;
  return (
    <div
      style={{
        position: "absolute",
        height: 2.5,
        marginTop: "12.5px",
        zIndex: 2,
        backgroundColor: blueHoverColor,
        borderRadius: borderRadius,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
    />
  );
}

Track.propTypes = {
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

export default Track;
