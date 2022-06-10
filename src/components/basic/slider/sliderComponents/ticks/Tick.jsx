import React from "react";

import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

function Tick(props) {
  const { tick, phase } = props;
  return (
    <>
      <Box
        position="absolute"
        width="1px"
        height="12px"
        marginTop="-5px"
        borderRight="dotted 2px"
        borderColor={
          tick.value > phase[0] && tick.value < phase[1]
            ? "brand.300"
            : "blackAlpha.500"
        }
        left={`${tick.percent}%`}
      />
      <Box
        position="absolute"
        width="10px"
        height="10px"
        backgroundColor={
          tick.value > phase[0] && tick.value < phase[1]
            ? "brand.300"
            : "blackAlpha.500"
        }
        transform="translate(-4px, 8px) rotate(45deg)"
        left={`${tick.percent}%`}
      />
    </>
  );
}

Tick.propTypes = {
  index: PropTypes.number.isRequired,
  phase: PropTypes.array.isRequired,
  tick: PropTypes.object.isRequired,
};

export default Tick;
