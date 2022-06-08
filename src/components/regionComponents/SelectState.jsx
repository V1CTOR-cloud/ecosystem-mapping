import React from "react";

import PropTypes from "prop-types";

import { Select, Box } from "@chakra-ui/react";

const SelectState = (props) => {
  const { data, state, selectedState } = props;
  return (
    <Box>
      <Select
        size="sm"
        disabled={data.length <= 0}
        placeholder="Select State"
        value={state}
        onChange={(e) => {
          selectedState(e.target.value);
        }}
      >
        {data.length > 0 &&
          data.map((p, key) => {
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

SelectState.propTypes = {
  state: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedState: PropTypes.func.isRequired,
};

export default SelectState;
