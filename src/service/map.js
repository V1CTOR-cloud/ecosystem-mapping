import { graphCMSRequest } from "./graphCMS";
import { Authentication } from "./authentication";

export const Map = {
  async getAllUserMaps() {
    const query = `
      query getAllUserMaps {
        ecosystemMaps(where: {owner: {id: "${
          Authentication.getCurrentUser().id
        }"}}) {
          id
          title
          description
          mapStatus
          creation
          lastModification
          owner {
            profileName
          }
          location {
            id
            continent
            country
            region
            city
          }
          industry {
            id
            mainIndustry
            subIndustry
          }
          service {
            id
          }
        }
      }
    `;

    return (await graphCMSRequest(query)).ecosystemMaps;
  },

  // Async function that create a map.
  async createMap(data) {
    const query = `
      mutation ($data: EcosystemMapCreateInput!) {
        createEcosystemMap(data: $data) {
          id
          title
          description
          mapStatus
          creation
          lastModification
          owner {
            profileName
          }
          location {
            id
            continent
            country
            region
            city
          }
          industry {
            id
            mainIndustry
            subIndustry
          }
          services {
            id
          }
        }
      }
    `;

    const variables = {
      data: data,
    };

    return await graphCMSRequest(query, variables);
  },

  async updateMap(data) {
    const query = `
      mutation updateMap($data: EcosystemMapUpdateInput!, $id: ID!) {
        updateEcosystemMap(where: {id: $id}, data: $data) {
          id
          title
          description
          mapStatus
          creation
          lastModification
          owner {
            profileName
          }
          location {
            id
            continent
            country
            region
            city
          }
          industry {
            id
            mainIndustry
            subIndustry
          }
          services {
            id
          }
        }
      }
    `;

    const variables = {
      id: data.id,
      data: {
        title: data.title,
        mapStatus: data.mapStatus,
        description: data.description,
        lastModification: data.lastModification,
        industry: data.industry,
        location: data.location,
      },
    };

    return await graphCMSRequest(query, variables);
  },

  async deleteMap(id) {
    const query = `
      mutation deleteMap($id: ID!) {
        deleteEcosystemMap(where: {id: $id}) {
          id
        }
      }
    `;

    const variables = {
      id: id,
    };

    return await graphCMSRequest(query, variables);
  },

  async changeMapStatus(data) {
    const query = `
      mutation changeMapStatus($data: EcosystemMapUpdateInput!, $id: ID!) {
          updateEcosystemMap(
            where: {id: $id}, data: $data
          ) {
            id
            mapStatus
          }
        }
    `;

    const variables = {
      id: data.id,
      data: {
        mapStatus: data.mapStatus,
      },
    };

    return (await graphCMSRequest(query, variables)).updateEcosystemMap;
  },

  // Get all the services for a specific map
  async getMapServicesAndInformation(mapID) {
    const query = ` 
      query MyQuery {
        services (where: {ecosystemMaps_every: {id: "${mapID}"}}){
          id
          serviceName
          serviceFocus
          ownerOrganization {
            profileName
          }
          serviceApplication
          servicePhaseRange {
            id
            startPhase
            endPhase
          }
          serviceTime {
            id
            startTime
            endTime
          }
          serviceLink
          serviceLocation {
            id
            continent
            country
            region
            city
          }
          serviceAudience
          serviceBudget {
            budgetTitle
            budgetValue
            budgetCurrency
            id
          }
          serviceDescription
          serviceOutcomes
          previousService {
            id
            serviceName
          }
          followingService {
            id
            serviceName
          }
          serviceStatus
          serviceOrder
        }
        ecosystemMap(where: {id:"${mapID}"}) {
          title
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
  },
};
