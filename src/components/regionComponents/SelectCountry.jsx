import React from "react";

import { Select, Box } from "@chakra-ui/react";

const SelectCountry = (props) => {
  return (
    <Box>
      <Select
        size="sm"
        disabled={props.data.length <= 0}
        placeholder="Select Country"
        value={props.country}
        onChange={(e) => {
          props.selectedCountry(e.target.value);
        }}
      >
        {props.data.length > 0 &&
          props.data.map((p, key) => {
            return (
              <option value={p.name} key={key}>
                {p.name}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

export default SelectCountry;
