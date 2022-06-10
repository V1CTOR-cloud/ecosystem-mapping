import React from "react";

import { Box, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const ButtonComponent = (props) => {
  const {
    padding,
    as,
    bg,
    isPrimary,
    isSelected,
    width,
    propsBorderRadius,
    isWithoutBorder,
    color,
    icon,
    hover,
    onClick,
    buttonText,
  } = props;

  return (
    <Box padding={padding}>
      <Button
        as={as}
        bg={
          bg ? bg : isPrimary ? "brand.500" : isSelected ? "gray.200" : "white"
        }
        width={width}
        height="40px"
        paddingX={3}
        borderRadius={propsBorderRadius ? propsBorderRadius : "base"}
        border={isPrimary || isWithoutBorder ? 0 : "2px solid"}
        borderColor={"brand.500"}
        color={color ? color : isPrimary ? "white" : "brand.500"}
        leftIcon={icon}
        _hover={{
          bg: hover ? hover : isPrimary ? "brand.300" : "gray.100",
        }}
        _focus={{ boxShadow: "none" }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

// TODO changer boutton
Button.defaultProps = {
  fontWeight: "normal",
  _focus: {
    boxShadow: "none",
  },
  bg: "white",
  border: `2px solid ${"blackAlpha.700"}`,
  _active: {
    borderColor: "brand.500",
  },
  _hover: {
    bg: "gray.100",
  },
  overflow: "hidden",
  whiteSpace: "nonwrap",
};

ButtonComponent.defaultProps = {
  padding: "0 12px 0 12px",
  isPrimary: false,
  isSelected: false,
  isWithoutBorder: false,
  propsBorderRadius: undefined,
  as: undefined,
  bg: undefined,
  width: undefined,
  color: undefined,
  hover: undefined,
  icon: undefined,
};

ButtonComponent.propTypes = {
  isPrimary: PropTypes.bool,
  isSelected: PropTypes.bool,
  isWithoutBorder: PropTypes.bool,
  propsBorderRadius: PropTypes.string,
  as: PropTypes.string,
  bg: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  hover: PropTypes.string,
  padding: PropTypes.string,
  icon: PropTypes.element,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonComponent;
