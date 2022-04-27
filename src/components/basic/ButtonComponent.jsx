import React from "react";

import { Box, Button } from "@chakra-ui/react";

import {
  blueColor,
  blueHoverColor,
  borderRadius,
  defaultFontFamily,
  defaultFontSize,
  smallPadding,
  whiteColor,
  whiteHoverColor,
} from "../../helper/constant";

const ButtonComponent = (props) => {
  return (
    <Box padding={props.padding}>
      <Button
        as={props.as}
        bg={props.isPrimary ? blueColor : whiteColor}
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
        _hover={{ bg: props.isPrimary ? blueHoverColor : whiteHoverColor }}
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
};

ButtonComponent.defaultProps = {
  isPrimary: false,
  isWithoutBorder: false,
  borderRadius: undefined,
  margin: undefined,
  as: undefined,
  width: undefined,
};

export default ButtonComponent;
