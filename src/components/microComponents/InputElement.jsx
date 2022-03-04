import React from "react";
import { Input } from "@chakra-ui/react";

const InputElement = ({ inputValue }) => {
  return (
    <Input
      onChange={(e) => {
        inputValue(e.target.value);
      }}
      className="fm-ip-flds"
    />
  );
};

export default InputElement;
