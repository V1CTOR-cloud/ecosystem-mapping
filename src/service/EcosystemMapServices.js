import { GraphQLClient } from "graphql-request";
import { getCurrentUser } from "./AuthenticationService";

const { REACT_APP_GRAPH_CMS_CONTENT_API_KEY, REACT_APP_GRAPH_CMS_TOKEN_KEY } =
  process.env;

const authorizationKey = `Bearer ${REACT_APP_GRAPH_CMS_TOKEN_KEY}`;
const graphCMSKey = REACT_APP_GRAPH_CMS_CONTENT_API_KEY;

class Service {
  async getServicesList(mapID) {
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    const { services } = await graphcms.request(
      ` 
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
        }
      }
      `
    );
    return services;
  }

  async pushService(data) {
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
            verifiedService: data.serviceInfo.isVerified === "1" ? true : false,
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
                  currentUser: user.user.displayName,
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
      .then((res) => {
        return res;
      })
      .catch((res) => {
        debugger;
        if (
          res.response.errors[0].message ===
          'value is not unique for the field "serviceName"'
        ) {
          return { message: "Service With the same name Exist." };
        }
      });
  }

  async UpdatePhaseRangeonResize(data) {
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    return await graphcms.request(
      `mutation ($data: ServiceUpdateInput!, $id: ID!) {
        updateService(where: {id: $id}, data: $data){
          serviceName
          fromPhase
          toPhase
        }
    }`,
      {
        id: data.id,
        data: {
          toPhase: data.toPhase,
          fromPhase: data.fromPhase,
        },
      }
    );
  }

  async UpdateApplicationTypeonDrop(data) {
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    return await graphcms.request(
      `mutation ($data: ServiceUpdateInput!, $id: ID!) {
        updateService(where: {id: $id}, data: $data){
          id
          applicationType
        }
    }`,
      {
        id: data.id,
        data: {
          applicationType: data.applicationType,
          updatedTypeAt: new Date(),
        },
      }
    );
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
              currentUser: user.user.displayName,
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
      .then((res) => {
        return res;
      })
      .catch((res) => {
        if (
          res.response.errors[0].message ===
          'value is not unique for the field "serviceName"'
        ) {
          return { message: "Service With the same name Exist." };
        }
      });
  }

  async addUser(data) {
    const graphcms = new GraphQLClient(graphCMSKey, {
      headers: {
        authorization: authorizationKey,
      },
    });
    const { cPTUserAccounts } = await graphcms.request(
      `query MyQuery {
        cPTUserAccounts {
         id
         email
        }
      }`
    );
    let emails = [];
    cPTUserAccounts.map((values) => emails.push(values.email));
    let user = cPTUserAccounts.find((user) => user.email === data.user.email);

    if (!emails.includes(data.user.email)) {
      const { createCPTUserAccount } = await graphcms.request(
        `mutation ($data: CPTUserAccountCreateInput!) {
            createCPTUserAccount(data: $data) {
              id
            }
          }`,
        {
          data: {
            firstName: data._tokenResponse.firstName,
            lastName: data._tokenResponse.lastName,
            email: data.user.email,
            profileName: data.user.displayName,
          },
        }
      );
      let sessionUser = data;
      sessionUser["id"] = createCPTUserAccount.id;
      sessionStorage.setItem("user", JSON.stringify(sessionUser));
      return createCPTUserAccount;
    } else {
      let sessionUser = data;
      if (user) {
        sessionUser["id"] = user.id;
      }
      sessionStorage.setItem("user", JSON.stringify(sessionUser));
    }
    window.location.reload();
  }
}

export default new Service();
