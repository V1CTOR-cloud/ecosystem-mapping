import React from "react";
import { RegionSelectComponent, CountrySelectComponent, StateSelectComponent, CitySelectComponent } from "components/regionComponents";
import { SimpleGrid } from "@chakra-ui/react";

const RegionComponent = (props) => {
  return (
    <>
      <SimpleGrid columns={4} spacing={4}>
        <RegionSelectComponent
          data={props.regions}
          region={props.locationData.region}
          selectedRegion={(s) =>  props.createMapCallback('region',s)}
          //invalid = {props.locationData.inValidFields}
        />
         <CountrySelectComponent
          data={props.countries}
          country={props.locationData.country}
          selectedCountry={(s) => props.createMapCallback('country',s)}
          //invalid = {props.locationData.inValidFields}
        />
       
        <StateSelectComponent
          data={props.states}
          state={props.locationData.state}
          selectedState={(s) => props.createMapCallback('state',s)}
          //invalid = {props.locationData.inValidFields}
        />
        
        <CitySelectComponent
          data={props.cities}
          city={props.locationData.city}
          selectedCity={(s) => props.createMapCallback('city',s)}
        /> 
      </SimpleGrid>
    </>
  );
};
export { RegionComponent };
