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
  }
}