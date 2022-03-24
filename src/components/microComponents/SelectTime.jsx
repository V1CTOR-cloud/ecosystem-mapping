import React, { useState } from "react";

import TimePicker from "react-time-picker";

const SelectTime = ({ getTime }) => {
  const [value, setVale] = useState(
    new Date().getHours().toString() + ":" + new Date().getMinutes()
  );

  const handleTimeChange = (time) => {
    setVale(time);
    getTime(time);
  };

  return (
    <TimePicker
      onChange={(time) => handleTimeChange(time)}
      value={value}
      showTimeSelect
    />
  );
};

export default SelectTime;
