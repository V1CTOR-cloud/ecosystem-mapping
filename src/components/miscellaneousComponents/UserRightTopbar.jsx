import React from "react";
import {
  Image,
  Text,
  WrapItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  chakra,
  Flex,
  Box
} from "@chakra-ui/react";
import imgArrow from "../../assets/images/arrow down.png";
import { useHistory } from "react-router-dom";
import { getCurrentUser, userLogOut } from "../../service/AuthenticationService"
import { useTranslation } from 'react-i18next';

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
const UserRightTopbar = () => {
  const { t } = useTranslation();
  let history = useHistory();
  //let user = JSON.parse(sessionStorage.getItem("user"))
  let user = getCurrentUser()
  const onEcosystemMaps = () => {
     history.push("/ecosystemmap");
    };
    const onLogout = () => {
      userLogOut()
      history.push("/")
};
  return (
    <WrapItem float={"right"} display="flex">
      <Image borderRadius="50%" width="50px" src={user.user.photoURL} alt="image" />
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
            <Image ml="20px" borderRadius="50%" width="50px" src={user.user.photoURL} alt="image" />
              <Text m="auto" ml="15px">{user.user.displayName}</Text>
          </Flex>
          <Box p="15px">
          <MenuItem onClick={onEcosystemMaps}> {t('startup.landing.page.header.user.profile.menu.list.map.text')} </MenuItem>
          <MenuItem onClick={onLogout}> {t('startup.landing.page.header.user.profile.logout.text')} </MenuItem>
          </Box> 
        </LogMenuList>
      </Menu>
    </WrapItem>
  );
};
export { UserRightTopbar };
