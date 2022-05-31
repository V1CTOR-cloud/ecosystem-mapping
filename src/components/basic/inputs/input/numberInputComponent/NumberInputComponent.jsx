import React, { useEffect, useState } from "react";

import { NumberInput, NumberInputField } from "@chakra-ui/react";

import { blueColor, greyColor } from "../../../../../helper/constant";

function NumberInputComponent(props) {
  const [value, setValue] = useState(props.value);
  const regex = RegExp("^(0|[1-9]\\d*)(\\.\\d*)?$");

  useEffect(() => {
    if (props.isBudget === true) {
      setValue(props.value);
    }
  });

  function handleOnChange(value) {
    // Use the regex to avoid the scientific number (with an e)
    if (regex.test(value) || value === "") {
      setValue(value);
      props.onChange(value);
    }
  }

  return (
    <NumberInput value={value} onChange={(value) => handleOnChange(value)}>
      <NumberInputField
        precision={2}
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
