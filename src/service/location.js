import axios from "axios";

let allRegions = [];

// Contains all functions related to the locations: continent, country, region, city.
export const Location = {
  /**
   * Get request to retrieve all the locations.
   * @return An array of object that contains all parameters: continent, country. Each country possess (not mandatory)
   * an array of region and each region contains (not required) possess a list of city.
   */
  getAllLocations() {
    return axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/regionselection.json`,
    });
  },

  /**
   * Format the list of locations correctly to have the id, continent, country and regions at the same level.
   * @param locations Raw list of locations that we get from the function getAllLocations
   * @return An array of object that is named correctly: id, continent, country, regions.
   */
  formatLocations(locations) {
    const tempLocations = [];
    locations.forEach((item) => {
      tempLocations.push({
        id: item.id,
        continent: item.region,
        country: item.name,
        regions: item.states,
      });
    });
    tempLocations.pop();
    return tempLocations;
  },

  getregions() {
    let uniqueRegions = [];
    allRegions.forEach((region) => {
      if (!uniqueRegions.includes(region.region) && region.region !== "") {
        uniqueRegions.push(region.region);
      }
    });
    return uniqueRegions;
  },

  getCountriesByRegion(regionBy) {
    let allCountriesByRegion = [];
    if (regionBy !== "Global") {
      allRegions.forEach((region) => {
        if (region.region === regionBy) {
          allCountriesByRegion.push(region);
        }
      });
    }
    return allCountriesByRegion;
  },

  getStatesByCountry(regionBy, country) {
    let allStatesByCountry = [];
    if (regionBy !== "Global") {
      allRegions.forEach((region) => {
        if (region.region === regionBy && region.name === country) {
          allStatesByCountry.push(...region.states);
        }
      });
    }
    return allStatesByCountry;
  },

  getCitiesByState(regionBy, countryBy, stateBy) {
    let cities = [];
    if (regionBy !== "Global") {
      allRegions.forEach((region) => {
        if (region.region === regionBy && region.name === countryBy) {
          region.states.forEach((state) => {
            if (state.name === stateBy) {
              cities.push(...state.cities);
            }
          });
        }
      });
    }
    return cities;
  },
};
