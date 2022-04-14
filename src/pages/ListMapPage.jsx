import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  chakra,
  Grid,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import {
  AddMapModal,
  DeleteModal,
} from "../components/miscellaneousComponents";
import NavigationBar from "../components/navigationBar/NavigationBar";
import Service from "../service/RegionServices";
import imgAkar from "../../src/assets/images/akar-icons_circle-plus.png";
import dotsImg from "../../src/assets/images/3dots.png";

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

  const handleMapChange = () => {
    getAllEcoMaps();
  };

  const handleServiceClick = (id) => {
    history.push({ pathname: "/services/" + id });
  };

  const getAllEcoMaps = () => {
    Service.getAllEcoMap().then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      getAllEcoMaps();
      await Service.listAllRegions();
      await Service.listAllIndustries();
    };

    fetchData().catch(console.error);
  });

  return (
    <>
      <NavigationBar
        title={t("mapping.navigation.bar.map.dashboard.title")}
        buttonText={t("mapping.navigation.bar.new.map.button")}
        isMapDashboard={true}
      />
      <Box className="wrapper">
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
                        notifyParent={() => handleMapChange()}
                      />
                      <DeleteModal
                        notifyParent={() => handleMapChange()}
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

export default ListMapPage;
