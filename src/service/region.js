import axios from "axios";

let allRegions = [];
let allIndustry = [];

export const Region = {

  async listAllRegions() {
    return await axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/regionselection.json`
    })
      .then((res) => {
        allRegions = res.data;
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  async listAllIndustries() {
    return await axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/industries.json`
    })
      .then((res) => {
        return (allIndustry = res.data.industries);
      })
      .catch((err) => {
        return err;
      });
  },

  getIndustries() {
    let allIndustries = [];
    allIndustry.forEach((industry) => {
      allIndustries.push(industry.industry);
    });
    return allIndustries;
  },

  getSubIndustriesByIndustry(industryBy) {
    let allSubIndustriesByIndustry = [];
    allIndustry.forEach((industry) => {
      if (industry.industry.industryName === industryBy) {
        allSubIndustriesByIndustry.push(industry);
      }
    });
    return allSubIndustriesByIndustry;
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
  }
};