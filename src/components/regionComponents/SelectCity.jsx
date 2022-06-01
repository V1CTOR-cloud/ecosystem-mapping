import React from "react";

import { Select, Box } from "@chakra-ui/react";

const SelectCity = (props) => {
  return (
    <Box>
      <Select
        size="sm"
        disabled={props.data.length <= 0}
        placeholder="Select City"
        value={props.city}
        onChange={(e) => props.selectedCity(e.target.value)}
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

export default SelectCity;
