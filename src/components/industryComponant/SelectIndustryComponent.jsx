import React from "react";

import { Box, Select } from "@chakra-ui/react";

const SelectIndustryComponent = (props) => {
  return (
    <Box>
      {props.data && (
        <Select
          size="sm"
          disabled={props.data.length <= 0}
          placeholder={"Select Industry"}
          value={props.industry}
          onChange={(e) => {
            props.selectedIndustry(e.target.value);
          }}
        >
          {props.data.length > 0 &&
            props.data.map((industry, key) => {
              return (
                <option value={industry.industryName} key={key}>
                  {industry.industryName}
                </option>
              );
            })}
        </Select>
      )}
    </Box>
  );
};

export default SelectIndustryComponent;
