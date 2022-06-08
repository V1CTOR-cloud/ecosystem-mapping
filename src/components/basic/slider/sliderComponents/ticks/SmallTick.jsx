import React from "react";

import PropTypes from "prop-types";

import { blueHoverColor, greyColor } from "../../../../../helper/constant";

function SmallTick(props) {
  const { tick, phase } = props;
  return (
    <div
      style={{
        position: "absolute",
        marginLeft: -0.5,
        width: 5,
        height: 5,
        backgroundColor:
          tick.value > phase[0] && tick.value < phase[1]
            ? blueHoverColor
            : greyColor,
        rotate: "45deg",
        translate: "-4px 11px",
        left: `${tick.percent}%`,
      }}
    />
  );
}

SmallTick.propTypes = {
  tick: PropTypes.object.isRequired,
  phase: PropTypes.array.isRequired,
};

export default SmallTick;
