import React, { useEffect, useState } from "react";

import TimezonePicker from "react-timezone-select";
import { Box } from "@chakra-ui/react";

const TimezoneComponent = ({ getTimeZone, data }) => {
  const [val, setVal] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleDateChange = (data) => {
    setVal(data);
    getTimeZone(data);
  };

  useEffect(() => {
    setVal(data);
  }, [data]);

  return (
    <Box style={{ with: "100%" }}>
      <TimezonePicker
        value={val}
        onChange={(data) => handleDateChange(data)}
        className="timezone"
      />
    </Box>
  );
};

export default TimezoneComponent;
