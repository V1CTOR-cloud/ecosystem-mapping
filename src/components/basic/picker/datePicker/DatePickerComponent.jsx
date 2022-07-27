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

DatePickerComponent.defaultProps= {
  initialDate: new Date(),
}

DatePickerComponent.propTypes = {
  /**
   * The initial date to be displayed, by default it is the current date.
   */
  initialDate: PropTypes.instanceOf(Date),
  /**
   * Function to be called when the date is changed.
   */
  handleDateChange: PropTypes.func.isRequired,
};

export default DatePickerComponent;
