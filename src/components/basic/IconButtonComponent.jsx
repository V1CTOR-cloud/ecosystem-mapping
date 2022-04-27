import React from "react";

import { Box } from "@chakra-ui/react";

function IconButtonComponent(props) {
  return (
    <Box
      height={props.height}
      width={props.width}
      cursor="pointer"
      onClick={props.onClick}
    >
      {props.icon}
    </Box>
  );
}

IconButtonComponent.defaultProps = {
  height: "35px",
  width: "35px",
};

export default IconButtonComponent;
