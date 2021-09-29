import React from "react";
import { Box } from "@chakra-ui/react";
import { Image, Text } from "@chakra-ui/react";

export const LogoandTitle = ({ src, title }) => {
  return (
    <Box className="di-flex flex-1">
      {src !== undefined && <Image src={src.default} className="logo-mobile" />}
      <Text
        fontSize={{
          base: "26",
          md: "30px",
          lg: "36px",
          xl: "36px",
        }}
        className="events-title ellipse-text"
      >
        {title}
      </Text>
    </Box>
  );
};
