import React, { useContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { HStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

import SmallLabelLocation from "./SmallLabelLocation";
import LabelWithTooltip from "../labelWithTooltip/LabelWithTooltip";
import { AppProvider } from "../../../App";

const initialContinentList = [{ id: 0, name: "Continent" }];
const initialCountryList = [{ id: 0, name: "Country" }];
const initialRegionList = [{ id: 0, name: "Region" }];
const initialCityList = [{ id: 0, name: "City" }];

function LocationComponent(props) {
  const { initialLocation, onChange } = props;

  const { t } = useTranslation();
  const appProvider = useContext(AppProvider);
  const [continentList, setContinentList] = useState(initialContinentList);
  const [countryList, setCountryList] = useState(initialCountryList);
  const [regionList, setRegionList] = useState(initialRegionList);
  const [cityList, setCityList] = useState(initialCityList);
  const [location, setLocation] = useState({
    continent: continentList[0].name,
    country: countryList[0].name,
    region: regionList[0].name,
    city: cityList[0].name,
  });
  // Creation of these variables to avoid warning for the useEffect dependencies
  const continent = location.continent;
  const country = location.country;
  const region = location.region;

  useEffect(() => {
    const tempLocation = {
      continent: "Continent",
      country: "Country",
      region: "Region",
      city: "City",
    };
    if (initialLocation.continent !== null) {
      tempLocation.continent = initialLocation.continent;
    }
    if (initialLocation.country !== null) {
      tempLocation.country = initialLocation.country;
    }
    if (initialLocation.region !== null) {
      tempLocation.region = initialLocation.region;
    }
    if (initialLocation.city !== null) {
      tempLocation.city = initialLocation.city;
    }

    setLocation(tempLocation);
  }, [initialLocation]);

  useEffect(() => {
    onChange(location);
  }, [location]);

  // Populate the list of continent (run once)
  useEffect(() => {
    const tempContinentList = [...initialContinentList];

    appProvider.locations.forEach((country) => {
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
  }, [appProvider.locations]);

  // Populate the list of country (run everyTime we change the country)
  useEffect(() => {
    const tempCountryList = [...initialCountryList];

    appProvider.locations.forEach((country) => {
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
  }, [continent, appProvider.locations]);

  // Populate the list of region (run everyTime we change the country)
  useEffect(() => {
    if (countryList.length !== 1 && country !== null) {
      const tempRegionList = [...initialRegionList];

      const thisCountry = countryList.find(
        (thisCountry) => thisCountry.name === country
      );

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
    }
  }, [country, countryList]);

  // Populate the list of city (run everyTime we change the region)
  useEffect(() => {
    if (regionList.length !== 1 && region !== null) {
      const tempCityList = [...initialCityList];

      const thisRegion = regionList.find(
        (thisRegion) => thisRegion.name === region
      );

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
  }, [region, regionList]);

  function handleContinentChange(continent) {
    const tempLocation = { ...location };
    tempLocation.continent = continent;
    tempLocation.country = countryList[0].name;
    tempLocation.region = regionList[0].name;
    tempLocation.city = cityList[0].name;
    setLocation(tempLocation);
  }

  function handleCountryChange(country) {
    const tempLocation = { ...location };
    tempLocation.country = country;
    tempLocation.region = regionList[0].name;
    tempLocation.city = cityList[0].name;
    setLocation(tempLocation);
  }

  function handleRegionChange(region) {
    const tempLocation = { ...location };
    tempLocation.region = region;
    tempLocation.city = cityList[0].name;
    setLocation(tempLocation);
  }

  function handleCityChange(city) {
    const tempLocation = { ...location };
    tempLocation.city = city;
    setLocation(tempLocation);
  }

  return (
    <>
      <LabelWithTooltip
        tooltipText={t("mapping.canvas.form.location.tooltip")}
        label={t("mapping.canvas.form.location")}
        tooltipAriaLabel={t("mapping.canvas.form.location")}
      />
      <HStack justifyContent="space-between">
        <SmallLabelLocation
          label={t("common.continent")}
          items={continentList}
          item={location.continent}
          onChange={(region) => handleContinentChange(region)}
        />
        <SmallLabelLocation
          label={t("common.country")}
          wantScroll={true}
          isDisabled={location.continent === continentList[0].name}
          items={countryList}
          item={location.country}
          onChange={(country) => handleCountryChange(country)}
        />
        <SmallLabelLocation
          label={t("common.region")}
          wantScroll={true}
          isDisabled={
            location.country === countryList[0].name || regionList.length === 1
          }
          items={regionList}
          item={location.region}
          onChange={(region) => handleRegionChange(region)}
        />
        <SmallLabelLocation
          label={t("common.city")}
          wantScroll={true}
          isDisabled={
            location.region === regionList[0].name || cityList.length === 1
          }
          items={cityList}
          item={location.city}
          onChange={(city) => handleCityChange(city)}
        />
      </HStack>
    </>
  );
}

LocationComponent.propTypes = {
  initialLocation: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LocationComponent;
