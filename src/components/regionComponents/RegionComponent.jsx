import React from "react";
import {
  RegionSelectComponent,
  CountrySelectComponent,
  StateSelectComponent,
  CitySelectComponent,
} from "components/regionComponents";
import { SimpleGrid } from "@chakra-ui/react";

const RegionComponent = (props) => {
  return (
    <>
      <SimpleGrid columns={4} spacing={4}>
        <RegionSelectComponent
          data={props.regions}
          region={props.locationData.region}
          selectedRegion={(s) => props.onLocationChange("region", s)}
          //invalid = {props.locationData.inValidFields}
        />
        <CountrySelectComponent
          data={props.countries}
          country={props.locationData.country}
          selectedCountry={(s) => props.onLocationChange("country", s)}
          //invalid = {props.locationData.inValidFields}
        />

        <StateSelectComponent
          data={props.states}
          state={props.locationData.state}
          selectedState={(s) => props.onLocationChange("state", s)}
          //invalid = {props.locationData.inValidFields}
        />

        <CitySelectComponent
          data={props.cities}
          city={props.locationData.city}
          selectedCity={(s) => props.onLocationChange("city", s)}
        />
      </SimpleGrid>
    </>
  );
};
export { RegionComponent };
