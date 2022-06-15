import React, { useState } from "react";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import PropTypes from "prop-types";

function DatePickerComponent(props) {
  const { initialDate, handleDateChange } = props;
  const [value, setValue] = useState(initialDate);

  function handleOnChange(value) {
    setValue(new Date(value));
    handleDateChange(new Date(value));
  }

  return (
    <Flatpickr
      data-enable-time
      value={value}
      onChange={(date) => handleOnChange(date)}
      options={{ minuteIncrement: 1 }}
    />
  );
}

DatePickerComponent.propTypes = {
  initialDate: PropTypes.instanceOf(Date).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default DatePickerComponent;
