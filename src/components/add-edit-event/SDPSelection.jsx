import React from "react";
import { Box } from "@chakra-ui/react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
const SDPSelection = ({getSelection}) => {
  const [value, setValue] = useState("");
  return (
    <Box>
      <RadioGroup onChange={(s)=>{setValue(s);getSelection(s)}} value={value}>
        <Stack direction="column">
          <Radio value="Automated">Automated</Radio>
          <Radio value="Manual">Manual</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export { SDPSelection };
