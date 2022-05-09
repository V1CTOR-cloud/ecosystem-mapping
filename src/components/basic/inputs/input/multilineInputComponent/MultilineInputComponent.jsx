import React, { memo } from "react";

import { Textarea } from "@chakra-ui/react";

import { blueColor, greyColor } from "../../../../../helper/constant";

function MultilineInputComponent(props) {
  return (
    <Textarea
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

export default memo(MultilineInputComponent);
