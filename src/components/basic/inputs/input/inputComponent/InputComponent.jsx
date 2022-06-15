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
  isRequired: PropTypes.bool,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(InputComponent);
