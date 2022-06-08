import React from "react";

import { Box, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

import {
  blueColor,
  blueHoverColor,
  borderRadius,
  defaultFontFamily,
  defaultFontSize,
  greyColor,
  smallPadding,
  whiteActiveColor,
  whiteColor,
  whiteHoverColor,
} from "../../../helper/constant";

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
          bg
            ? bg
            : isPrimary
            ? blueColor
            : isSelected
            ? whiteActiveColor
            : whiteColor
        }
        width={width}
        height="40px"
        paddingX={smallPadding}
        borderRadius={propsBorderRadius ? propsBorderRadius : borderRadius}
        border={isPrimary || isWithoutBorder ? 0 : `2px solid ${blueColor}`}
        color={color ? color : isPrimary ? whiteColor : blueColor}
        leftIcon={icon}
        _hover={{
          bg: hover ? hover : isPrimary ? blueHoverColor : whiteHoverColor,
        }}
        _focus={{ boxShadow: "none" }}
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

Button.defaultProps = {
  fontSize: defaultFontSize,
  fontFamily: defaultFontFamily,
  fontWeight: "normal",
  _focus: {
    boxShadow: "none",
  },
  bg: whiteColor,
  border: `2px solid ${greyColor}`,
  _active: {
    borderColor: blueColor,
  },
  _hover: {
    bg: whiteHoverColor,
  },
  overflow: "hidden",
  whiteSpace: "nonwrap",
};

ButtonComponent.defaultProps = {
  padding: `0 ${smallPadding} 0 ${smallPadding}`,
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
