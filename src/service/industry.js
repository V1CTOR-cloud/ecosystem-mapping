import axios from "axios";

let allIndustry = [];

// Contains all functions related to the industry: primary industry with all the secondary industry related.
export const Industry = {
  /**
   * Get request to retrieve all the industries.
   * @return An array of object that contains: primary industry and the subIndustries.
   *
   * The primaryIndustry contains the industryId and the industryName.
   *
   * The subIndustries is an array of object of the same type of the primary industry: industryId & industryName.
   *
   */
  getAllIndustries() {
    return axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/industries.json`,
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
};
