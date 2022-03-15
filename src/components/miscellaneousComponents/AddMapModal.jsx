import React from "react";
import { useState, useEffect } from "react";
import {
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Flex,
  MenuItem,
  useToast,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import "../../assets/fonts/fonts.css";
import { withRouter } from "react-router";
import { RegionComponent } from "components/regionComponents/RegionComponent";
import SelectIndustry from "components/IndustryComponant/SelectIndustry";
import Service from "../../service/RegionServices";
import { useHistory } from "react-router-dom";
import { isLoggedIn } from "../../service/AuthenticationService";
import { useTranslation } from "react-i18next";

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

const AddMapModal = ({ isEdit, data, isAdd, notifyParent, isHome }) => {
  const { t } = useTranslation();
  const history = useHistory();
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
  const [subindustries, setSubindustries] = useState([]);

  const createMapCallback = (key, value) => {
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
    locationDataHandleChange(locData);
  };
  useEffect(() => {
    Service.listAllRegions();
    Service.listAllIndustries();
    setInitialLocationState(locationData);
  }, [locationData, isEdit, isAdd, data, isHome]);

  const setInitialLocationState = (locData) => {
    const allRegions = Service.getregions();
    const allCountries = Service.getCountriesByRegion(locData.region);
    const getStatesByCountry = Service.getStatesByCountry(
      locData.region,
      locData.country
    );
    const getCities = Service.getCitiesByState(
      locData.region,
      locData.country,
      locData.state
    );
    const allIndustries = Service.getIndustries();
    const getSubIndustriesByIndustry = Service.getSubIndustriesByIndustry(
      locData.industry
    );
    setRegions(allRegions);
    setCountries(allCountries);
    setStates(getStatesByCountry);
    setCites(getCities);
    setIndustries(allIndustries);
    setSubindustries(getSubIndustriesByIndustry);
  };

  const locationDataHandleChange = (locData) => {
    setInitialLocationState(locData);
    validateLocationData();
  };

  const validateLocationData = () => {
    const requiredLocationKeys = ["name", "region"];
    const locationKeys = Object.keys(locationData);
    const inValidFields = requiredLocationKeys.filter(
      (key) => !locationKeys.includes(key) || locationData[key] === ""
    );
    locationData.inValidFields = inValidFields;
    setLocationData(locationData);
  };

  const AddMap = () => {
    let location = locationData;
    location.name = mapName;
    validateLocationData();
    if (
      locationData.inValidFields.length === 0 ||
      locationData.region === "Global"
    ) {
      Service.addEcoMap(location).then((res) => {
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
          history.push({
            pathname: "/services/" + res.id,
            state: { mapName: mapName },
          });
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

  const onEdit = () => {
    onOpen();
    locationDataHandleChange(data);
    setMapName(data.name);
    setLocationData(data);
  };
  const EditMap = () => {
    validateLocationData();
    if (
      locationData.inValidFields.length === 0 ||
      locationData.region === "Global"
    ) {
      Service.editEcoMap(locationData).then((res) => {
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
        notifyParent();
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
  const SubmitDetails = (e) => {
    e.preventDefault();
    setMapName({ mapName: mapName });
  };

  const onOpenModal = () => {
    if (isLoggedIn()) {
      setInitialLocationState(locationData);
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

  return (
    <React.Fragment>
      {isHome ? (
        <Link onClick={onOpenModal}>
          <Text color="blue" m="7px" fontSize="17px">
            {t("startup.home.page.header.add.map.link")}
          </Text>
        </Link>
      ) : //   <IconButton
      //   colorScheme="blue"
      //   aria-label="Search database"
      //   borderRadius="50%"
      //   marginLeft="15px"
      //   icon={<AddIcon />}
      // />
      isEdit ? (
        <MenuItem onClick={onEdit}>
          {t("startup.list.map.page.map.card.edit")}
        </MenuItem>
      ) : isAdd ? (
        <CreateButton onClick={onOpenModal} />
      ) : (
        <React.Fragment>
          <h1 style={headerStyle}>
            {t("startup.landing.page.content.welcome.message")}
          </h1>
          <h1 style={htagStyle}>
            {t("startup.landing.page.content.welcome.tagline.text")}
          </h1>
          <Flex alignItems="flex-start">
            <Button mt="30px" onClick={onOpenModal} className="btn-ad-mp">
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
            <FormControl onSubmit={(e) => SubmitDetails(e)}>
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
                    //validateLocationData();
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
              <RegionComponent
                locationData={locationData}
                createMapCallback={createMapCallback}
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
                createMapCallback={createMapCallback}
                industries={industries}
                subIndustries={subindustries}
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
                disabled={!mapName ? true : false}
                onClick={() => AddMap()}
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
export default withRouter(AddMapModal);
