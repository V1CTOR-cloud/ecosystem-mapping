import React from "react";

import {
  Box,
  Button,
  chakra,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import imgArrow from "../../assets/images/arrow down.png";
import {
  getCurrentUser,
  userLogOut,
} from "../../service/AuthenticationService";

const LogMenuList = chakra(MenuList, {
  baseStyle: {
    width: "320px",
    marginTop: "20px",
    boxShadow: "0px 20px 40px -2px rgba(34, 44, 47, 0.15) !important",
    borderRadius: "4px !important",
    fontSize: "16px",
    letterSpacing: "0.02em",
  },
});

const UserAccountMenu = () => {
  const { t } = useTranslation();
  let history = useHistory();
  let user = getCurrentUser();

  const handleMyMapsClick = () => {
    history.push("/ecosystemmap");
  };

  const handleLogout = () => {
    userLogOut();
    history.push("/");
  };

  return (
    <WrapItem float={"right"} display="flex">
      <Image
        borderRadius="50%"
        width="50px"
        src={user.user.photoURL}
        alt="image"
      />
      <Text mt="15px" className="un-lbl">
        {user._tokenResponse.firstName}
      </Text>
      <Image src={imgArrow} alt="image" mt="19px" ml="10px" />
      <Menu>
        <MenuButton
          as={Button}
          backgroundColor="transparent !important"
          border="none !important"
          boxShadow="none !important"
          marginLeft="-15px"
        />
        <LogMenuList>
          <Flex mt="15px">
            <Image
              ml="20px"
              borderRadius="50%"
              width="50px"
              src={user.user.photoURL}
              alt="image"
            />
            <Text m="auto" ml="15px">
              {user.user.displayName}
            </Text>
          </Flex>
          <Box p="15px">
            <MenuItem onClick={handleMyMapsClick}>
              {" "}
              {t(
                "startup.landing.page.header.user.profile.menu.list.map.text"
              )}{" "}
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              {" "}
              {t("startup.landing.page.header.user.profile.logout.text")}{" "}
            </MenuItem>
          </Box>
        </LogMenuList>
      </Menu>
    </WrapItem>
  );
};

export default UserAccountMenu;
