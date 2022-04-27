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

  async addService(data) {
    let user = getCurrentUser();
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    return await graphcms
      .request(
        `mutation ($data: ServiceCreateInput!) {
        createService(data: $data){id}
      }`,
        {
          data: {
            serviceName: data.basicService[0],
            serviceOwner: {
              connect: [{ Organisation: { id: data.basicService[1] } }],
            },
            followingService: data.serviceInfo.service1,
            previousService: data.serviceInfo.service2,
            serviceFocus: data.basicService[2],
            applicationType: data.basicService[3],
            serviceStartTime: data.serviceAvailability.startDate,
            serviceEndTime: data.serviceAvailability.endDate,
            timezone: data.serviceAvailability.timezone,
            onlineService: data.serviceAvailability.online,
            offlineService: data.serviceAvailability.venue,
            serviceBreif: data.serviceInfo.descService,
            serviceDescription: data.serviceInfo.descServiceDettail,
            serviceAudience: data.serviceInfo.audience,
            budget: data.serviceInfo.budget,
            tagTitle: data.tags,
            verifiedService: data.serviceInfo.isVerified === "1",
            serviceOutcomes: data.serviceInfo.expectations,
            fromPhase: data.serviceInfo.phase.low,
            toPhase: data.serviceInfo.phase.high,
            //serviceComments: {create: {userComments: data.comments}},

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
            serviceStatus: data.serviceStatus,
            serviceLocation: data.serviceAvailability.serviceLocation,
            ecosystemMap: { connect: { id: data.mapID } },
            updatedTypeAt: new Date(),
          },
        }
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

  async getAllOrg() {
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    const { organisations } = await graphcms.request(
      `{
      organisations {
        id
        organisationName
      }
    }`
    );
    return organisations;
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
