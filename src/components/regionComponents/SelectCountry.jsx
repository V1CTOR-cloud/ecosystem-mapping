import React from "react";

import PropTypes from "prop-types";

import { Select, Box } from "@chakra-ui/react";

const SelectCountry = (props) => {
  const { data, country, selectedCountry } = props;
  return (
    <Box>
      <Select
        size="sm"
        disabled={data.length <= 0}
        placeholder="Select Country"
        value={country}
        onChange={(e) => {
          selectedCountry(e.target.value);
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

SelectCountry.propTypes = {
  country: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedCountry: PropTypes.func.isRequired,
};

export default SelectCountry;
