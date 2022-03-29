import React from "react";
import { Button } from "@chakra-ui/react";

const ButtonComponent = (props) => {
  return (
    <Button
      margin={props.margin}
      onClick={props.onClick}
      isPrimary={props.isPrimary}
      fontFamily={"Ubuntu, sans-serif"}
      fontStyle={"normal"}
      fontWeight={"500"}
      height={"40px"}
      fontSize={"14px"}
      paddingX={"15px"}
      borderRadius={"8px"}
      boxShadow={"rgba(14, 94, 129, 0.2) 0px 4px 8px"}
      background={props.isPrimary ? "rgb(14, 94, 129)" : "rgb(255, 255, 255)"}
      border={props.isPrimary ? 0 : "2px solid rgb(14, 94, 129)"}
      color={props.isPrimary ? "rgb(255, 255, 255)" : "rgb(14, 94, 129)"}
      _hover={{ background: props.isPrimary ? "#1487B8" : "#EDF8FD" }}
    >
      {props.text}
    </Button>
  );
};

ButtonComponent.defaultProps = {
  isPrimary: false,
  margin: undefined,
};

export default ButtonComponent;
