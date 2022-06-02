import React from "react";

import { Box, Button } from "@chakra-ui/react";

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
  return (
    <Box padding={props.padding}>
      <Button
        as={props.as}
        bg={
          props.bg
            ? props.bg
            : props.isPrimary
            ? blueColor
            : props.isSelected
            ? whiteActiveColor
            : whiteColor
        }
        width={props.width}
        height="40px"
        paddingX={smallPadding}
        borderRadius={props.borderRadius ? props.borderRadius : borderRadius}
        border={
          props.isPrimary || props.isWithoutBorder
            ? 0
            : `2px solid ${blueColor}`
        }
        color={
          props.color ? props.color : props.isPrimary ? whiteColor : blueColor
        }
        leftIcon={props.icon}
        _hover={{
          bg: props.hover
            ? props.hover
            : props.isPrimary
            ? blueHoverColor
            : whiteHoverColor,
        }}
        _focus={{ boxShadow: "none" }}
        onClick={props.onClick}
      >
        {props.buttonText}
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
  isPrimary: false,
  isSelected: false,
  isWithoutBorder: false,
  borderRadius: undefined,
  margin: undefined,
  as: undefined,
  width: undefined,
};

export default ButtonComponent;
