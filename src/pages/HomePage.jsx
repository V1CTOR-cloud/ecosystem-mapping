import React, { useEffect, useState } from "react";

import {
  Box,
  Grid,
  GridItem,
  Image,
  Select,
  useToast,
  VStack,
  WrapItem,
} from "@chakra-ui/react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import SideBar from "components/miscellaneousComponents/SideBar";
import AddMapModal from "components/miscellaneousComponents/AddMapModal";
import ConverterSDP from "components/miscellaneousComponents/ConverterSDP";
import UserAccountMenu from "components/miscellaneousComponents/UserAccountMenu";
import AddServiceModal from "components/serviceComponents/AddServiceModal";
import ServiceFilter from "components/serviceComponents/ServiceFilter";
import ServiceMap from "components/serviceMapComponents/serviceMap";
import Service from "service/EcosystemMapServices";
import ServiceRegion from "service/RegionServices";
import imgLocation from "../assets/images/location 2.png";

const HomePage = () => {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  const toast = useToast();
  const history = useHistory();

  const [item, setItem] = useState([]);
  const [mapList, setMapList] = useState([]);
  const [mapName, setMapName] = useState({});
  const [filter, setFilter] = useState({});
  const [tempService, setTempService] = useState([]);

  const handleServiceCategoryValCallback = () => {
    const filteredData = handleFilterByMultipleColumns(item, filter);
    setItem(filteredData);
  };

  const handleFilterValuesCallback = (key, value) => {
    filter[key] = value;
    setFilter(filter);
  };

  const handleClearFilter = () => {
    getService(mapName.id);
    setFilter({});
  };

  const handleMapChange = (e) => {
    const { value } = e.target;
    const selectedMap = mapList.find((map) => map.id === value);
    if (selectedMap) {
      setMapName(selectedMap);
      history.replace("/services/" + value);
    }
    if (
      value === t("startup.landing.page.header.user.profile.menu.list.map.text")
    ) {
      history.push("/ecosystemmap");
    }
  };

  const handleCreateNewService = (data) => {
    Service.pushService(data).then((res) => {
      getService(mapName.id);
      if (res.message !== undefined) {
        getToast();
      }
    });
  };

  const handleFilterByMultipleColumns = (items, filterCriteria) => {
    let result = tempService;

    Object.keys(filterCriteria).forEach((criteria) => {
      switch (criteria) {
        case "serviceName":
          result =
            filterCriteria.serviceName !== ""
              ? result.filter((i) =>
                  i.serviceName
                    .toLowerCase()
                    .includes(filterCriteria.serviceName.toLowerCase())
                )
              : result;
          break;
        case "location":
          result = filterCriteria.location
            ? result.filter(
                (item) =>
                  (filterCriteria.location.onlineService ===
                    item.onlineService ||
                    filterCriteria.location.offlineSerivce ===
                      item.offlineSerivce) &&
                  item.serviceLocation !== ""
              )
            : result;
          break;
        case "serviceFocus":
          result =
            filterCriteria.serviceFocus.length > 0
              ? result.filter((i) =>
                  filterCriteria.serviceFocus.includes(i.serviceFocus)
                )
              : result;
          break;
        case "serviceStatus":
          result =
            filterCriteria.serviceStatus.length > 0
              ? result.filter((i) =>
                  filterCriteria.serviceStatus.includes(i.serviceStatus)
                )
              : result;
          break;
        case "applicationType":
          result =
            filterCriteria.applicationType.length > 0
              ? result.filter((i) =>
                  filterCriteria.applicationType.includes(i.applicationType)
                )
              : result;
          break;
        case "phase":
          result = result.filter(
            (i) =>
              ConverterSDP.getPoint(i.fromPhase) >=
                ConverterSDP.getPoint(filterCriteria.phase.fromPhase) &&
              ConverterSDP.getPoint(i.toPhase) <=
                ConverterSDP.getPoint(filterCriteria.phase.toPhase)
          );
          break;
        default:
          result = tempService;
          break;
      }
    });
    return result;
  };

  const getService = (mapID) => {
    Service.getServicesList(mapID).then((res) => {
      setItem(res);
      setTempService(res);
    });
  };

  const getToast = () => {
    toast({
      title: t("startup.toast.service.name.error"),
      description: t("startup.toast.service.name.message"),
      status: "error",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    ServiceRegion.getAllEcoMap().then((res) => {
      setMapList(res);
      if (serviceId && res.length > 0) {
        const selectedService = res.find((map) => map.id === serviceId);
        if (selectedService) {
          setMapName(selectedService);
        }
      }
    });
  }, [serviceId]);

  useEffect(() => {
    if (mapName) {
      getService(mapName.id);
    }
  }, [mapName]);

  return (
    <div className="body-bg">
      <SideBar items={item} />
      <div className="v-stack">
        <VStack style={{ height: "inherit" }} spacing={"16px"} align="stretch">
          <Box justifyContent="center" className="first-stack" w="100%">
            <Grid
              className="firstStack-mg"
              templateColumns="repeat(15, 1fr)"
              gap={"5px"}
            >
              <GridItem colStart={1} colEnd={2}>
                <Image
                  w="49px"
                  h="49px"
                  src={imgLocation}
                  alt="image"
                  mr="1"
                  mt="-10px"
                  align="center"
                />
              </GridItem>
              <GridItem colStart={2} colEnd={5}>
                <Select
                  value={mapName.id}
                  width="100%"
                  onChange={(e) => handleMapChange(e)}
                >
                  {mapList.map((result) => (
                    <option value={result.id}>{result.name}</option>
                  ))}
                  <option disabled="disabled">
                    {" "}
                    ------------------------------------
                  </option>
                  <option>
                    {t(
                      "startup.landing.page.header.user.profile.menu.list.map.text"
                    )}
                  </option>
                </Select>
              </GridItem>
              <GridItem colStart={5} colEnd={9}>
                <AddMapModal isHome={true} />
              </GridItem>
              <GridItem colStart={9} colEnd={11}>
                <AddServiceModal
                  sendData={(data) => {
                    if (data === true) {
                      Service.getServicesList().then((res) => {
                        setItem(res);
                      });
                    }
                  }}
                  mapId={mapName.id}
                  createNewServiceCallback={handleCreateNewService}
                />
              </GridItem>
              <GridItem colStart={11} colEnd={13}>
                <WrapItem float={"right"} display="flex">
                  <ServiceFilter
                    onClearFilter={() => {
                      handleClearFilter();
                    }}
                    onServiceCategoryValCallback={(name) => {
                      handleServiceCategoryValCallback(name);
                    }}
                    onFilterValuesCallback={handleFilterValuesCallback}
                    filterCriteria={filter}
                  />
                  <div className="divider" />
                </WrapItem>
              </GridItem>
              <GridItem colStart={14} colEnd={15}>
                <UserAccountMenu />
              </GridItem>
            </Grid>
          </Box>
          <Box className="first-stack" h="100%" w="100%">
            <ServiceMap reloadServices={(id) => getService(id)} data={item} />
          </Box>
        </VStack>
      </div>
    </div>
  );
};

export default withRouter(HomePage);
