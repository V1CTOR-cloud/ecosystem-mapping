import React from "react";

import PropTypes from "prop-types";

import { Select, Box } from "@chakra-ui/react";

const SelectCity = (props) => {
  const { data, city, selectedCity } = props;
  return (
    <Box>
      <Select
        size="sm"
        disabled={data.length <= 0}
        placeholder="Select City"
        value={city}
        onChange={(e) => selectedCity(e.target.value)}
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

SelectCity.propTypes = {
  city: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  selectedCity: PropTypes.func.isRequired,
};

export default SelectCity;
