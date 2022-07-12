import { graphCMSRequest } from "./graphCMS";

export const Service = {
  /**
   * Create a new service and post it to the database.
   * @param data The date to create the new service.
   * @return {Promise<string|any>} A service object.
   */
  async createService(data) {
    const query = `mutation createService($data: ServiceCreateInput!) {
        createService(data: $data){
          id
          serviceName
          serviceFocus
          ownerOrganization {
            profileName
          }
          serviceApplication
          serviceTime {
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
          serviceBudget {
            id
            budgetValue
            budgetTitle
            budgetCurrency
          }
          serviceAudience
          serviceDescription
          serviceStatus
          serviceOutcomes
          previousService {
            id
            serviceName
          }
          followingService {
            id
            serviceName
          }
          servicePhaseRange {
            id
            endPhase
            startPhase
          }
          serviceOrder
        }
      }`;

    const variables = {
      data: {
        serviceName: data.serviceName,
        serviceFocus: data.serviceFocus,
        // ownerOrganization:
        //   data.organisationId === null
        //     ? null
        //     : {
        //         connect: [{ Organisation: { id: data.organisationId } }],
        //       },
        serviceApplication: data.serviceApplication,
        serviceTime: {
          create: {
            startTime: data.serviceTime.startTime,
            endTime: data.serviceTime.endTime,
          },
        },
        serviceLink: data.serviceLink,
        serviceLocation: {
          create: {
            continent: data.serviceLocation.continent,
            country: data.serviceLocation.country,
            region: data.serviceLocation.region,
            city: data.serviceLocation.city,
          },
        },
        serviceBudget: {
          create: data.serviceBudget,
        },
        serviceAudience: data.serviceAudience,
        serviceDescription: data.serviceDescription,
        serviceOutcomes: data.serviceOutcomes,
        // previousService: {
        //   connect: [
        //     {
        //       id: data.previousService,
        //     },
        //   ],
        // },
        // followingService: {
        //   connect: [
        //     {
        //       id: data.followingService,
        //     },
        //   ],
        // },
        servicePhaseRange: {
          create: {
            startPhase: data.servicePhaseRange.startPhase,
            endPhase: data.servicePhaseRange.endPhase,
          },
        },
        serviceOrder: data.serviceOrder,

        ecosystemMaps: {
          connect: [
            {
              id: data.mapId,
            },
          ],
        },
        serviceStatus: data.serviceStatus,
      },
    };

    const secondaryQuery = `
      query MyQuery {
        services(where: {serviceName: "${data.serviceName}", AND: {ecosystemMaps_every: {id: "${data.mapId}"}}}) {
          id
          ecosystemMaps {
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

  /**
   * Update a service by its id.
   * @param data The data to update the service.
   * @return {Promise<string|any>} A service object.
   */
  async updateService(data) {
    const query = `mutation updateService($data: ServiceUpdateInput!, $id: ID!) {
      updateService(
        where: {id: $id},
        data: $data
        ) {
            id
            serviceName
            serviceFocus
            ownerOrganization {
              profileName
            }
            serviceApplication
            serviceTime {
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
            serviceBudget {
              id
              budgetValue
              budgetTitle
              budgetCurrency
            }
            serviceAudience
            serviceDescription
            serviceOutcomes
            serviceStatus
            previousService {
              id
              serviceName
            }
            followingService {
              id
              serviceName
            }
            servicePhaseRange {
              id
              endPhase
              startPhase
            }
            serviceOrder
        }
    }`;

    const secondaryQuery = `
      query MyQuery {
        services(where: {serviceName: "${data.serviceName}", AND: {ecosystemMaps_every: {id: "${data.mapId}"}}}) {
          id
          ecosystemMaps {
            id
          }
        }
      }`;

    const updateBudgets = [];
    data.serviceBudget.forEach((budget) => {
      updateBudgets.push({
        where: { id: budget.id === undefined ? "undefined" : budget.id },
        data: {
          create: {
            budgetCurrency: budget.budgetCurrency,
            budgetTitle: budget.budgetTitle,
            budgetValue: budget.budgetValue,
          },
          update: {
            budgetCurrency: budget.budgetCurrency,
            budgetTitle: budget.budgetTitle,
            budgetValue: budget.budgetValue,
          },
        },
      });
    });

    const variables = {
      id: data.id,
      data: {
        serviceName: data.serviceName,
        serviceFocus: data.serviceFocus,
        //ownerOrganization: serviceOwner,
        serviceApplication: data.serviceApplication,
        serviceTime: data.serviceTime,
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
        serviceBudget: {
          upsert: updateBudgets,
        },
        serviceAudience: data.serviceAudience,
        serviceDescription: data.serviceDescription,
        serviceOutcomes: data.serviceOutcomes,
        // previousService: {
        //   connect: [
        //     {
        //       id: data.previousService,
        //     },
        //   ],
        // },
        // followingService: {
        //   connect: [
        //     {
        //       id: data.followingService,
        //     },
        //   ],
        // },
        servicePhaseRange: {
          update: {
            where: { id: data.servicePhaseRange.id },
            data: {
              startPhase: data.servicePhaseRange.startPhase,
              endPhase: data.servicePhaseRange.endPhase,
            },
          },
        },

        serviceOrder: data.serviceOrder,
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

  /**
   * Update a service order and application by its id.
   * @param serviceId The id of the service to update.
   * @param data The service order and application to update.
   * @return {Promise<any>} A service object.
   */
  async updateServiceOrderAndApplicationType(serviceId, data) {
    const query = `mutation updateServiceOrderAndApplication($data: ServiceUpdateInput!, $id: ID!){
      updateService(
        where: {id: $id}
        data: $data
      ) {
        serviceName
        serviceOrder
        serviceApplication
      }
    }`;

    const variables = {
      id: serviceId,
      data: {
        serviceOrder: data.serviceOrder,
        serviceApplication: data.serviceApplication,
      },
    };

    return await graphCMSRequest(query, variables);
  },

  /**
   * Update the range service by its id.
   * @param data The range to update the service.
   * @return {Promise<any>} A service object.
   */
  async updateRangesPhase(data) {
    const query = `mutation updateRangesPhase($data: ServiceUpdateInput!, $id: ID!) {
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
  },
};
