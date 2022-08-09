import React from "react";

import { Box, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import UserAccountMenu from "./UserAccountMenu";
import { signOut } from "../../service/cognitoAuth";
import { useStore as userStore } from "../../models/userStore";

const Authentication = () => {
  const { t } = useTranslation();
  const clearUser = userStore((state) => state.clearUser);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const userInfo = {
    id: "cl2eo5jiq0fx40bujy19a5yqz",
    email: "mickaelbenasse@gmail.com",
    firstName: "Mickaël",
    lastName: "Benasse",
    profileImage: {
      url: "https://media.graphassets.com/LnSJyHqkS1KuOBCmrSFN",
    },
  };

  sessionStorage.setItem("user", JSON.stringify(userInfo));

  // Sign out first, then we force to close the modal of authentication, and finally we reset the session storage
  const handleLogOut = async () => {
    const res = await signOut(clearUser);

    if (res === true) {
      navigate("/authentication");
    }
  };

  // User is connected, we give him the menu
  if (isLoggedIn) {
    return (
      <Box align="right">
        <UserAccountMenu logOut={handleLogOut} user={userInfo} />
      </Box>
    );
  } else {
    return (
      <Box align="right">
        <Button onClick={() => navigate("/authentication")} variant="outline">
          {t("mapping.navigation.bar.login")}
        </Button>
      </Box>
    );
  }
};

export default Authentication;
