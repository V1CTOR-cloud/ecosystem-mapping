import React, { useCallback, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { CloseButton, HStack, VStack } from "@chakra-ui/react";

import SmallLabel from "../industry/SmallLabel";
import SelectComponent from "../inputs/select/SelectComponent";

function Location(props) {
  const { locationsState, index, items, onRemoveLocation } = props;
  const location = locationsState[0][index];
  const [continentList, setContinentList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [cityList, setCityList] = useState([]);

  // Creation of these variables to avoid warning for the useEffect dependencies
  const continent = location.continent;
  const country = location.country;
  const region = location.region;

  // Populate the list of country
  const populateCountry = useCallback(() => {
    const tempCountryList = [];

    items.forEach((country) => {
      if (country.continent === continent) {
        const containsCountry = tempCountryList.some(
          (country) => country.name === country.country
        );

        // Create the list of country
        if (!containsCountry) {
          tempCountryList.push({
            id: tempCountryList.length,
            name: country.country,
            regions: country.regions,
          });
        }
      }
    });

    setCountryList(tempCountryList);
    return tempCountryList;
  }, [continent, items]);

  // Populate the list of region
  const populateRegion = useCallback(() => {
    if (countryList.length !== 0 && country !== null) {
      const tempRegionList = [];

      let thisCountry = countryList.find(
        (thisCountry) => thisCountry.name === country
      );

      // Case where we have our lists are not in sync due to a deletion of an items.
      if (thisCountry === undefined) {
        const countryList = populateCountry();

        thisCountry = countryList.find(
          (thisCountry) => thisCountry.name === country
        );
      }

      if (thisCountry.regions) {
        thisCountry.regions.forEach((region) => {
          const containsRegion = tempRegionList.some(
            (country) => country.name === country.country
          );

          // Add to the list of region
          if (!containsRegion) {
            tempRegionList.push({
              id: tempRegionList.length,
              name: region.name,
              cities: region.cities,
            });
          }
        });
      }

      setRegionList(tempRegionList);
      return tempRegionList;
    }
  }, [country, countryList, populateCountry]);

  // Populate the list of city
  const populateCity = useCallback(() => {
    if (regionList.length !== 0 && region !== null) {
      const tempCityList = [];

      let thisRegion = regionList.find(
        (thisRegion) => thisRegion.name === region
      );

      // Case where we have our lists are not in sync due to a deletion of an items.
      if (thisRegion === undefined) {
        const regionList = populateRegion();

        thisRegion = regionList.find(
          (thisRegion) => thisRegion.name === region
        );
      }

      // Add to the list of cities
      if (thisRegion.cities) {
        thisRegion.cities.forEach((city) => {
          const containsCity = tempCityList.some(
            (thisCity) => city.name === thisCity.name
          );

          if (!containsCity) {
            tempCityList.push({
              id: tempCityList.length,
              name: city.name,
            });
          }
        });
      }

      setCityList(tempCityList);
    }
  }, [populateRegion, region, regionList]);

  // Populate the list of continent (run once)
  useEffect(() => {
    const tempContinentList = [];

    items.forEach((country) => {
      const containsContinent = tempContinentList.some(
        (continent) => continent.name === country.continent
      );

      // Create the list of continent
      if (!containsContinent) {
        tempContinentList.push({
          id: tempContinentList.length,
          name: country.continent,
        });
      }
    });

    setContinentList(tempContinentList);
  }, [items]);

  // Populate the list of country (run everyTime we change the continent)
  useEffect(() => {
    populateCountry();
  }, [populateCountry]);

  // Populate the list of region (run everyTime we change the country)
  useEffect(() => {
    populateRegion();
  }, [populateRegion]);

  // Populate the list of city (run everyTime we change the region)
  useEffect(() => {
    populateCity();
  }, [populateCity]);

  // Function that allow to set the country, region and city to null and the continent to the selected value when we change the continent.
  function handleContinentChange(value) {
    const tempLocations = [...locationsState[0]];
    tempLocations[index].continent = value === "Select option" ? null : value;
    tempLocations[index].country = null;
    tempLocations[index].region = null;
    tempLocations[index].city = null;

    locationsState[1](tempLocations);
  }

  // Function that allow to set the region and city to null and the country to the selected value when we change the country.
  function handleCountryChange(value) {
    const tempLocations = [...locationsState[0]];
    tempLocations[index].country = value === "Select option" ? null : value;
    tempLocations[index].region = null;
    tempLocations[index].city = null;

    locationsState[1](tempLocations);
  }

  // Function that allow to set the city to null and the region to the selected value when we change the region.
  function handleRegionChange(value) {
    const tempLocations = [...locationsState[0]];
    tempLocations[index].region = value === "Select option" ? null : value;
    tempLocations[index].city = null;

    locationsState[1](tempLocations);
  }

  // Function that allow to set the city to the selected value.
  function handleCityChange(value) {
    const tempLocations = [...locationsState[0]];
    tempLocations[index].city = value === "Select option" ? null : value;

    locationsState[1](tempLocations);
  }

  return (
    <VStack align="start">
      {index === 0 && (
        <HStack w="100%">
          <SmallLabel
            label={"Continent"}
            items={continentList}
            initialValue={location.continent}
            onChange={(value) => handleContinentChange(value)}
          />
          <SmallLabel
            label={"Country"}
            items={countryList}
            initialValue={location.country}
            onChange={(value) => handleCountryChange(value)}
            disabled={continent === null}
          />
          <SmallLabel
            label={"Region"}
            items={regionList}
            initialValue={location.region}
            onChange={(value) => handleRegionChange(value)}
            disabled={country === null}
          />
          <SmallLabel
            label={"City"}
            items={cityList}
            initialValue={location.city}
            onChange={(value) => handleCityChange(value)}
            disabled={region === null}
          />
        </HStack>
      )}
      {index !== 0 && (
        <HStack w="100%">
          <SelectComponent
            initialValue={location.continent}
            items={continentList}
            onChange={(value) => handleContinentChange(value)}
          />
          <SelectComponent
            items={countryList}
            initialValue={location.country}
            onChange={(value) => handleCountryChange(value)}
            disabled={continent === null}
          />
          <SelectComponent
            items={regionList}
            initialValue={location.region}
            onChange={(value) => handleRegionChange(value)}
            disabled={country === null}
          />
          <HStack w="100%">
            <SelectComponent
              items={cityList}
              initialValue={location.city}
              onChange={(value) => handleCityChange(value)}
              disabled={region === null}
            />
            <CloseButton onClick={onRemoveLocation} color="brand.500" />
          </HStack>
        </HStack>
      )}
    </VStack>
  );
}

export default Location;

Location.defaultProps = {
  onRemoveLocation: () => {},
};

Location.propTypes = {
  /**
   * Function that will remove the selected location from the list.
   */
  onRemoveLocation: PropTypes.func,
  /**
   * Number that indicate which industry is currently map to get the value and setState it.
   */
  index: PropTypes.number.isRequired,
  /**
   * Select field that allow the user to pick through a predefined list of items.
   */
  items: PropTypes.array.isRequired,
  /**
   * Array that contains the list of location and the stateful function to update it.
   */
  locationsState: PropTypes.array.isRequired,
};
