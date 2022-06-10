import React, { useEffect, useState } from "react";

import {
  Box,
  chakra,
  Grid,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Grid as GridIcon } from "@styled-icons/bootstrap";

import NavigationBar from "../components/bar/navigationBar/NavigationBar";
import imgAkar from "../../src/assets/images/akar-icons_circle-plus.png";
import {
  AddMapModal,
  DeleteModal,
} from "../components/miscellaneousComponents";
import dotsImg from "../../src/assets/images/3dots.png";
import { Region } from "../service/region";
import { Map } from "../service/map";
import { AddIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import ButtonComponent from "../components/basic/buttons/ButtonComponent";
import { SortDownAlt } from "@styled-icons/bootstrap";
import IconButtonComponent from "../components/basic/buttons/IconButtonComponent";

const Card = chakra(Box, {
  baseStyle: {
    background: "#FFFFFF",
    boxShadow: "0px 4px 7px 1px rgba(0, 0, 0, 0.25)",
    margin: "0px 30px 15px 30px",
    fontSize: "18px",
    rounded: "xl",
    width: "80%",
    height: "170px",
    cursor: "pointer",
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

const LogMenuList = chakra(MenuList, {
  baseStyle: {
    marginTop: "-10px",
    marginLeft: "15px",
    padding: "0px",
    boxShadow: "0px 20px 40px -2px rgba(34, 44, 47, 0.15) !important",
  },
});

const ListMapPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);

  const handleMapChange = () => {
    getAllEcoMaps();
  };

  const handleServiceClick = (id) => {
    navigate("/dashboard/" + id);
  };

  const getAllEcoMaps = () => {
    Map.getAllUserMaps().then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      getAllEcoMaps();
      await Region.listAllRegions();
      await Region.listAllIndustries();
    };

    fetchData().catch(console.error);
  });

  const primaryButton = (
    <ButtonComponent
      isPrimary={true}
      padding={`0 0 0 12px`}
      buttonText={t("mapping.navigation.bar.new.map.button")}
      icon={<AddIcon marginRight={2} color={"white"} w="15px" h="15px" />}
      onClick={() => {
        //TODO Create the function to create a map
      }}
    />
  );

  const additionalButton = (
    <HStack>
      {/* Button View */}
      <ButtonComponent
        isWithoutBorder={true}
        buttonText={t("mapping.navigation.bar.view.button")}
        icon={<GridIcon size="20" />}
        color={"black"}
        onClick={() => {}}
      />
      {/*Button sort*/}
      {/*TODO boutton*/}
      <ButtonComponent
        padding={`0 12px 0 12px`}
        isWithoutBorder={true}
        buttonText={t("mapping.navigation.bar.sort.button")}
        icon={
          <SortDownAlt
            size="20"
            title={t("mapping.navigation.bar.sort.button")}
          />
        }
        color={"black"}
        onClick={() => {}}
      />
      {/* Button search */}
      {!isOpen && (
        <IconButtonComponent
          icon={
            <SearchIcon
              color={isOpen ? "brand.500" : "blackAlpha.700"}
              w="15px"
              h="15px"
            />
          }
          onClick={onOpen}
        />
      )}
      {isOpen && (
        <InputGroup w="200px">
          <InputLeftElement cursor="pointer" onClick={() => {}}>
            <SearchIcon color={isOpen ? "brand.500" : "blackAlpha.700"} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={t("mapping.navigation.bar.search.placeholder")}
            border={0.5}
            borderColor={"brand.500"}
            _hover={{ borderColor: "brand.500" }}
          />
          <InputRightElement cursor="pointer" onClick={onClose}>
            <CloseIcon color={"blackAlpha.700"} />
          </InputRightElement>
        </InputGroup>
      )}
    </HStack>
  );

  return (
    <>
      <NavigationBar
        title={t("mapping.navigation.bar.map.dashboard.title")}
        button={primaryButton}
        additionalButtons={additionalButton}
      />
      <Box className="wrapper">
        <Text textAlign="center" mt="20px">
          {t("startup.list.map.page.header")}
        </Text>
        <Grid templateColumns="repeat(5, 1fr)" gap={5} mt="20px">
          {data.map((data) => (
            <Card key={data.name}>
              <WrapItem float="right" display="flex">
                <Menu>
                  <MenuButton>
                    <ImgDots src={dotsImg} />
                  </MenuButton>
                  <LogMenuList>
                    <Box>
                      <AddMapModal isAdd={false} isEdit={true} />
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
