import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

function DatePickerComponent(props) {
  return (
    <Flatpickr
      data-enable-time
      value={props.date}
      onChange={(date) => {
        props.handleDateChange(date);
      }}
    />
  );
}

export default DatePickerComponent;
