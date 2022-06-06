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
              id: data.organisationIdWithoutModification
            }
          }
        ],
        connect: [{ Organisation: { where: { id: data.organisationId } } }]
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
              city: data.serviceLocation.city
            }
          }
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
              endPhase: data.servicePhaseRange.endPhase
            }
          }
        },
        order: data.order,

        ecosystemMap: { connect: { id: data.mapId } },
        serviceStatus: data.serviceStatus
      }
    };

    const res =
      data.serviceWithoutModification.serviceName !== data.serviceName
        ? await graphCMSRequest(secondaryQuery)
        : {
          services: []
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
        applicationType: data.applicationType
      }
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
              endPhase: data.servicePhaseRange.endPhase
            }
          }
        }
      }
    };

    return await graphCMSRequest(query, variables);
  },

  replacePhaseToNumber(phase) {
    let newPhase;

    switch (phase) {
      case "minus_2_0":
        newPhase = -2;
        break;
      case "minus_1_2":
        newPhase = -1.6666666666666665;
        break;
      case "minus_1_1":
        newPhase = -1.3333333333333335;
        break;
      case "minus_1_0":
        newPhase = -1;
        break;
      case "minus_0_2":
        newPhase = -0.6666666666666667;
        break;
      case "minus_0_1":
        newPhase = -0.3333333333333335;
        break;
      case "plus_0":
        newPhase = 0;
        break;
      case "plus_0_1":
        newPhase = 0.33333333333333304;
        break;
      case "plus_0_2":
        newPhase = 0.6666666666666665;
        break;
      case "plus_1_0":
        newPhase = 1;
        break;
      case "plus_1_1":
        newPhase = 1.333333333333333;
        break;
      case "plus_1_2":
        newPhase = 1.666666666666666;
        break;
      case "plus_2_0":
        newPhase = 2;
        break;
      case "plus_2_1":
        newPhase = 2.333333333333333;
        break;
      case "plus_2_2":
        newPhase = 2.666666666666666;
        break;
      case "plus_3_0":
        newPhase = 3;
        break;
      case "plus_3_1":
        newPhase = 3.333333333333333;
        break;
      case "plus_3_2":
        newPhase = 3.666666666666666;
        break;
      default:
        newPhase = 4;
        break;
    }
    return newPhase;
  },

  replaceNumberToPhase(number) {
    let newPhase;

    number = Number(number.toFixed(2));

    switch (number) {
      case -2.0:
        newPhase = "minus_2_0";
        break;
      case -1.67:
        newPhase = "minus_1_2";
        break;
      case -1.33:
        newPhase = "minus_1_1";
        break;
      case -1.0:
        newPhase = "minus_1_0";
        break;
      case -0.67:
        newPhase = "minus_0_2";
        break;
      case -0.33:
        newPhase = "minus_0_1";
        break;
      case 0.0:
        newPhase = "plus_0";
        break;
      case 0.33:
        newPhase = "plus_0_1";
        break;
      case 0.67:
        newPhase = "plus_0_2";
        break;
      case 1.0:
        newPhase = "plus_1_0";
        break;
      case 1.33:
        newPhase = "plus_1_1";
        break;
      case 1.67:
        newPhase = "plus_1_2";
        break;
      case 2.0:
        newPhase = "plus_2_0";
        break;
      case 2.33:
        newPhase = "plus_2_1";
        break;
      case 2.67:
        newPhase = "plus_2_2";
        break;
      case 3.0:
        newPhase = "plus_3_0";
        break;
      case 3.33:
        newPhase = "plus_3_1";
        break;
      case 3.67:
        newPhase = "plus_3_2";
        break;
      default:
        newPhase = "plus_4";
        break;
    }
    return newPhase;
  }
};