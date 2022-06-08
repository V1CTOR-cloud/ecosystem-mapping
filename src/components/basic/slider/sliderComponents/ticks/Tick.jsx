import React from "react";
import { blueHoverColor, greyColor } from "../../../../../helper/constant";
import PropTypes from "prop-types";

function Tick(props) {
  const { index, tick, phase } = props;
  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          marginLeft: index === 0 ? 1 : index === 6 ? -1 : -0.5,
          width: 1,
          height: 20,
          marginTop: -5,
          borderRight: "dotted 2px",
          borderColor:
            tick.value > phase[0] && tick.value < phase[1]
              ? blueHoverColor
              : greyColor,
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: "absolute",
          marginLeft: index === 0 ? 1 : index === 6 ? -1 : -0.5,
          width: 10,
          height: 10,
          backgroundColor:
            tick.value > phase[0] && tick.value < phase[1]
              ? blueHoverColor
              : greyColor,
          rotate: "45deg",
          translate: "-4px 8px",
          left: `${tick.percent}%`,
        }}
      />
    </React.Fragment>
  );
}

Tick.propTypes = {
  index: PropTypes.number.isRequired,
  phase: PropTypes.array.isRequired,
  tick: PropTypes.object.isRequired,
};

export default Tick;
