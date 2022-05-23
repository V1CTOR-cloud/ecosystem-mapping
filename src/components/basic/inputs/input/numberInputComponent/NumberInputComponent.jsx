import React, { useEffect, useState } from "react";

import { NumberInput, NumberInputField } from "@chakra-ui/react";

import { blueColor, greyColor } from "../../../../../helper/constant";

function NumberInputComponent(props) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    if (props.isBudget === true) {
      setValue(props.value);
    }
  });

  function handleOnChange(value) {
    setValue(value);
    props.onChange(value);
  }

  return (
    <NumberInput
      value={value}
      inputMode="numeric"
      onChange={(value) => handleOnChange(value)}
    >
      <NumberInputField
        placeholder={props.placeholder}
        size="md"
        border={`2px solid`}
        focusBorderColor={blueColor}
        borderColor={greyColor}
      />
    </NumberInput>
  );
}

NumberInputComponent.defaultProps = {
  isRequired: false,
};

export default React.memo(NumberInputComponent);
