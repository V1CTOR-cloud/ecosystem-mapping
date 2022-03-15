import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Button,
  Center,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
//import imgLogo from "../../assets/images/Logo.png";
import {
  signInWithGoogle,
  isLoggedIn,
} from "../../service/AuthenticationService";
import { useTranslation } from "react-i18next";
import UserRightTopBar from "./UserRightTopBar";

export default function NavBar(props) {
  const { t } = useTranslation();
  const SigninwithFirebase = () => {
    signInWithGoogle((flag) => {
      console.log(flag);
      //props.notifyParent();
    });
  };
  const headerStyle = {
    fontFamily: "Ubuntu",
    fontSize: "20px",
    textShadow: "2px 2px 8px #afaebc",
  };

  return (
    <Box>
      <Flex>
        <Box w="80%" m="15px">
          <Breadcrumb separator="" pt="5" pb="5">
            <BreadcrumbItem ml="0">
              <Text style={headerStyle}>Ecosystem Mapping</Text>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink mt="5px" href="#">
                {t("startup.landing.page.header.about")}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink mt="5px" href="#">
                {t("startup.landing.page.header.learn")}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink mt="5px" href="#">
                {t("startup.landing.page.header.connect")}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink mt="5px" href="#">
                {t("startup.landing.page.header.scale")}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink mt="5px" href="#">
                {t("startup.landing.page.header.contact")}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        {isLoggedIn() ? (
          <Box w="20%" mt="30px" float="left">
            <UserRightTopBar /* user={user}*/ />{" "}
          </Box>
        ) : (
          <Box w="20%">
            <Button
              onClick={SigninwithFirebase}
              variant={"outline"}
              mt="30px"
              float="right"
              leftIcon={<FcGoogle />}
            >
              <Center>
                <Text>{t("startup.landing.page.login.google.button")}</Text>
              </Center>
            </Button>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
