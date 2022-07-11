import axios from "axios";

/**
 * Contains all functions related to the industry: primary industry with all the secondary industry related.
 */
export const Industry = {
  /**
   * Get request to retrieve all the industries with their sub-industries.
   * @return {array} An array of object.
   */
  getAllIndustries() {
    return axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/industries.json`,
    });
  },
};
