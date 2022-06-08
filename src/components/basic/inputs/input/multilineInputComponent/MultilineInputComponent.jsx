import React, { memo, useState } from "react";

import { Textarea } from "@chakra-ui/react";

import { blueColor, greyColor } from "../../../../../helper/constant";
import PropTypes from "prop-types";

function MultilineInputComponent(props) {
  const { propValue, onChange, placeholder } = props;
  const [value, setValue] = useState(propValue);

  function handleOnChange(event) {
    setValue(event.target.value);
    onChange(event.target.value);
  }

  return (
    <Textarea
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder}
      size="md"
      border={`2px solid`}
      focusBorderColor={blueColor}
      borderColor={greyColor}
    />
  );
}

MultilineInputComponent.propTypes = {
  placeholder: PropTypes.string.isRequired,
  propValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(MultilineInputComponent);
