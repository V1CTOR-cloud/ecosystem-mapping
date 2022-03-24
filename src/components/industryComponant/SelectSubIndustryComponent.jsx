import React from "react";

import { Box, Select } from "@chakra-ui/react";

const SelectSubIndustryComponent = (props) => {
  let subIndustries;

  if (props.data.length > 0) {
    subIndustries = props.data[0].subIndustries;
  }

  return (
    <Box>
      <Select
        size="sm"
        disabled={!(subIndustries && subIndustries.length > 0)}
        placeholder="Select Sub-Industry"
        value={props.subIndustry}
        onChange={(e) => {
          props.selectedSubIndustry(e.target.value);
        }}
      >
        {subIndustries &&
          subIndustries.length > 0 &&
          subIndustries.map((subIndustry, key) => {
            return (
              <option value={subIndustry.industryName} key={key}>
                {subIndustry.industryName}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

export default SelectSubIndustryComponent;
