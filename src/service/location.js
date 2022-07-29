import axios from "axios";

/**
 * Contains all functions related to the locations: continent, country, region, city.
 */
export const Location = {
  /**
   * Get request to retrieve all the locations.
   * @return {array} An array of object.
   */
  getAllLocations() {
    return axios({
      method: "get",
      url: `https://cdn.jsdelivr.net/gh/ecosystemos/common-data-objects@main/locations/locations.json`,
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
};
