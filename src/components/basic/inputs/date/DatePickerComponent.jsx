import { useState } from "react";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

function DatePickerComponent(props) {
  const [value, setValue] = useState(props.date);

  function handleOnChange(value) {
    setValue(new Date(value));
    props.handleDateChange(new Date(value));
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

export default DatePickerComponent;
