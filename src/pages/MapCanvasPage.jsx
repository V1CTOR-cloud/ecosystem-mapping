import React, { createContext, useEffect, useState, useRef } from "react";

import {
  Box,
  Text,
  useDisclosure,
  Button,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FilterAlt } from "@styled-icons/boxicons-regular";

import SideBar from "../components/bar/sideBar/SideBar";
import NavigationBar from "../components/bar/navigationBar/NavigationBar";
import FilterBar from "../components/bar/navigationBar/filterBar/FilterBar";
import {
  audienceList,
  market,
  market_and_organization,
  organization,
} from "../helper/constant";
import BackgroundCanvas from "../components/mapCanvas/backgroundCanvas/BackgroundCanvas";
import ContentCanvas from "../components/mapCanvas/contentCanvas/ContentCanvas";
import NewServiceButton from "../components/mapCanvas/newServiceButton/NewServiceButton";
import service from "../assets/servicesFocus.json";
import ServiceForm from "../components/mapCanvas/newServiceButton/form/ServiceForm";
import { Map } from "../service/map";

export const CanvasProvider = createContext(undefined);

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
  }, // Reordering of the columns (the easiest way)
  rowsOrder: [market, market_and_organization, organization],
};

function MapCanvasPage() {
  const initialFilters = [
    {
      id: 0,
      name: "Saved Filters",
      items: [],
    },
    {
      id: 1,
      name: "Service Status",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      id: 2,
      name: "Service Owner",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      id: 3,
      name: "Service Focus",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      id: 4,
      name: "Service Location",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      id: 5,
      name: "Service Audience",
      items: [],
      isAllSelected: false,
      selectedFilterCount: 0,
    },
    {
      id: 6,
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
  const [fetchedOrganization] = useState([]);
  const [fetchedFilters, setFetchedFilters] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isFiltersActive, setIsFilterActive] = useState(false);
  const [archivedData] = useState([]);
  const [draftData] = useState([]);
  const cancelRef = useRef();
  const { mapId } = useParams();

  // Fetch all the data required to display the page with all the information need to be trigger only once.
  useEffect(() => {
    const fetchData = async () => {
      // Get the name of the

      // Get all services before displaying the page.
      let res = await Map.getMapById(mapId);
      setMapTitle(res.ecosystemMap.title);
      const sortedData = sortServices(res);
      setFetchedData(sortedData);

      // Get all savedFilters by the user
      if (res.ecosystemMap["filters"] != null) {
        setFetchedFilters(Object.entries(res.ecosystemMap["filters"]));
      }

      const tempServices = Object.values(sortedData.services);
      tempServices.forEach((thisService) => {
        services.push({
          id: thisService.id,
          name: thisService.serviceName,
        });
      });

      setIsDataLoaded(true);
    };

    //fetchData().then(() => setIsDataLoaded(true));
    fetchData();

  }, [mapId]);

  // Update the draft and archived lists at each new service or service update
  // In addition we update the sidebar
  useEffect(() => {
    if (isDataLoaded) {
      const servicesArray = Object.values(fetchedData.services);
      // Clear all the sidebar lists
      draftData.splice(0, draftData.length);
      archivedData.splice(0, archivedData.length);
      servicesArray.forEach((service) => {
        if (service.serviceStatus === "Draft") {
          draftData.push(service);
        } else if (service.serviceStatus === "Archived") {
          archivedData.push(service);
        }
      });
    }
  }, [archivedData, draftData, fetchedData, isDataLoaded]);

  // Each modification in the filters, we update our data.
  useEffect(() => {
    const bool = filters.some(
      (filter, index) =>
        filter.selectedFilterCount !== 0 && index !== 0 && !filter.isAllSelected
    );
    setIsFilterActive(bool);

    if (isDataLoaded && bool) {
      // Deep copy the data to change the isVisible property.
      const tempData = structuredClone(fetchedData);

      Object.values(tempData.services).forEach((service) => {
        const filterBool = [true, false, false, false, false, false, false];

        filters.forEach((filter, index) => {
          // Convert the name to correspond the service Data type
          const filterName = (
            filter.name.substring(0, 1).toLowerCase() + filter.name.substring(1)
          ).replaceAll(" ", "");

          // Check if we have at least 1 item selected and that isAllSelected is false to avoid going through for nothing
          if (filter.selectedFilterCount !== 0 && !filter.isAllSelected) {
            filter.items.forEach((item) => {
              // The item is selected so, we add all element corresponding to that
              if (item.value) {
                if (filter.id === 1 || filter.id === 3 || filter.id === 5) {
                  if (service[filterName]) {
                    if (
                      service[filterName].replaceAll("_", "").toLowerCase() ===
                      item.name.replaceAll(" ", "").toLowerCase()
                    ) {
                      filterBool[index] = true;
                    }
                  }
                } else if (filter.id === 2) {
                  if (service[filterName].length !== 0) {
                    if (service[filterName][0].organisationName === item.name) {
                      filterBool[index] = true;
                    }
                  }
                } else if (filter.id === 4) {
                  const serviceLocation = service[filterName];
                  const thisLocation =
                    serviceLocation.continent +
                    " " +
                    serviceLocation.country +
                    " " +
                    serviceLocation.region +
                    " " +
                    serviceLocation.city;

                  if (
                    thisLocation.toLowerCase().includes(item.name.toLowerCase())
                  ) {
                    filterBool[index] = true;
                  }
                } else if (filter.id === 6) {
                  service.serviceBudget.forEach((budget) => {
                    if (item.name !== "+10000") {
                      const filtersValues = item.name.split("-");
                      if (
                        budget.budgetValue >= parseFloat(filtersValues[0]) &&
                        budget.budgetValue <= parseFloat(filtersValues[1]) &&
                        budget.budgetValue !== 0
                      ) {
                        filterBool[index] = true;
                      }
                    } else {
                      const filterValue = item.name.substring(1);
                      if (budget.budgetValue >= parseFloat(filterValue)) {
                        filterBool[index] = true;
                      }
                    }
                  });
                }
              }
            });
          } else {
            filterBool[index] = true;
          }
        });

        // Check if the item required all filter to be visible to the canvas
        service.isVisible = filterBool.every((bool) => bool);
      });

      setFetchedData(tempData);

    } else if (isDataLoaded && !bool) {
      const tempData = structuredClone(fetchedData);

      // Reset the isVisible property to true for all services
      Object.values(tempData.services).forEach((service) => {
        service.isVisible = true;
      });

      setFetchedData(tempData);
    }

  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // We populate each filter once the data is fully loaded
  useEffect(() => {
    const tempStatus = [
      { name: "Draft", value: false },
      { name: "Published", value: false },
    ];
    const tempPrimaryFocus = [];
    const tempAudience = [];
    const tempOwner = [];
    const tempLocation = [];
    const tempFilters = [];
    const tempBudget = [
      { name: "0-9", value: false },
      { name: "10-99", value: false },
      {
        name: "100-999",
        value: false,
      },
      { name: "1000-9999", value: false },
      { name: "+10000", value: false },
    ];

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

    if (fetchedData) {
      const serviceArray = Object.values(fetchedData.services);
      serviceArray.forEach((service) => {
        if (service.serviceLocation.continent !== null) {
          let locationToAdd = service.serviceLocation.continent;

          // Check if we have already the continent that exist in the list
          const locationExist = isLocationExistInList(
            locationToAdd,
            tempLocation
          );
          if (!locationExist) {
            tempLocation.push({
              name: service.serviceLocation.continent,
              value: false,
            });
          }

          if (service.serviceLocation.country !== null) {
            locationToAdd += " " + service.serviceLocation.country;

            // Check if we have already the continent + country that exist in the list
            const locationExist = isLocationExistInList(
              locationToAdd,
              tempLocation
            );
            if (!locationExist) {
              tempLocation.push({ name: locationToAdd, value: false });
            }

            if (service.serviceLocation.region !== null) {
              locationToAdd += " " + service.serviceLocation.region;

              // Check if we have already the continent + country + region that exist in the list
              const locationExist = isLocationExistInList(
                locationToAdd,
                tempLocation
              );
              if (!locationExist) {
                tempLocation.push({ name: locationToAdd, value: false });
              }
              if (service.serviceLocation.city !== null) {
                locationToAdd += " " + service.serviceLocation.city;

                // Check if we have already the continent + country + region + city that exist in the list
                const locationExist = isLocationExistInList(
                  locationToAdd,
                  tempLocation
                );
                if (!locationExist) {
                  tempLocation.push({ name: locationToAdd, value: false });
                }
              }
            }
          }
        }
      });
    }
    // Sort alphabetically
    tempLocation.sort((a, b) => a.name.localeCompare(b.name));

    audienceList.forEach((audience) => {
      tempAudience.push({ name: audience.name, value: false });
    });

    if (fetchedFilters) {
      fetchedFilters.forEach((filters) => {
        tempFilters.push({
          name: filters[0],
          value: false,
          selectedFilters: filters[1],
        });
      });
    }

    initialFilters[0].items = tempFilters;
    initialFilters[1].items = tempStatus;
    initialFilters[2].items = tempOwner;
    initialFilters[3].items = tempPrimaryFocus;
    initialFilters[4].items = tempLocation;
    initialFilters[5].items = tempAudience;
    initialFilters[6].items = tempBudget;
    setFilters(initialFilters);
  }, [isDataLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  function isLocationExistInList(location, list) {
    const checkLocationExist = list.find(
      (thisLocation) => thisLocation.name === location
    );
    return checkLocationExist !== undefined;
  }

  function sortServices(fetchedData) {
    let sortedData = { ...data };
    sortedData.rows[market].serviceIds = [];
    sortedData.rows[market_and_organization].serviceIds = [];
    sortedData.rows[organization].serviceIds = [];

    // Sort by order
    fetchedData.services.sort((a, b) => {
      return a.serviceOrder - b.serviceOrder;
    });

    // Add each service to the data.services
    fetchedData.services.forEach((service) => {
      service.isVisible = true;
      if (service.serviceStatus === "Archived") {
        archivedData.push(service);
      } else {
        sortedData.services = { ...sortedData.services, [service.id]: service };

        if (service.serviceStatus === "Draft") {
          draftData.push(service);
        }

        switch (service.serviceApplication) {
          case market_and_organization:
            sortedData.rows.Market_and_Organization.serviceIds.push(service.id);
            break;
          case market:
            sortedData.rows.Market.serviceIds.push(service.id);
            break;
          default:
            sortedData.rows.Organization.serviceIds.push(service.id);
        }
      }
    });

    return sortedData;
  }

  function handleClearAllFilters() {
    const tempFilters = [...filters];

    tempFilters.forEach((filter) => {
      filter.isAllSelected = false;
      filter.selectedFilterCount = 0;
      filter.items.forEach((item) => (item.value = false));
    });

    setFilters(tempFilters);
  }

  // When a service is clicked, we open the form with all the field correctly filled.
  function handleServiceClick(thisService) {
    setServiceWithoutModification(thisService);
    onOpenFormEdition();
  }

  const additionalButton = (
    <Box paddingRight="1rem">
      <Button
        variant={isOpenFilter ? "outline" : "ghost"}
        icon={<FilterAlt size="20" title="Filter" />}
        onClick={isOpenFilter ? onCloseFilter : onOpenFilter}
      >
        {t("mapping.navigation.bar.filter.button")}
      </Button>
    </Box>
  );

  const primaryButton = (
    <NewServiceButton
      isOpen={isOpenForm}
      onClose={onCloseForm}
      onOpen={onOpenForm}
      organisations={fetchedOrganization}
    />
  );

  return !isDataLoaded ? (
    <Text>Loading</Text>
  ) : (
    <CanvasProvider.Provider
      value={{
        mapId: mapId,
        fetchedData: [fetchedData, setFetchedData],
        services: services,
        isFilterOpen: isOpenFilter,
      }}
    >
      <Grid bg="blackAlpha.200" gap={0} minHeight="100vh">
        <GridItem zIndex={10} position="fixed" w="100%">
          <Box w="100%" h="75px">
            <NavigationBar
              title={mapTitle}
              primaryButton={primaryButton}
              additionalButtons={additionalButton}
            />
          </Box>
          {isOpenFilter && (
            <Box w="100%">
              <FilterBar
                filtersState={[filters, setFilters]}
                handleClearAllFilters={handleClearAllFilters}
              />
            </Box>
          )}
        </GridItem>
        <GridItem
          h="100%"
          position="fixed"
          zIndex={10}
          top={isOpenFilter ? "135px" : "75px"}
        >
          <SideBar
            isFilterOpen={isOpenFilter}
            archivedData={archivedData}
            draftData={draftData}
            onOpenFormEdition={onOpenFormEdition}
            handleServiceClick={(service) => handleServiceClick(service)}
          />
        </GridItem>

        <GridItem marginLeft="75px" marginTop={isOpenFilter ? "135px" : "75px"}>
          {/* 
          <BackgroundCanvas ref={backGroundRef} />
*/}
          <Box h="100%">
            <ContentCanvas
              isFilterOpen={isOpenFilter}
              isFiltersActive={isFiltersActive}
              handleServiceClick={(service) => handleServiceClick(service)}
            />
          </Box>

        </GridItem>
      </Grid>
      {isOpenFormEdition && (
        <ServiceForm
          cancelRef={cancelRef}
          isEditing={true}
          isOpen={isOpenFormEdition}
          onClose={onCloseFormEdition}
          propOrganisations={fetchedOrganization}
          serviceWithoutModification={serviceWithoutModification}
        />
      )}
    </CanvasProvider.Provider>
  );
}

export default MapCanvasPage;
