import React, { memo, useState } from "react";

import { Textarea } from "@chakra-ui/react";

import { blueColor, greyColor } from "../../../../../helper/constant";

function MultilineInputComponent(props) {
  const [value, setValue] = useState(props.value);

  function handleOnChange(event) {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <Textarea
      isRequired={props.isRequired}
      value={value}
      onChange={handleOnChange}
      placeholder={props.placeholder}
      size="md"
      border={`2px solid`}
      focusBorderColor={blueColor}
      borderColor={greyColor}
    />
  );
}

export default memo(MultilineInputComponent);
