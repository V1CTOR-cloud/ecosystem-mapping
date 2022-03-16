import axios from "axios";
import { GraphQLClient } from "graphql-request";
import { getCurrentUser } from "./AuthenticationService";

let allRegions = [];
let allIndustry = [];

const { REACT_APP_GRAPH_CMS_CONTENT_API_KEY, REACT_APP_GRAPH_CMS_TOKEN_KEY } =
  process.env;

class Service {
  async listAllRegions() {
    return await axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/regionselection.json`,
    })
      .then((res) => {
        allRegions = res.data;
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  async listAllIndustries() {
    return await axios({
      method: "get",
      url: `https://regionselectbucket.s3.ap-south-1.amazonaws.com/industries.json`,
    })
      .then((res) => {
        return (allIndustry = res.data.industries);
      })
      .catch((err) => {
        return err;
      });
  }

  getIndustries() {
    let allIndustries = [];
    allIndustry.forEach((industry) => {
      allIndustries.push(industry.industry);
    });
    return allIndustries;
  }

  getSubIndustriesByIndustry(industryBy) {
    let allSubIndustriesByIndustry = [];
    allIndustry.forEach((industry) => {
      if (industry.industry.industryName === industryBy) {
        allSubIndustriesByIndustry.push(industry);
      }
    });
    return allSubIndustriesByIndustry;
  }

  getregions() {
    let uniqueRegions = [];
    allRegions.forEach((region) => {
      if (!uniqueRegions.includes(region.region) && region.region !== "") {
        uniqueRegions.push(region.region);
      }
    });
    return uniqueRegions;
  }

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
  }

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
  }

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

  async getAllEcoMap() {
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: REACT_APP_GRAPH_CMS_TOKEN_KEY,
      },
    });
    const { ecosystemMaps } = await graphcms.request(
      `query MyQuery {
        ecosystemMaps(where: {cPTUserAccount: {id: "${getCurrentUser().id}"}}){
          id
          name
          region
          country
          state
          city
          industry
          subIndustry
          services {
            id
          }
        }
      }
      `
    );
    return await ecosystemMaps;
  }

  async addEcoMap(data) {
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: REACT_APP_GRAPH_CMS_TOKEN_KEY,
      },
    });
    const { createEcosystemMap } = await graphcms.request(
      `mutation ($data: EcosystemMapCreateInput!) {
        createEcosystemMap(data: $data) {
          id
        }
      }`,
      {
        data: {
          name: data.name,
          region: data.region,
          country: data.country,
          state: data.state,
          city: data.city,
          industry: data.industry,
          subIndustry: data.subIndustry,
          cPTUserAccount: {
            connect: { id: getCurrentUser().id },
          },
        },
      }
    );
    await graphcms.request(
      `mutation ($ids: [ID!], $to: [Stage!]!) {
        publishManyEcosystemMapsConnection(where: {id_in: $ids}, to: $to){
          aggregate{count}
        }}`,
      { ids: [createEcosystemMap.id], to: ["PUBLISHED"] }
    );
    sessionStorage.setItem("ecomapid", createEcosystemMap.id);
    return createEcosystemMap;
  }

  async DeleteEcoMap(id) {
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: REACT_APP_GRAPH_CMS_TOKEN_KEY,
      },
    });
    await graphcms.request(
      `mutation ($ids: [ID!]!) {
        deleteManyEcosystemMapsConnection(where: {id_in: $ids}) 
        {
            aggregate{count}
        }}`,
      { ids: [id] }
    );
  }

  async editEcoMap(data) {
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: REACT_APP_GRAPH_CMS_TOKEN_KEY,
      },
    });
    const { updateEcosystemMap } = await graphcms.request(
      `mutation ($data: EcosystemMapUpdateInput!, $id: ID!) {
          updateEcosystemMap(where: {id: $id}, data: $data)
          {
            name
            region
            country
            state
            city
            industry
            subIndustry
          }}`,
      {
        id: data.id,
        data: {
          name: data.name,
          region: data.region,
          country: data.country,
          state: data.state,
          city: data.city,
          industry: data.industry,
          subIndustry: data.subIndustry,
        },
      }
    );
    await graphcms.request(
      `mutation ($ids: [ID!], $to: [Stage!]!) {
          publishManyEcosystemMapsConnection(where: {id_in: $ids}, to: $to){
            aggregate{count}
          }}`,
      { ids: [data.id], to: ["PUBLISHED"] }
    );
    return updateEcosystemMap;
  }
}

export default new Service(); 
