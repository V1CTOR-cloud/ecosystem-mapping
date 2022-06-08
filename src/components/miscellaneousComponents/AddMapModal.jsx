import React, { useEffect, useState } from "react";

import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import SelectLocationComponent from "../regionComponents/SelectLocationComponent";
import "../../assets/fonts/fonts.css";
import SelectIndustry from "../industryComponant/SelectIndustry";
import { Authentication } from "../../service/authentication";
import { Region } from "../../service/region";
import { Map } from "../../service/map";

const headerStyle = {
  fontFamily: "Ubuntu",
  fontSize: "64px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "90px",
  letterSpacing: "0em",
  textAlign: "left",
};

const htagStyle = {
  fontFamily: "Ubuntu",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "28px",
  letterSpacing: "0em",
  textAlign: "left",
  mt: "24px",
};
const modalWidth = {
  maxWidth: "704px",
};

const CreateButton = chakra(IconButton, {
  baseStyle: {
    backgroundColor: "transparent !important",
    border: "none !important",
    boxShadow: "none !important",
    isRound: "true",
    margin: "auto",
    display: "block",
    cursor: "pointer",
    marginTop: "15px",
    size: "lg",
  },
});

const AddMapModal = (props) => {
  const { isEdit, isAdd } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const toast = useToast();
  const [mapName, setMapName] = useState();
  const [locationData, setLocationData] = useState({});
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCites] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [subIndustries, setSubIndustries] = useState([]);

  const setInitialLocation = (locData) => {
    const allRegions = Region.getregions();
    const allCountries = Region.getCountriesByRegion(locData.region);
    const getStatesByCountry = Region.getStatesByCountry(
      locData.region,
      locData.country
    );

    const getCities = Region.getCitiesByState(
      locData.region,
      locData.country,
      locData.state
    );

    const allIndustries = Region.getIndustries();
    const getSubIndustriesByIndustry = Region.getSubIndustriesByIndustry(
      locData.industry
    );

    setRegions(allRegions);
    setCountries(allCountries);
    setStates(getStatesByCountry);
    setCites(getCities);
    setIndustries(allIndustries);
    setSubIndustries(getSubIndustriesByIndustry);
  };

  const handleLocationDataValidate = () => {
    const requiredLocationKeys = ["name", "region"];
    const locationKeys = Object.keys(locationData);
    locationData.inValidFields = requiredLocationKeys.filter(
      (key) => !locationKeys.includes(key) || locationData[key] === ""
    );
    setLocationData(locationData);
  };

  const handleIndustryChange = (key, value) => {
    locationData[key] = value;
    setLocationData(locationData);
    handleLocationDataChange(locationData);
  };

  const handleLocationDataChange = (locData) => {
    setInitialLocation(locData);
    handleLocationDataValidate();
  };

  const handleLocationChange = (key, value) => {
    let locData = locationData;
    locData[key] = value;
    if (key === "region") {
      locData.country = "";
      locData.state = "";
      locData.city = "";
    }
    if (key === "country") {
      locData.state = "";
      locData.city = "";
    }
    if (key === "state") {
      locData.city = "";
    }
    setLocationData(locData);
    handleLocationDataChange(locData);
  };

  const handleAddMap = () => {
    let location = locationData;
    location.name = mapName;
    handleLocationDataValidate();
    if (
      locationData.inValidFields.length === 0 ||
      locationData.region === "Global"
    ) {
      Map.addMap(location).then((res) => {
        if (res.id !== undefined) {
          toast({
            title: t("startup.toast.create"),
            description: t("startup.toast.create.map.message"),
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
          onClose();
          navigate("/dashboard/" + res.id);
        }
      });
    } else {
      toast({
        description: t("startup.toast.create.map.select.location"),
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const EditMap = () => {
    handleLocationDataValidate();
    if (
      locationData.inValidFields.length === 0 ||
      locationData.region === "Global"
    ) {
      Map.editMap(locationData).then((res) => {
        if (res !== undefined) {
          toast({
            title: t("startup.toast.update"),
            description: t("startup.toast.update.map.message"),
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        }
        onClose();
      });
    } else {
      toast({
        description: t("startup.toast.create.map.select.location"),
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMapName(mapName);
  };

  const handleOpenModal = () => {
    if (Authentication.isLoggedIn()) {
      setInitialLocation(locationData);
      onOpen();
    } else {
      toast({
        description: t("startup.toast.sign.in"),
        status: "warning",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Region.listAllRegions();
      await Region.listAllIndustries();
      setInitialLocation(locationData);
    };

    fetchData().catch(console.error);
  }, [locationData, isEdit, isAdd]);

  return (
    <React.Fragment>
      {isEdit ? (
        <MenuItem onClick={onOpen}>
          {t("startup.list.map.page.map.card.edit")}
        </MenuItem>
      ) : isAdd ? (
        <CreateButton onClick={handleOpenModal} />
      ) : (
        <React.Fragment>
          <h1 style={headerStyle}>
            {t("startup.landing.page.content.welcome.message")}
          </h1>
          <h1 style={htagStyle}>
            {t("startup.landing.page.content.welcome.tagline.text")}
          </h1>
          <Flex alignItems="flex-start">
            <Button mt="30px" onClick={handleOpenModal} className="btn-ad-mp">
              {t("startup.landing.page.create.map.button")}
            </Button>
          </Flex>
        </React.Fragment>
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isCentered={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent style={modalWidth}>
          {isEdit ? (
            <ModalHeader className="md-hdr-fnt">
              {t("startup.popup.ecosystem.map.heading.edit")}
            </ModalHeader>
          ) : (
            <ModalHeader className="md-hdr-fnt">
              {t("startup.popup.ecosystem.map.heading.create")}
            </ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl onSubmit={(e) => handleSubmit(e)}>
              <FormLabel className="md-ip-lbl">
                {t("startup.popup.ecosystem.map.title")}
              </FormLabel>
              {isEdit ? (
                <Input
                  className="fm-ip-flds"
                  value={locationData["name"]}
                  onChange={(e) => {
                    setLocationData({
                      ...locationData,
                      name: e.target.value,
                    });
                  }}
                />
              ) : (
                <Input
                  className="fm-ip-flds"
                  value={locationData["name"]}
                  onChange={(e) => setMapName(e.target.value)}
                />
              )}
              <FormLabel className="md-ip-lbl" mt={4}>
                {t("startup.popup.ecosystem.map.location")}
              </FormLabel>
              <SelectLocationComponent
                locationData={locationData}
                onLocationChange={handleLocationChange}
                regions={regions}
                states={states}
                countries={countries}
                cities={cities}
              />
              <FormLabel className="md-ip-lbl" mt={4}>
                {t("startup.popup.ecosystem.map.industry")}
              </FormLabel>
              <SelectIndustry
                locationData={locationData}
                onIndustryChange={handleIndustryChange}
                industries={industries}
                subIndustries={subIndustries}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button className="btn-cnl btn-fnt" onClick={onClose}>
              {t("startup.popup.ecosystem.map.button.cancel")}
            </Button>
            {isEdit ? (
              <Button
                className="btn-crt btn-crt-sty"
                colorScheme="blue"
                mr={3}
                m="0"
                onClick={() => {
                  EditMap();
                }}
              >
                {t("startup.popup.ecosystem.map.button.save")}
              </Button>
            ) : (
              <Button
                className="btn-crt btn-crt-sty"
                colorScheme="blue"
                mr={3}
                m="0"
                disabled={!mapName}
                onClick={handleAddMap}
              >
                {t("startup.popup.map.button.create")}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

AddMapModal.defaultProps = {
  isEdit: false,
};

AddMapModal.propTypes = {
  isEdit: PropTypes.bool,
  isAdd: PropTypes.bool.isRequired,
};

export default AddMapModal;
