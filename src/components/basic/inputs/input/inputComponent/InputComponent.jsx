import React, { useState } from "react";

import { Input } from "@chakra-ui/react";

import { blueColor, greyColor } from "../../../../../helper/constant";

function InputComponent(props) {
  const [value, setValue] = useState(props.value);

  function handleOnChange(event) {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <Input
      isRequired={props.isRequired}
      value={value}
      onChange={(event) => handleOnChange(event)}
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
