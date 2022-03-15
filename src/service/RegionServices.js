import axios from "axios";
import { GraphQLClient } from "graphql-request";
import { getCurrentUser } from "./AuthenticationService";

let allRegions = [];
let allIndustry = [];

const { REACT_APP_GRAPH_CMS_CONTENT_API_KEY } = process.env;

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
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
