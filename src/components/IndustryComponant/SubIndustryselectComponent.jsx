import React from "react";
import { Select, Box } from "@chakra-ui/react";

const SubIndustryselectComponent = (props) => {
  let subindustrie;
  if (props.data.length > 0) {
    subindustrie = props.data[0].subIndustries;
  }
  return (
    <Box>
      <Select
        size="sm"
        disabled={subindustrie && subindustrie.length > 0 ? false : true}
        placeholder="Select Sub-Industries"
        value={props.subIndustry}
        onChange={(e) => {
          props.selectedSubIndustry(e.target.value);
        }}
      >
        {subindustrie &&
          subindustrie.length > 0 &&
          subindustrie.map((subindustrie, key) => {
            return (
              <option value={subindustrie.industryName} key={key}>
                {subindustrie.industryName}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

export { SubIndustryselectComponent };