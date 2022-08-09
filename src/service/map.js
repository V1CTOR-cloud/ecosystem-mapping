import { graphCMSRequest } from "./graphCMS";

export const Map = {
  /**
   * Get all the maps linked to the connected user.
   * @return {array} An array of object.
   */
  async getMapsByOwner(ownerId) {
    const query = `
      query getAllUserMaps {
        ecosystemMaps(where: {owner: "${ownerId}"}) {
          id
          title
          description
          mapStatus
          creation
          lastModification
          owner
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

  /**
   * Create a new map and post it to the database.
   * @param data The date to create the new map.
   * @return {Object} A map object.
   */
  async createMap(data) {
    const query = `
      mutation createMap($data: EcosystemMapCreateInput!) {
        createEcosystemMap(data: $data) {
          id
          title
          description
          mapStatus
          creation
          lastModification
          owner
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

    const variables = {
      data: data,
    };

    return await graphCMSRequest(query, variables);
  },

  /**
   * Update a map and post it to the database.
   * @param data The data to update the map.
   * @return {Object} A map object.
   */
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
          owner
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

  /**
   * Delete a map and all services related to this map.
   * @param id The id of the map to delete.
   */
  async deleteMap(id) {
    const query = `
      mutation deleteMapAndRelatedServices($id: ID!) {
        deleteManyServices(where: {ecosystemMaps_every: {id: $id}}) {
          count
        }
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

  /**
   * Change the status of a map.
   * @param data The date to change the status.
   * @return {Object} Id and the map status are returned.
   */
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

  /**
   *  Get a map by its id.
   * @param id The id of the map to get.
   * @return {Object} A map object.
   */
  async getMapById(id) {
    const query = ` 
      query getMapById {
        services (where: {ecosystemMaps_every: {id: "${id}"}}){
          id
          serviceName
          serviceFocus
          owner
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
        ecosystemMap(where: {id:"${id}"}) {
          title
          filters
        }
      }
  `;

    return await graphCMSRequest(query);
  },

  /**
   * Update the filters of a map.
   * @param data The id and filter of the map to update.
   * @return {Object} The filter updated are returned.
   */
  async createSavedFilter(data) {
    const query = `mutation createSavedFilter($data: EcosystemMapUpdateInput!, $id: ID!) {
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
