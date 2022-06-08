import React from "react";

import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

function IconButtonComponent(props) {
  const { height, width, onClick, icon } = props;
  return (
    <Box height={height} width={width} cursor="pointer" onClick={onClick}>
      {icon}
    </Box>
  );
}

IconButtonComponent.defaultProps = {
  height: "35px",
  width: "35px",
};

IconButtonComponent.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
};

export default React.memo(IconButtonComponent);
