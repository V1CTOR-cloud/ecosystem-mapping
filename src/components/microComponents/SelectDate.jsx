import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//export default function SelectDate({getDate, validationdate, strdateval, enddateval, IsEdit}) {
  export default function SelectDate({getDate, validationdate, date}) {
 
const [startDate, setStartDate] = useState(new Date());
useEffect(() => {
  setStartDate(new Date(date))
}, [date])
  const handleDateChange=(date)=>{
    setStartDate(date)
    getDate(date)
  }
  return (
    <DatePicker 
      minDate={validationdate} 
      selected={startDate} 
      onChange={(date) => handleDateChange(date)} 
      />

  );
}
