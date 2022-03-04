import React, { useState } from "react";
import TimePicker from "react-time-picker";

export default function SelectTime({getTime,validationtime}) {
  const [value, setVale] = useState(new Date().getHours().toString()+':'+new Date().getMinutes());
  return <TimePicker onChange={(e)=>{setVale(e);getTime(e)}} value={value} showTimeSelect />;
}
