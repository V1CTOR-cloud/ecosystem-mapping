import { graphCMSRequest } from "./graphCMS";

export const Maps = {

  // Get all the services for a specific map
  async getMapServicesAndMapInformation(mapID) {
    const query = ` 
      query MyQuery {
        services (where: {ecosystemMap: {id:"${mapID}"}}){
          id
          serviceFocus
          serviceName
          serviceOwner {
            ... on Organisation {
              organisationName
              id
            }
          }
          serviceStartTime
          serviceEndTime
          timezone
          stage
          serviceDescription
          serviceOutcomes
          servicePhaseRange {
            id
            endPhase
            startPhase
          }
          serviceLink
          serviceBudget
          serviceAudience
          followingService
          previousService
          applicationType
          serviceLocation {
            id
            city
            continent
            country
            region
          }
          serviceStatus
          order
        }
        ecosystemMap(where: {id:"${mapID}"}) {
          name
          filters
        }
      }
  `;

    return await graphCMSRequest(query);
  },

  // Create or update the filters that are linked to each map
  async createSavedFilter(data) {
    const query = `mutation ($data: EcosystemMapUpdateInput!, $id: ID!) {
        updateEcosystemMap(
          where: {id: $id}, data: $data
        ) {
        filters
        }
      }`;

    const variables = {
      id: data.id,
      data: {
        filters: data.filters,
      },
    };

    return await graphCMSRequest(query, variables);
  }
}