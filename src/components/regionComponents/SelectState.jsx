import React from "react";

import { Select, Box } from "@chakra-ui/react";

const SelectState = (props) => {
  return (
    <Box>
      <Select
        size="sm"
        disabled={props.data.length <= 0}
        placeholder="Select State"
        value={props.state}
        onChange={(e) => {
          props.selectedState(e.target.value);
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

export default SelectState;
