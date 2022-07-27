import React, { useState } from "react";

import { Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

function InputComponent(props) {
  const { initialValue, onChange, isRequired, placeholder } = props;
  const [value, setValue] = useState(initialValue);

  function handleOnChange(event) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <Input
      variant="outline"
      isRequired={isRequired}
      value={value}
      onChange={(event) => handleOnChange(event)}
      placeholder={placeholder}
    />
  );
}

InputComponent.defaultProps = {
  isRequired: false,
};

InputComponent.propTypes = {
  /**
   * Determine if the field is mandatory, if this is the case, then we should wrap this component with a formControl tag.
   */
  isRequired: PropTypes.bool,
  /**
   * Initial value of the input.
   */
  initialValue: PropTypes.string,
  /**
   * Text displayed if the input is empty to indicate the user what to type.
   */
  placeholder: PropTypes.string.isRequired,
  /**
   * Function to be called when the value of the input is changed.
   */
  onChange: PropTypes.func.isRequired,
};

export default InputComponent;
