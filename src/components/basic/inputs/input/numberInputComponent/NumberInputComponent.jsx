import React, { useState } from "react";

import { NumberInput, NumberInputField } from "@chakra-ui/react";
import PropTypes from "prop-types";

function NumberInputComponent(props) {
  const { initialValue, onChange, placeholder } = props;
  const [value, setValue] = useState(initialValue);
  const regex = RegExp("^(0|[1-9]\\d*)(\\.\\d*)?$");

  function handleOnChange(value) {
    // Use the regex to avoid the scientific number (with an e)
    if (regex.test(value) || value === "") {
      setValue(value);
      onChange(value);
    }
  }

  return (
    <NumberInput value={value} onChange={(value) => handleOnChange(value)}>
      <NumberInputField precision={2} placeholder={placeholder} />
    </NumberInput>
  );
}

NumberInputComponent.propTypes = {
  initialValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(NumberInputComponent);
