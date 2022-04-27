import React, { useEffect, useState } from "react";

import { Box, Flex, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { withRouter } from "react-router-dom";

import SideBar from "../components/bar/sideBar/SideBar";
import NavigationBar from "../components/bar/navigationBar/NavigationBar";
import FilterBar from "../components/bar/navigationBar/filterBar/FilterBar";
import { smallPadding } from "../helper/constant";
import BackgroundCanvas from "../components/mapCanvas/backgroundCanvas/BackgroundCanvas";
import ContentCanvas from "../components/mapCanvas/contentCanvas/ContentCanvas";
import Service from "../service/EcosystemMapServices";

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
      id: "Market",
      serviceIds: [],
    },
    Market_and_Organisation: {
      id: "Market_and_Organisation",
      serviceIds: [],
    },
    Organisation: {
      id: "Organisation",
      serviceIds: [],
    },
  },
  // Reordering of the columns (the easiest way)
  rowsOrder: ["Market", "Market_and_Organisation", "Organisation"],
};

function MapCanvasPage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filters, setFilters] = useState(initialFilters);
  const [fetchedData, setFetchedData] = useState(null);

  // Get all services before displaying the page.
  useEffect(() => {
    const fetchData = async () => {
      return await Service.getMapServices(props.mapId);
    };

    fetchData()
      .then((res) => {
        // Sort the data
        const sortedData = sortServices(res);
        setFetchedData(sortedData);
      })
      .catch(console.error);
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
        case "Market_and_Organisation":
          sortedData.rows.Market_and_Organisation.serviceIds.push(service.id);
          break;
        case "Market":
          sortedData.rows.Market.serviceIds.push(service.id);
          break;
        default:
          sortedData.rows.Organisation.serviceIds.push(service.id);
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

  return !fetchedData ? (
    <Text>Loading</Text>
  ) : (
    <Flex align="start" direction="column" h="100%">
      <Box w="100%">
        <NavigationBar
          title={"Ecosystem Map Title"}
          buttonText={"New service"}
          isMapDashboard={false}
          onFilterClick={onOpen}
          onClearFilterClick={onClose}
          isOpen={isOpen}
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
      <Box w="100%" flex="max-content" bg="#aaaaaa" align="start">
        <SideBar isFilterOpen={isOpen} />
        <Box
          h="100%"
          bg="#1c5a62"
          zIndex={0}
          marginLeft="100px"
          paddingTop={smallPadding}
        >
          <BackgroundCanvas isFilterOpen={isOpen} />
          <ContentCanvas isFilterOpen={isOpen} data={fetchedData} />
        </Box>
      </Box>
    </Flex>
  );
}

HStack.defaultProps = {
  spacing: 0,
};

export default withRouter(MapCanvasPage);
