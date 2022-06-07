import React, { useState } from "react";

import { Input } from "@chakra-ui/react";
import PropTypes from "prop-types";

import { blueColor, greyColor } from "../../../../../helper/constant";

function InputComponent(props) {
  const { propValue, onChange, isRequired, placeholder } = props;
  const [value, setValue] = useState(propValue);

  function handleOnChange(event) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <Input
      isRequired={isRequired}
      value={value}
      onChange={(event) => handleOnChange(event)}
      placeholder={placeholder}
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

InputComponent.propTypes = {
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  propValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(InputComponent);
