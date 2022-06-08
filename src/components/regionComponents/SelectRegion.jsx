import React from "react";

import PropTypes from "prop-types";

import { Box, Select } from "@chakra-ui/react";

const SelectRegion = (props) => {
  const { data, region, selectedRegion } = props;
  return (
    <Box>
      <Select
        size="sm"
        disabled={data.length <= 0}
        placeholder={"Select Region"}
        value={region}
        onChange={(e) => {
          selectedRegion(e.target.value);
        }}
      >
        {data.length > 0 &&
          data.map((p, key) => {
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

SelectRegion.propTypes = {
  region: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedRegion: PropTypes.func.isRequired,
};

export default SelectRegion;
