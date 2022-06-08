import React from "react";

import PropTypes from "prop-types";

import { Box, Select } from "@chakra-ui/react";

const SelectSubIndustryComponent = (props) => {
  const { data, subIndustry, selectedSubIndustry } = props;
  let subIndustries;

  if (data.length > 0) {
    subIndustries = data[0].subIndustries;
  }

  return (
    <Box>
      <Select
        size="sm"
        disabled={!(subIndustries && subIndustries.length > 0)}
        placeholder="Select Sub-Industry"
        value={subIndustry}
        onChange={(e) => {
          selectedSubIndustry(e.target.value);
        }}
      >
        {subIndustries &&
          subIndustries.length > 0 &&
          subIndustries.map((thisSubIndustry, key) => {
            return (
              <option value={thisSubIndustry.industryName} key={key}>
                {thisSubIndustry.industryName}
              </option>
            );
          })}
      </Select>
    </Box>
  );
};

SelectSubIndustryComponent.propTypes = {
  subIndustry: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedSubIndustry: PropTypes.func.isRequired,
};

export default SelectSubIndustryComponent;
