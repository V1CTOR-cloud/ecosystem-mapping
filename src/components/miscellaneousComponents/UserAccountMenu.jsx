import React from "react";

import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

const UserAccountMenu = (props) => {
  const { t } = useTranslation();
  let history = useHistory();

  const handleMyMapsClick = () => {
    history.push("/ecosystemmap");
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        backgroundColor="transparent !important"
        border="none !important"
        boxShadow="none !important"
        marginLeft="-15px"
      >
        <HStack>
          <Image
            borderRadius="50%"
            width="40px"
            src={props.user.profileImage.url}
            alt="image"
          />
          <Text mt="15px" className="un-lbl">
            {props.user.firstName}
          </Text>
        </HStack>
      </MenuButton>
      <LogMenuList>
        <Flex mt="15px">
          <Image
            ml="20px"
            borderRadius="50%"
            width="50px"
            src={props.user.profileImage.url}
            alt="image"
          />
          <Text m="auto" ml="15px">
            {props.user.firstName + " " + props.user.lastName}
          </Text>
        </Flex>
        <Box p="15px">
          <MenuItem onClick={handleMyMapsClick}>
            {t("startup.landing.page.header.user.profile.menu.list.map.text")}
          </MenuItem>
          <MenuItem onClick={props.logOut}>
            {t("startup.landing.page.header.user.profile.logout.text")}
          </MenuItem>
        </Box>
      </LogMenuList>
    </Menu>
  );
};

export default UserAccountMenu;
