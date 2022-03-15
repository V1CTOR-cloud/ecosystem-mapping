import { GraphQLClient } from "graphql-request";
import { getCurrentUser } from "./AuthenticationService";

const { REACT_APP_GRAPH_CMS_CONTENT_API_KEY } = process.env;

class Service {
  async getServicesList(mapID) {
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
          offlineSerivce
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
            serviceStartTime: data.serviceAvailibility.startDate,
            serviceEndTime: data.serviceAvailibility.endDate,
            timezone: data.serviceAvailibility.timezone,
            onlineService: data.serviceAvailibility.online,
            offlineSerivce: data.serviceAvailibility.venue,
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
            serviceLocation: data.serviceAvailibility.serviceLocation,
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
        timezone: data.serviceAvailibility.timezone,
        serviceBreif: data.serviceInfo.descService,
        serviceDescription: data.serviceInfo.descServiceDettail,
        //verifiedService: data.serviceInfo.isVerified === "1" ? true : false,
        fromPhase: data.serviceInfo.phase.low,
        toPhase: data.serviceInfo.phase.high,
        followingService: data.serviceInfo.service1,
        previousService: data.serviceInfo.service2,
        serviceStartTime: data.serviceAvailibility.startDate,
        serviceEndTime: data.serviceAvailibility.endDate,
        onlineService: data.serviceAvailibility.online,
        offlineSerivce: data.serviceAvailibility.venue,
        serviceAudience: data.serviceInfo.audience,
        budget: data.serviceInfo.budget,
        tagTitle: data.tags,
        serviceOutcomes: data.serviceInfo.expectations,
        serviceLocation: data.serviceAvailibility.serviceLocation,
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
    const graphcms = new GraphQLClient(REACT_APP_GRAPH_CMS_CONTENT_API_KEY, {
      headers: {
        authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ3ZWJhcHAiOnRydWUsInZlcnNpb24iOjQsImlhdCI6MTYyODA2MzMxMSwiZXhwIjoxNjI4MTA2NTExLCJhdWQiOlsiaHR0cHM6Ly9hcGktZXUtY2VudHJhbC0xLmdyYXBoY21zLmNvbS92Mi9ja29qeDQ0aXIwamxtMDF4czgyZThhdmpiL21hc3RlciJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6ImY1YTQ4ZDJhLWJlN2EtNDhjZC05ODVhLTAwZTg5NzhmMGJkNyIsImp0aSI6ImNrbHU1MTBwdnJvYnAwMXoxaGtwODFnc2MifQ.oacU9ey4lQgOG1lXR0G4Z7exqcDWMdiVEiGhlwNHb-M3BaNC2edVcaFufUm4ayPrhk-yG1BZ1225JLUBRskf8Yk5xnSH-pszMWl2jy9Ne0uHU2fHTkibBxQ3woOIuiG44MHN4cWfKn5hQRCAVPTzqI82kr5EyJjYDae_lZWP_nyVgcXOhUljkxb9f7BzBbqSKf-_aV0LrpL7RnjlfIpXl4gkEdZ2GmN2BqIn0GUC1dSajS-N-NbF6xBijR48mgeg6Sp1lgu68G7qKeohjaEtYYKKoAit8wHJ9sxosIppK6oqXVMY078EVS2lQ9o-jd_t3TmpJKaBY9_Zv0-xlQsz3fwHIHZm4PBmROrLz_UA9ZHJ08rXhQsOY96amBwFlTIStDpnrBYVQEMRTgfEE2CzSqTaarfaDWHrqFGgGjI0bBEQ1OhpygXOjNZCeBpLWipQINF3VOmovznVBXhonQX7ScrFqW0CW5uiJbWRw-kYjnm3MIceB9hkYlTlb88ONGi1pDoM57FTJ0VVhHZvj_rr-Wpbc-MPJZXi7toC-r5LayBXVE_XpURWnVshsgXkM0bfCDigkxZ8DoqaFdoN8KrqVQmW4U0YoB1V-55mN1tZJL2XnzLYAdNFJa2QZvC-R1mnCoe4VINoVAGdj6D5N9RaXr5OYgdFtwiyV364gQhKyHE`,
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
