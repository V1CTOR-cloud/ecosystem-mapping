import React from "react";

import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

function SmallTick(props) {
  const { tick, phase } = props;
  return (
    <Box
      position="absolute"
      marginLeft="-0.5px"
      width="5px"
      height="5px"
      backgroundColor={
        tick.value > phase[0] && tick.value < phase[1]
          ? "brand.300"
          : "blackAlpha.500"
      }
      transform="translate(-4px, 11px) rotate(45deg)"
      left={`${tick.percent}%`}
    />
  );
}

SmallTick.propTypes = {
  tick: PropTypes.object.isRequired,
  phase: PropTypes.array.isRequired,
};

export default SmallTick;
