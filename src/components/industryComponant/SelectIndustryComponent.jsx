import React from "react";

import PropTypes from "prop-types";

import { Box, Select } from "@chakra-ui/react";

const SelectIndustryComponent = (props) => {
  const { data, industry, selectedIndustry } = props;
  return (
    <Box>
      {data && (
        <Select
          size="sm"
          disabled={data.length <= 0}
          placeholder={"Select Industry"}
          value={industry}
          onChange={(e) => {
            selectedIndustry(e.target.value);
          }}
        >
          {data.length > 0 &&
            data.map((thisIndustry, key) => {
              return (
                <option value={thisIndustry.industryName} key={key}>
                  {thisIndustry.industryName}
                </option>
              );
            })}
        </Select>
      )}
    </Box>
  );
};

SelectIndustryComponent.propTypes = {
  industry: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedIndustry: PropTypes.func.isRequired,
};

export default SelectIndustryComponent;
