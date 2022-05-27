import { useState } from "react";

import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

function DatePickerComponent(props) {
  const [value, setValue] = useState(props.date);

  function handleOnChange(value) {
    setValue(value);
    props.handleDateChange(value);
  }

  return (
    <Flatpickr
      data-enable-time
      value={value}
      onChange={(date) => handleOnChange(date)}
    />
  );
}

export default DatePickerComponent;
