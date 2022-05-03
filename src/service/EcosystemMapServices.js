import { GraphQLClient } from "graphql-request";
import { getCurrentUser } from "./AuthenticationService";
import Logo from "assets/images/Logo.png";

const { REACT_APP_GRAPH_CMS_CONTENT_API_KEY, REACT_APP_GRAPH_CMS_TOKEN_KEY } =
  process.env;

const authorizationKey = `Bearer ${REACT_APP_GRAPH_CMS_TOKEN_KEY}`;
const graphCMSKey = REACT_APP_GRAPH_CMS_CONTENT_API_KEY;

class Service {
  // Get all the services for a specific map
  async getMapServices(mapID) {
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
          verifiedService
          serviceStartTime
          serviceEndTime
          timezone
          stage
          serviceDescription
          serviceBreif
          serviceOutcomes
          fromPhase
          toPhase
          serviceComments {
            userComments
            updatedDataAt
            serviceStatus
            currentUser
          }
          budget
          serviceAudience
          tagTitle
          followingService
          previousService
          applicationType
          serviceLocation
          onlineService
          offlineService
          serviceStatus
          updatedTypeAt
          order
        }
      }
  `;

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    return await graphCMS.request(query);
  }

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

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    return await graphCMS.request(query, variables);
  }

  async createService(data) {
    const query = `mutation ($data: ServiceCreateInput!) {
        createService(data: $data){id}
      }`;

    const variables = {
      data: {
        serviceName: data.name,
        serviceFocus: data.serviceFocus,
        serviceOwner: {
          connect: [{ Organisation: { id: data.organisationId } }],
        },
        applicationType: data.applicationType,
        serviceStartTime: data.serviceStartTime,
        serviceEndTime: data.serviceEndTime,
        link: data.link,
        serviceLocation: data.location,
        serviceAudience: data.audience,
        serviceDescription: data.description,
        serviceOutcomes: data.outcomes,
        previousService: data.precededService,
        followingService: data.followedService,
        fromPhase: data.fromPhase,
        toPhase: data.toPhase,

        ecosystemMap: { connect: { id: data.mapId } },
        serviceStatus: data.serviceStatus,
      },
    };

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    console.log(data.name);
    console.log(data.mapId);

    const secondaryQuery = `
      query MyQuery {
        services(where: {serviceName: "${data.name}", AND: {ecosystemMap: {id: "${data.mapId}"}}}) {
          id
          serviceName
          ecosystemMap {
            id
          }
        }
      }`;

    const res = await graphCMS.request(secondaryQuery);

    // Check if we have the name of the service already taken.
    if (res.services.length !== 0) {
      return "A service with the same name exist. Please change the service name to be unique.";
    } else {
      return await graphCMS.request(query, variables);
    }
  }

  async updateRangesPhase(data) {
    const query = `mutation ($data: ServiceUpdateInput!, $id: ID!) {
        updateService(where: {id: $id}, data: $data){
          serviceName
          fromPhase
          toPhase
        }
    }`;

    const variables = {
      id: data.id,
      data: {
        fromPhase: data.fromPhase,
        toPhase: data.toPhase,
      },
    };

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    return await graphCMS.request(query, variables);
  }

  async updateApplicationType(data) {
    const query = `mutation ($data: ServiceUpdateInput!, $id: ID!) {
        updateService(where: {id: $id}, data: $data){
          id
          applicationType
        }
    }`;

    const variables = {
      id: data.id,
      data: {
        applicationType: data.applicationType,
        updatedTypeAt: new Date(),
      },
    };

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    return await graphCMS.request(query, variables);
  }

  async getAllOrganisation() {
    const query = `{
      organisations {
        id
        organisationName
      }
    }`;

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    return await graphCMS.request(query);
  }

  async getAllAudiences() {
    const query = `{
      audiences {
        id
        audienceName
      }
    }`;

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    return await graphCMS.request(query);
  }

  async getAllTags() {
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    const { services } = await graphcms.request(
      `query MyQuery {
        services {
          tagTitle
        }
      }
      `
    );
    return services;
  }

  async addOrg(data) {
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    const { createOrganisation } = await graphcms.request(
      `mutation ($data: OrganisationCreateInput!) {
          createOrganisation(data: $data){id}
      }`,
      {
        data: {
          organisationName: data.orgName,
          startingStageRange: parseInt(data.startRange),
          endingStageRange: parseInt(data.endRange),
          organizationType: data.type,
          websiteURL: data.orgUrl,
        },
      }
    );
    return createOrganisation;
  }

  async editService(data) {
    let user = getCurrentUser();
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    let datatosend = {
      id: data.id,
      data: {
        serviceName: data.basicService[0],
        serviceOwner: {
          connect: [
            {
              Organisation: {
                where: { id: data.basicService[1] },
                position: { start: true },
              },
            },
          ],
          // disconnect: [
          //   { Organisation: { id: data.basicService[1] } },
          // ],
        },
        serviceFocus: data.basicService[2],
        applicationType: data.basicService[3],
        timezone: data.serviceAvailability.timezone,
        serviceBreif: data.serviceInfo.descService,
        serviceDescription: data.serviceInfo.descServiceDettail,
        //verifiedService: data.serviceInfo.isVerified === "1" ? true : false,
        fromPhase: data.serviceInfo.phase.low,
        toPhase: data.serviceInfo.phase.high,
        followingService: data.serviceInfo.service1,
        previousService: data.serviceInfo.service2,
        serviceStartTime: data.serviceAvailability.startDate,
        serviceEndTime: data.serviceAvailability.endDate,
        onlineService: data.serviceAvailability.online,
        offlineService: data.serviceAvailability.venue,
        serviceAudience: data.serviceInfo.audience,
        budget: data.serviceInfo.budget,
        tagTitle: data.tags,
        serviceOutcomes: data.serviceInfo.expectations,
        serviceLocation: data.serviceAvailability.serviceLocation,
        serviceStatus: data.serviceStatus,
      },
    };
    if (data.comments !== "") {
      datatosend.data = {
        ...datatosend.data,
        serviceComments: {
          create: [
            {
              userComments: data.comments,
              updatedDataAt: new Date(),
              serviceStatus: data.serviceStatus,
              currentUser: user.firstName + " " + user.lastName,
            },
          ],
        },
      };
    }

    return await graphcms
      .request(
        `mutation ($data: ServiceUpdateInput!, $id: ID!) {
          updateService(where: {id: $id}, data: $data){id}
      }`,
        datatosend
      )
      .catch((res) => {
        if (
          res.response.errors[0].message ===
          'value is not unique for the field "serviceName"'
        ) {
          return "Service With the same name Exist.";
        }
      });
  }

  async authenticationUser(userData) {
    const query = `query {
      cPTUserAccount(where: {email: "${userData.email}"}) {
        email
        id
        firstName
        lastName
        profileImage {
          url
        }
      }
    }`;
    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    const res = await graphCMS.request(query);

    // We check if the user already exist in the database and take different action depending on the response.
    if (res.cPTUserAccount) {
      return this.setSessionStorageUser(res.cPTUserAccount);
    } else {
      return await this.createAccount(userData);
    }
  }

  async createAccount(userData) {
    const query = `mutation ($data: CPTUserAccountCreateInput!) {
            createCPTUserAccount(data: $data) {
              id
            }
          }`;

    const graphCMS = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });

    const createCPTUserAccount = await graphCMS.request(query, {
      data: {
        firstName: userData.name,
        lastName: userData.family_name,
        email: userData.email,
        profileName: userData.name + " " + userData.family_name,
      },
    });

    // Formatting the data for the sessionStorage
    const data = {
      email: userData.email,
      id: createCPTUserAccount.id,
      firstName: userData.name,
      lastName: userData.family_name,
      profileImage: {
        url: null,
      },
    };

    return this.setSessionStorageUser(data);
  }

  setSessionStorageUser(data) {
    if (data) {
      // Assign the profileImage to the SC logo if not defined
      if (!data.profileImage) {
        data.profileImage = {
          url: Logo,
        };
      }
      sessionStorage.setItem("user", JSON.stringify(data));
    } else {
      sessionStorage.removeItem("user");
    }
    return JSON.parse(sessionStorage.getItem("user"));
  }
}

export default new Service();
