import React from "react";

import PropTypes from "prop-types";

import { defaultFontSize, greyTextColor } from "../../../../../helper/constant";

function NameTick(props) {
  const { index, tick } = props;
  let phaseName;

  switch (index) {
    case 0:
      phaseName = "Ideating";
      break;
    case 1:
      phaseName = "Concepting";
      break;
    case 2:
      phaseName = "Committing";
      break;
    case 3:
      phaseName = "Validating";
      break;
    case 4:
      phaseName = "Scaling";
      break;
    default:
      phaseName = "Establishing";
      break;
  }

  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          marginTop: -30,
          marginLeft: index === 4 || index === 0 ? -17.5 : -25,
          fontSize: 10,
          color: greyTextColor,
          fontFamily: "Ubuntu, sans serif",
          left: `${tick.percent}%`,
        }}
      >
        {phaseName}
      </div>
      {index !== 6 ? (
        <div
          style={{
            position: "absolute",
            fontSize: defaultFontSize,
            color: greyTextColor,
            fontFamily: "Ubuntu, sans serif",
            marginTop: -15,
            textAlign: "center",
            marginLeft: `${-(100 / tick.length) / 2}%`,
            width: `${100 / tick.length}%`,
            left: `${tick.percent}%`,
          }}
        >
          {tick.value - 0.5}
        </div>
      ) : (
        <div />
      )}
    </React.Fragment>
  );
}

NameTick.propTypes = {
  index: PropTypes.number.isRequired,
  tick: PropTypes.object.isRequired,
};

export default NameTick;
