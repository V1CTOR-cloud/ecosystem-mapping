import React from "react";
import {
  Box,
  Text,
  chakra,
  Image,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  Button,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import imgAkar from "../../src/assets/images/akar-icons_circle-plus.png";
import NavBar from "../components/miscellaneousComponents/NavBar";
import dotsImg from "../../src/assets/images/3dots.png";
import {
  AddMapModal,
  DeleteModal,
} from "../components/miscellaneousComponents";
import Service from "../service/RegionServices";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Card = chakra(Box, {
  baseStyle: {
    background: "#FFFFFF",
    boxShadow: "0px 4px 7px 1px rgba(0, 0, 0, 0.25)",
    margin: "0px 30px 15px 30px",
    fontSize: "18px",
    rounded: "xl",
  },
});
const AkarIcon = chakra(Image, {
  baseStyle: {
    width: "65px",
    marginLeft: "4.5vw",
    position: "absolute",
  },
});
AkarIcon.defaultProps = {
  src: imgAkar,
};
const ImgDots = chakra(Image, {
  baseStyle: {
    width: "23px",
    cursor: "pointer",
    marginTop: "15px",
  },
});
const CreateButton = chakra(Button, {
  baseStyle: {
    backgroundColor: "transparent !important",
    border: "none !important",
    boxShadow: "none !important",
    height: "100%",
    borderRadius: "60%",
    position: "unset",
  },
});
const LogMenuList = chakra(MenuList, {
  baseStyle: {
    marginTop: "-10px",
    marginLeft: "15px",
    padding: "0px",
    boxShadow: "0px 20px 40px -2px rgba(34, 44, 47, 0.15) !important",
  },
});
const ListMapPage = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchAllEcoMaps();
    Service.listAllRegions();
    Service.listAllIndustries();
  }, []);
  const notified = () => {
    fetchAllEcoMaps();
  };
  const fetchAllEcoMaps = () => {
    Service.getAllEcoMap().then((res) => {
      setData(res);
    });
  };
  const handleServiceClick = (id) => {
    history.push({ pathname: "/services/" + id });
  };
  return (
    <>
      <Box className="wrapper">
        <Grid className="topNav">
          <NavBar />
        </Grid>
        <Text textAlign="center" mt="20px">
          {t("startup.list.map.page.header")}
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={5} mt="20px">
          {data.map((data) => (
            <Card w="80%" h="170" cursor="pointer">
              <WrapItem float="right" display="flex">
                <Menu>
                  <MenuButton as={CreateButton}>
                    <ImgDots src={dotsImg} />
                  </MenuButton>
                  <LogMenuList>
                    <Box>
                      <AddMapModal
                        data={data}
                        isEdit={true}
                        notifyParent={() => notified()}
                      />
                      <DeleteModal
                        notifyParent={() => notified()}
                        id={data.id}
                      />
                    </Box>
                  </LogMenuList>
                </Menu>
              </WrapItem>
              <Box
                marginTop="15px"
                padding="20px"
                onClick={() => handleServiceClick(data.id)}
                textOverflow="ellipsis"
              >
                <Box fontWeight="bold"> {data.name}</Box>
                <Box>
                  <span>{data.region}</span>
                  <br />
                  <span>{data.country}</span>
                  <br />
                  <span>{data.state}</span>
                </Box>
              </Box>
            </Card>
          ))}
          <Card w="80%" h="170">
            <Box>
              <AkarIcon />
              <AddMapModal isAdd={true} />
            </Box>
            <Text
              fontWeight="bold"
              padding="15px"
              textAlign="center"
              marginTop="15px"
            >
              {t("startup.list.map.page.add.map.card")}
            </Text>
          </Card>
        </Grid>
      </Box>
    </>
  );
};

export {ListMapPage};
