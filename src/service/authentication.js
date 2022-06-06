import { graphCMSRequest } from "./graphCMS";

import Logo from "../assets/images/Logo.png";

export const Authentication = {

  async createAccount(userData) {
    const query = `mutation ($data: CPTUserAccountCreateInput!) {
            createCPTUserAccount(data: $data) {
              id
            }
          }`;

    const variables = {
      data: {
        firstName: userData.name,
        lastName: userData.family_name,
        email: userData.email,
        profileName: userData.name + " " + userData.family_name,
      },
    }

    const createCPTUserAccount = await graphCMSRequest(query, variables);

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
  },

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

    const res = await graphCMSRequest(query);

    // We check if the user already exist in the database and take different action depending on the response.
    if (res.cPTUserAccount) {
      return this.setSessionStorageUser(res.cPTUserAccount);
    } else {
      return await this.createAccount(userData);
    }
  },

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
  },

  isLoggedIn() {
    return !!JSON.parse(sessionStorage.getItem("user"));
  },

  getCurrentUser() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      if (!user.profileImage.url) {
        user.profileImage = {
          url: Logo
        };
        sessionStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    }
    return null;
  }
};
