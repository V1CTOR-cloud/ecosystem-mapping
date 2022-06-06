import { graphCMSRequest } from "./graphCMS";

export const Organisation = {

  // Get all the existing organisation.
  async getAllOrganisation() {
    const query = `{
      organisations {
        id
        organisationName
      }
    }`;

    return await graphCMSRequest(query);
  },

  async addOrganisation(data) {
    const query = `mutation ($data: OrganisationCreateInput!) {
          createOrganisation(data: $data){id}
      }`;

    const variables = {
      data: {
        organisationName: data.orgName,
        startingStageRange: parseInt(data.startRange),
        endingStageRange: parseInt(data.endRange),
        organizationType: data.type,
        websiteURL: data.orgUrl
      }
    };

    return await graphCMSRequest(query, variables);;
  }
};