import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";

const SelectDate = ({ getDate, validationDate, date }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    setStartDate(new Date(date));
  }, [date]);

  const handleDateChange = (date) => {
    setStartDate(date);
    getDate(date);
  };

  return (
    <DatePicker
      minDate={validationDate}
      selected={startDate}
      onChange={(date) => handleDateChange(date)}
    />
  );
};

export default SelectDate;
