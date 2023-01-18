import React from "react";

import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

function NameTick(props) {
  const { index, tick, count } = props;
  let phaseName;
  //console.log("TICK ", index, tick);

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
        marginTop="-45px"
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
          marginTop="-30px"
          marginLeft={`${-(100 / count) / 2}%`}
          textAlign="center"
          width={`${100 / count}%`}
          left={`${tick.percent}%`}
        >
          {tick.value}
        </Box>
      ) : (
        <div />
      )}
    </React.Fragment>
  );
}

NameTick.propTypes = {
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  tick: PropTypes.object.isRequired,
};

export default NameTick;
