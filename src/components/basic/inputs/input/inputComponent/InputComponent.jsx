import React from "react";
import { Input } from "@chakra-ui/react";
import { blueColor, greyColor } from "../../../../../helper/constant";

function InputComponent(props) {
  return (
    <Input
      isRequired={props.isRequired}
      value={props.value}
      onChange={props.handleOnChange}
      placeholder={props.placeholder}
      size="md"
      border={`2px solid`}
      focusBorderColor={blueColor}
      borderColor={greyColor}
    />
  );
}

InputComponent.defaultProps = {
  isRequired: false,
};

export default React.memo(InputComponent);
