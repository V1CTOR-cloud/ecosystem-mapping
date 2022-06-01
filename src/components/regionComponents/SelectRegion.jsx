import React from "react";

import { Box, Select } from "@chakra-ui/react";

const SelectRegion = (props) => {
  return (
    <Box>
      <Select
        size="sm"
        disabled={props.data.length <= 0}
        placeholder={"Select Region"}
        value={props.region}
        onChange={(e) => {
          props.selectedRegion(e.target.value);
        }}
      >
        {props.data.length > 0 &&
          props.data.map((p, key) => {
            return (
              <option value={p} key={key}>
                {p}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

export default SelectRegion;
