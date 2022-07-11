import React from "react";

import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

function Track(props) {
  const { source, target } = props;
  return (
    <Box
      position="absolute"
      height="2.5px"
      marginTop="12.5px"
      zIndex={2}
      backgroundColor="brand.300"
      borderRadius="base"
      cursor="pointer"
      left={`${source.percent}%`}
      width={`${target.percent - source.percent}%`}
    />
  );
}

Track.propTypes = {
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

export default Track;
