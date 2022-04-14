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
        height="40px"
        paddingX={smallPadding}
        borderRadius={borderRadius}
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
  defaultFontFamily,
};

ButtonComponent.defaultProps = {
  isPrimary: false,
  isWithoutBorder: false,
  margin: undefined,
  as: undefined,
};

export default ButtonComponent;
