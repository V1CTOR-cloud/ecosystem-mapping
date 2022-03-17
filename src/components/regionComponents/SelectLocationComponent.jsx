import React from "react";

import { SimpleGrid } from "@chakra-ui/react";

import SelectCity from "./SelectCity";
import SelectCountry from "./SelectCountry";
import SelectRegion from "./SelectRegion";
import SelectState from "./SelectState";

const SelectLocationComponent = (props) => {
  return (
    <>
      <SimpleGrid columns={4} spacing={4}>
        <SelectRegion
          data={props.regions}
          region={props.locationData.region}
          selectedRegion={(s) => props.onLocationChange("region", s)}
        />
        <SelectCountry
          data={props.countries}
          country={props.locationData.country}
          selectedCountry={(s) => props.onLocationChange("country", s)}
        />
        <SelectState
          data={props.states}
          state={props.locationData.state}
          selectedState={(s) => props.onLocationChange("state", s)}
        />
        <SelectCity
          data={props.cities}
          city={props.locationData.city}
          selectedCity={(s) => props.onLocationChange("city", s)}
        />
      </SimpleGrid>
    </>
  );
};

export default SelectLocationComponent;
