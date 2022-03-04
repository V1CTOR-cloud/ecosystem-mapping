import React, { useState, useEffect } from "react";
import TimezonePicker from "react-timezone-select";
import { Box } from '@chakra-ui/react';

const TimezoneComponent = ({getTimeZone, data}) => {
const [val,setVal]=useState(Intl.DateTimeFormat().resolvedOptions().timeZone)

//console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

  useEffect(() => {
    setVal(data);
  }, [data])
    const handleDateChange=(data)=>{
      setVal(data)
      getTimeZone(data)
    }
  
  // useEffect(() => {
  //   let data = ""
  //   if(IsEdit){
  //     setVal(data);
  //   }
  //   if(IsAdd){
  //     debugger
  //     let data = Intl.DateTimeFormat().resolvedOptions().timeZone
  //     setVal(data);
  //   }
  // }, [data, IsEdit, IsAdd])

  return (
    <Box  style={{with:"100%"}}>
      <TimezonePicker
        value={val}
        onChange={(data) => handleDateChange(data)} 
        className="timezone"
      />
    </Box>
  );
};
export { TimezoneComponent };
