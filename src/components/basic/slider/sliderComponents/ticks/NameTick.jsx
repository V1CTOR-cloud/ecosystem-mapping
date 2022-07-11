import React from "react";

import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

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
      <Box
        position="absolute"
        marginTop="-30px"
        marginLeft={index === 4 || index === 0 ? -17.5 : -25}
        fontSize="10px"
        color="blackAlpha.500"
        left={`${tick.percent}%`}
      >
        {phaseName}
      </Box>
      {index !== 6 ? (
        <Box
          position="absolute"
          color="blackAlpha.500"
          marginTop="-15px"
          marginLeft={`${-(100 / tick.length) / 2}%`}
          textAlign="center"
          width={`${100 / tick.length}%`}
          left={`${tick.percent}%`}
        >
          {tick.value - 0.5}
        </Box>
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
