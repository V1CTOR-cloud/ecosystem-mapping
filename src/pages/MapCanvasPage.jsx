import React, { useEffect, useState } from "react";

import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import SideBar from "../components/bar/sideBar/SideBar";
import NavigationBar from "../components/bar/navigationBar/NavigationBar";
import FilterBar from "../components/bar/navigationBar/filterBar/FilterBar";
import {
  greyColor,
  market,
  market_and_organization,
  organization,
  smallPadding,
  verySmallPadding,
} from "../helper/constant";
import BackgroundCanvas from "../components/mapCanvas/backgroundCanvas/BackgroundCanvas";
import ContentCanvas from "../components/mapCanvas/contentCanvas/ContentCanvas";
import Service from "../service/EcosystemMapServices";
import NewServiceButton from "../components/mapCanvas/newServiceButton/NewServiceButton";

const ArrowDown = styled.div`
  border-bottom: 7.5px solid transparent;
  border-top: 7.5px solid transparent;
  border-left: 7.5px solid ${greyColor};
`;

const ArrowUp = styled.div`
  border-bottom: 7.5px solid transparent;
  border-top: 7.5px solid transparent;
  border-right: 7.5px solid ${greyColor};
`;

const items1 = [
  {
    name: "item 1",
    value: false,
  },
  {
    name: "item 2",
    value: false,
  },
  {
    name: "item 3",
    value: false,
  },
];
const items2 = [
  {
    name: "item 1",
    value: false,
  },
  {
    name: "item 2",
    value: false,
  },
];

const initialFilters = [
  {
    name: "Saved Filters",
    items: [],
  },
  {
    name: "Status",
    items: items1,
    isAllSelected: false,
  },
  {
    name: "Owner",
    items: items2,
    isAllSelected: false,
  },
  {
    name: "Primary Focus",
    items: [],
    isAllSelected: false,
  },
  {
    name: "Location",
    items: [],
    isAllSelected: false,
  },
  {
    name: "Audience",
    items: [],
    isAllSelected: false,
  },
  {
    name: "Budget",
    items: [],
    isAllSelected: false,
  },
];

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState(initialFilters);
  const [fetchedData, setFetchedData] = useState(null);
  const [fetchedOrganization, setFetchedOrganization] = useState(null);
  const [fetchedAudiences, setFetchedAudiences] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Fetch all the data required to display the page with all the information.
  useEffect(() => {
    const fetchData = async () => {
      //  Get all services before displaying the page.
      let res = await Service.getMapServices(props.mapId);
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
    };

    fetchData().then(() => setIsDataLoaded(true));
  }, [props.mapId]);

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

  function handleAllClick(thisFilter) {
    //TODO
    const indexFilter = filters.indexOf(thisFilter);
    let tempFilter = filters;

    tempFilter[indexFilter].isAllSelected =
      !tempFilter[indexFilter].isAllSelected;
    if (tempFilter[indexFilter].isAllSelected) {
      tempFilter[indexFilter].items.forEach((item) => (item.value = true));
    }

    setFilters(tempFilter);
  }

  function handleNoneClick() {
    //TODO
  }

  function handleSave() {
    //TODO
  }

  function handleItemClick(thisFilter, item) {
    const indexFilter = filters.indexOf(thisFilter);
    const indexItem = filters[indexFilter].items.indexOf(item);

    let tempFilter = filters;
    tempFilter[indexFilter].items[indexItem].value =
      !tempFilter[indexFilter].items[indexItem].value;

    setFilters(tempFilter);
  }

  function handleServiceClick() {
    console.log("clicked service");
  }

  return !isDataLoaded ? (
    <Text>Loading</Text>
  ) : (
    <Flex align="start" direction="column" h="100%">
      <Box w="100%">
        <NavigationBar
          title={"Ecosystem Map Title"}
          isMapDashboard={false}
          onFilterClick={onOpen}
          onClearFilterClick={onClose}
          button={
            <NewServiceButton
              organisations={fetchedOrganization}
              audiences={fetchedAudiences}
              fetchedData={fetchedData}
              mapId={props.mapId}
            />
          }
        />
      </Box>

      {isOpen && (
        <FilterBar
          filters={filters}
          isButtonActive={false}
          handleAllClick={handleAllClick}
          handleNoneClick={handleNoneClick}
          handleItemClick={handleItemClick}
          handleSave={handleSave}
        />
      )}
      <Box w="100%" flex="max-content" bg="#EEEEEE" align="start">
        <SideBar isFilterOpen={isOpen} />
        <Box h="100%" zIndex={0} marginLeft="100px" paddingTop={smallPadding}>
          <BackgroundCanvas isFilterOpen={isOpen} />
          <ContentCanvas
            isFilterOpen={isOpen}
            data={fetchedData}
            handleServiceClick={handleServiceClick}
          />
          {data.rowsOrder.map((row, index) => {
            return (
              <Box
                key={index}
                position="absolute"
                right="-40px"
                top={164 * (index + 1) + 40 * index + "px"}
                transform="rotate(90deg)"
                //TODO change the size dynamically
                w="180px"
                h="50px"
                textAlign="center"
              >
                <Text color={greyColor}>
                  {row.replaceAll("_", " ").replace("and", "&")}
                </Text>
                <HStack
                  marginTop={verySmallPadding}
                  bg={greyColor}
                  w="100%"
                  h="2px"
                  justify="space-between"
                >
                  <ArrowDown />
                  <ArrowUp />
                </HStack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Flex>
  );
}

HStack.defaultProps = {
  spacing: 0,
};

export default withRouter(MapCanvasPage);
