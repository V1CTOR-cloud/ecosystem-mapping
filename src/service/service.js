import { graphCMSRequest } from "./graphCMS";

export const Service = {

  // Create a new service
  async createService(data) {
    const query = `mutation ($data: ServiceCreateInput!) {
        createService(data: $data){
        id
        serviceName
          serviceFocus
          serviceOwner {
            ... on Organisation {
              organisationName
              id
            }
          }
          applicationType
          serviceStartTime
          serviceEndTime
          serviceLink
          serviceLocation {
            id
            continent
            country
            region
            city
          }
          serviceBudget
          serviceAudience
          serviceDescription
          serviceStatus
          serviceOutcomes
          previousService
          followingService
          servicePhaseRange {
            id
            endPhase
            startPhase
          }
          order
        }
      }`;

    const variables = {
      data: {
        serviceName: data.serviceName,
        serviceFocus: data.serviceFocus,
        serviceOwner:
          data.organisationId === null
            ? null
            : {
              connect: [{ Organisation: { id: data.organisationId } }]
            },
        applicationType: data.applicationType,
        serviceStartTime: data.serviceStartTime,
        serviceEndTime: data.serviceEndTime,
        serviceLink: data.serviceLink,
        serviceLocation: {
          create: {
            continent: data.serviceLocation.continent,
            country: data.serviceLocation.country,
            region: data.serviceLocation.region,
            city: data.serviceLocation.city
          }
        },
        serviceBudget: data.serviceBudget,
        serviceAudience: data.serviceAudience,
        serviceDescription: data.serviceDescription,
        serviceOutcomes: data.serviceOutcomes,
        previousService: data.precededService,
        followingService: data.followedService,
        servicePhaseRange: {
          create: {
            startPhase: data.servicePhaseRange.startPhase,
            endPhase: data.servicePhaseRange.endPhase
          }
        },
        order: data.order,

        ecosystemMap: { connect: { id: data.mapId } },
        serviceStatus: data.serviceStatus
      }
    };

    const secondaryQuery = `
      query MyQuery {
        services(where: {serviceName: "${data.serviceName}", AND: {ecosystemMap: {id: "${data.mapId}"}}}) {
          id
          ecosystemMap {
            id
          }
        }
      }`;

    const res = await graphCMSRequest(secondaryQuery);

    // Check if we have the name of the service already taken.
    if (res.services.length !== 0) {
      return "A service with the same name exist. Please change the service name to be unique.";
    } else {
      return await graphCMSRequest(query, variables);
    }
  },

  // Update an existing service
  async updateService(data) {
    const query = `mutation ($data: ServiceUpdateInput!, $id: ID!) {
      updateService(
        where: {id: $id},
        data: $data
        ) {
            id
            serviceName
            serviceFocus
            serviceOwner {
              ... on Organisation {
              organisationName
              }
            }
            applicationType
            serviceStartTime
            serviceEndTime
            serviceLink
            serviceLocation {
                id
                continent
                country
                region
                city
            }
            serviceBudget
            serviceAudience
            serviceDescription
            serviceOutcomes
            serviceStatus
            previousService
            followingService
            servicePhaseRange {
              id
              endPhase
              startPhase
            }
            order
        }
    }`;

    const secondaryQuery = `
      query MyQuery {
        services(where: {serviceName: "${data.serviceName}", AND: {ecosystemMap: {id: "${data.mapId}"}}}) {
          id
          ecosystemMap {
            id
          }
        }
      }`;

    let serviceOwner;
    if (data.organisationId === null) {
      serviceOwner = null;
    } else if (data.organisationIdWithoutModification === data.organisationId) {
      serviceOwner = {};
    } else {
      serviceOwner = {
        disconnect: [
          {
            Organisation: {
              id: data.organisationIdWithoutModification,
            },
          },
        ],
        connect: [{ Organisation: { where: { id: data.organisationId } } }],
      };
    }

    const variables = {
      id: data.id,
      data: {
        serviceName: data.serviceName,
        serviceFocus: data.serviceFocus,
        serviceOwner: serviceOwner,
        applicationType: data.applicationType,
        serviceStartTime: data.serviceStartTime,
        serviceEndTime: data.serviceEndTime,
        serviceLink: data.serviceLink,
        serviceLocation: {
          update: {
            where: { id: data.serviceLocation.id },
            data: {
              continent: data.serviceLocation.continent,
              country: data.serviceLocation.country,
              region: data.serviceLocation.region,
              city: data.serviceLocation.city,
            },
          },
        },
        serviceBudget: data.serviceBudget,
        serviceAudience: data.serviceAudience,
        serviceDescription: data.serviceDescription,
        serviceOutcomes: data.serviceOutcomes,
        previousService: data.precededService,
        followingService: data.followedService,
        servicePhaseRange: {
          update: {
            where: { id: data.servicePhaseRange.id },
            data: {
              startPhase: data.servicePhaseRange.startPhase,
              endPhase: data.servicePhaseRange.endPhase,
            },
          },
        },
        order: data.order,

        ecosystemMap: { connect: { id: data.mapId } },
        serviceStatus: data.serviceStatus,
      },
    };

    const res =
      data.serviceWithoutModification.serviceName !== data.serviceName
        ? await graphCMSRequest(secondaryQuery)
        : {
          services: [],
        };
    // Check if we have the name of the service already taken.
    if (res.services.length !== 0) {
      return "A service with the same name exist. Please change the service name to be unique.";
    } else {
      return await graphCMSRequest(query, variables).catch((e) => {
        console.error(e);
        return "Something went wrong, please try again.";
      });
    }
  },

  // Update the order of all the services that change during a reorder.
  async updateServiceOrderAndApplicationType(serviceId, data) {
    const query = `mutation ($data: ServiceUpdateInput!, $id: ID!){
      updateService(
        where: {id: $id}
        data: $data
      ) {
        serviceName
        order
        applicationType
      }
    }`;

    const variables = {
      id: serviceId,
      data: {
        order: data.order,
        applicationType: data.applicationType,
      },
    };

    return await graphCMSRequest(query, variables);
  },

  async updateRangesPhase(data) {
    const query = `mutation ($data: ServiceUpdateInput!, $id: ID!) {
        updateService(where: {id: $id}, data: $data){
          serviceName
          servicePhaseRange {
            id
            endPhase
            startPhase
          }
        }
    }`;

    const variables = {
      id: data.id,
      data: {
        servicePhaseRange: {
          update: {
            where: { id: data.servicePhaseRange.id },
            data: {
              startPhase: data.servicePhaseRange.startPhase,
              endPhase: data.servicePhaseRange.endPhase,
            },
          },
        },
      },
    };

    return await graphCMSRequest(query, variables);
  }
};