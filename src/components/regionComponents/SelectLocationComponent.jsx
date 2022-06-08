import React from "react";

import { SimpleGrid } from "@chakra-ui/react";
import PropTypes from "prop-types";

import SelectCity from "./SelectCity";
import SelectCountry from "./SelectCountry";
import SelectRegion from "./SelectRegion";
import SelectState from "./SelectState";

const SelectLocationComponent = (props) => {
  const { regions, locationData, onLocationChange, countries, states, cities } =
    props;
  return (
    <>
      <SimpleGrid columns={4} spacing={4}>
        <SelectRegion
          data={regions}
          region={locationData.region}
          selectedRegion={(s) => onLocationChange("region", s)}
        />
        <SelectCountry
          data={countries}
          country={locationData.country}
          selectedCountry={(s) => onLocationChange("country", s)}
        />
        <SelectState
          data={states}
          state={locationData.state}
          selectedState={(s) => onLocationChange("state", s)}
        />
        <SelectCity
          data={cities}
          city={locationData.city}
          selectedCity={(s) => onLocationChange("city", s)}
        />
      </SimpleGrid>
    </>
  );
};

SelectLocationComponent.propTypes = {
  regions: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
  locationData: PropTypes.object.isRequired,
  onLocationChange: PropTypes.func.isRequired,
};

export default SelectLocationComponent;
