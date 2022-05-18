import React, { useEffect, useState } from "react";

import {
  Box,
  Flex,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import SideBar from "../components/bar/sideBar/SideBar";
import NavigationBar from "../components/bar/navigationBar/NavigationBar";
import FilterBar from "../components/bar/navigationBar/filterBar/FilterBar";
import {
  greyColor,
  market,
  market_and_organization,
  mediumPadding,
  organization,
  smallPadding,
} from "../helper/constant";
import BackgroundCanvas from "../components/mapCanvas/backgroundCanvas/BackgroundCanvas";
import ContentCanvas from "../components/mapCanvas/contentCanvas/ContentCanvas";
import Service from "../service/EcosystemMapServices";
import RegionService from "../service/RegionServices";
import NewServiceButton from "../components/mapCanvas/newServiceButton/NewServiceButton";
import service from "../assets/servicesFocus.json";
import ServiceForm from "../components/mapCanvas/newServiceButton/form/ServiceForm";
import { FilterAlt } from "@styled-icons/boxicons-regular";
import ButtonComponent from "../components/basic/Buttons/ButtonComponent";
import { useTranslation } from "react-i18next";

const ArrowDown = styled.div`
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-top: 7.5px solid ${greyColor};
`;

const ArrowUp = styled.div`
  border-right: 7.5px solid transparent;
  border-left: 7.5px solid transparent;
  border-bottom: 7.5px solid ${greyColor};
`;

const data = {
  services: {},
  rows: {
    Market: {
      id: market,
      serviceIds: [],
    },
    Market_and_Organization: {
      id: market_and_organization,
      serviceIds: [],
    },
    Organization: {
      id: organization,
      serviceIds: [],
    },
  },
  // Reordering of the columns (the easiest way)
  rowsOrder: [market, market_and_organization, organization],
};

function MapCanvasPage(props) {
  const initialFilters = [
    {
      name: "Saved Filters",
      items: [],
    },
    {
      name: "Status",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      name: "Owner",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      name: "Primary Focus",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      name: "Location",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      name: "Audience",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      name: "Budget",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
  ];
  const { t } = useTranslation();

  const {
    isOpen: isOpenFilter,
    onOpen: onOpenFilter,
    onClose: onCloseFilter,
  } = useDisclosure();
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();
  const {
    isOpen: isOpenFormEdition,
    onOpen: onOpenFormEdition,
    onClose: onCloseFormEdition,
  } = useDisclosure();

  const [serviceWithoutModification, setServiceWithoutModification] =
    useState(null);
  const [services] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [mapTitle, setMapTitle] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [fetchedOrganization, setFetchedOrganization] = useState(null);
  const [fetchedAudiences, setFetchedAudiences] = useState(null);
  const [fetchedLocation, setFetchedLocation] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [heights, setHeights] = useState([180, 180, 180]);
  const [containerHeight, setContainerHeight] = useState("0px");

  useEffect(() => {
    const fullHeight =
      (isOpenFilter ? 135 : 75) +
      12 * 7 +
      heights[0] +
      heights[1] +
      heights[2] +
      4;
    setContainerHeight(fullHeight);
  }, [heights, isOpenFilter]);

  // Fetch all the data required to display the page with all the information.
  useEffect(() => {
    const fetchData = async () => {
      // Get the name of the

      // Get all services before displaying the page.
      let res = await Service.getMapServicesAndMapName(props.mapId);
      setMapTitle(res.ecosystemMap["name"]);
      const sortedData = sortServices(res);
      setFetchedData(sortedData);

      // Get all organisations
      res = await Service.getAllOrganisation();
      const tempOrganizations = [];
      // Formatting our organisation to fit for the component LabeledMenu
      res.organisations.forEach((organisation) =>
        tempOrganizations.push({
          id: organisation.id,
          name: organisation.organisationName,
        })
      );
      setFetchedOrganization(tempOrganizations);

      // Get all audiences
      res = await Service.getAllAudiences();
      const tempAudiences = [];
      // Formatting our organisation to fit for the component LabeledMenu
      res.audiences.forEach((audience) =>
        tempAudiences.push({
          id: audience.id,
          name: audience.audienceName,
        })
      );
      setFetchedAudiences(tempAudiences);

      // Get all locations
      res = await RegionService.listAllRegions();
      const tempLocations = [];
      res.data.forEach((item) => {
        tempLocations.push({
          id: item.id,
          name: item.name,
        });
      });
      tempLocations.pop();
      setFetchedLocation(tempLocations);

      const tempServices = Object.values(sortedData.services);
      tempServices.forEach((thisService) => {
        services.push({
          id: thisService.id,
          name: thisService.serviceName,
        });
      });
    };

    fetchData().then(() => setIsDataLoaded(true));
  }, [props.mapId]);

  // We populate each filter once the data is fully loaded
  useEffect(() => {
    //TODO Status,Location,Budget,SavedFilter
    const tempStatus = [
      { name: "Draft", value: false },
      { name: "Published", value: false },
    ];
    const tempPrimaryFocus = [];
    const tempAudience = [];
    const tempOwner = [];
    const tempLocation = [];
    const tempBudget = [];

    if (fetchedOrganization) {
      fetchedOrganization.forEach((organization) => {
        tempOwner.push({ name: organization.name, value: false });
      });
    }

    if (service.servicesFocus) {
      service.servicesFocus.forEach((serviceFocus) => {
        tempPrimaryFocus.push({ name: serviceFocus.name, value: false });
      });
    }

    if (fetchedLocation) {
      fetchedLocation.forEach((location) => {
        tempLocation.push({ name: location.name, value: false });
      });
    }

    if (fetchedAudiences) {
      fetchedAudiences.forEach((audience) => {
        tempAudience.push({ name: audience.name, value: false });
      });
    }

    initialFilters[1].items = tempStatus;
    initialFilters[2].items = tempOwner;
    initialFilters[3].items = tempPrimaryFocus;
    initialFilters[4].items = tempLocation;
    initialFilters[5].items = tempAudience;
    setFilters(initialFilters);
  }, [isDataLoaded]);

  function sortServices(fetchedData) {
    let sortedData = data;

    // Sort by order
    fetchedData.services.sort((a, b) => {
      return a.order - b.order;
    });

    // Add each service to the data.services
    fetchedData.services.forEach((service) => {
      sortedData.services = { ...data.services, [service.id]: service };

      switch (service.applicationType) {
        case market_and_organization:
          sortedData.rows.Market_and_Organization.serviceIds.push(service.id);
          break;
        case market:
          sortedData.rows.Market.serviceIds.push(service.id);
          break;
        default:
          sortedData.rows.Organization.serviceIds.push(service.id);
      }
    });

    return sortedData;
  }

  // When a service is clicked, we open the form with all the field correctly filled.
  function handleServiceClick(thisService) {
    setServiceWithoutModification(thisService);
    onOpenFormEdition();
  }

  const additionalButton = (
    <ButtonComponent
      padding={`0 0 0 ${mediumPadding}`}
      isWithoutBorder={!isOpenFilter}
      buttonText={t("mapping.navigation.bar.filter.button")}
      icon={<FilterAlt size="20" title="Filter" />}
      onClick={isOpenFilter ? onCloseFilter : onOpenFilter}
    />
  );

  const primaryButton = (
    <NewServiceButton
      isOpen={isOpenForm}
      onClose={onCloseForm}
      onOpen={onOpenForm}
      organisations={fetchedOrganization}
      audiences={fetchedAudiences}
      fetchedData={[fetchedData, setFetchedData]}
      services={services}
      mapId={props.mapId}
    />
  );

  return !isDataLoaded ? (
    <Text>Loading</Text>
  ) : (
    <Flex align="start" direction="column" h={containerHeight}>
      <Box w="100%" zIndex={2}>
        <NavigationBar
          title={mapTitle}
          button={primaryButton}
          additionalButtons={additionalButton}
        />
      </Box>
      {isOpenFilter && (
        <Box zIndex={2} w="100%">
          <FilterBar filtersState={[filters, setFilters]} />
        </Box>
      )}
      <Box w="100%" flex="max-content" align="start" bg="#EEEEEE" zIndex={1}>
        <SideBar isFilterOpen={isOpenFilter} />
        <Box h="100%" zIndex={0} marginLeft="100px" paddingTop={smallPadding}>
          <BackgroundCanvas isFilterOpen={isOpenFilter} heights={heights} />
          <ContentCanvas
            isFilterOpen={isOpenFilter}
            data={[fetchedData, setFetchedData]}
            handleServiceClick={(service) => handleServiceClick(service)}
            heights={[heights, setHeights]}
            containerHeight={[containerHeight, setContainerHeight]}
          />
          {data.rowsOrder.map((row, index) => {
            return (
              <Box
                key={index}
                position="absolute"
                right="20px"
                top={
                  (isOpenFilter ? 135 : 75) +
                  12 * 2 +
                  (index === 0
                    ? 0
                    : index === 1
                    ? heights[0]
                    : heights[0] + heights[1]) +
                  +index * 24 +
                  "px"
                }
                w="50px"
                h={heights[index]}
                textAlign="center"
              >
                <HStack position="relative" w="100%" h="100%">
                  <VStack
                    bg={greyColor}
                    w="2px"
                    h="100%"
                    justify="space-between"
                  >
                    <ArrowDown />
                    <ArrowUp />
                  </VStack>
                  <Text
                    marginLeft={smallPadding}
                    color={greyColor}
                    style={{ writingMode: "vertical-lr" }}
                  >
                    {row.replaceAll("_", " ").replace("and", "&")}
                  </Text>
                </HStack>
              </Box>
            );
          })}
        </Box>
      </Box>
      {isOpenFormEdition && (
        <ServiceForm
          isEditing={true}
          isOpen={isOpenFormEdition}
          onClose={onCloseFormEdition}
          organisations={fetchedOrganization}
          audiences={fetchedAudiences}
          fetchedData={[fetchedData, setFetchedData]}
          services={services}
          mapId={props.mapId}
          serviceWithoutModification={serviceWithoutModification}
        />
      )}
    </Flex>
  );
}

HStack.defaultProps = {
  spacing: 0,
};

export default withRouter(MapCanvasPage);
