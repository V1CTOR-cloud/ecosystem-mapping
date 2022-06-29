import React, { createContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  IconButton,
  HStack,
  useDisclosure,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import { Grid as GridIcon } from "@styled-icons/bootstrap";
import {
  AddIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { SortDownAlt } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";

import NavigationBar from "../components/bar/navigationBar/NavigationBar";
import MapForm from "../components/dashboard/form/MapForm";
import { Map as MapClass } from "../service/map";
import MapAccordion from "../components/dashboard/mapAccordion/MapAccordion";
import GridMap from "../components/dashboard/mapView/GridMap";
import ListMap from "../components/dashboard/mapView/ListMap";
import ToastComponent from "../components/basic/ToastComponent";
import { Authentication } from "../service/authentication";

export const DashboardProvider = createContext({});

function Dashboard() {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const {
    isOpen: isOpenSearch,
    onOpen: onOpenSearch,
    onClose: onCloseSearch,
  } = useDisclosure();
  const { t } = useTranslation();
  const [isGrid, setIsGrid] = useState(true);
  const [userMaps, setUserMaps] = useState([]);
  const [secondaryUserMaps, setSecondaryUserMaps] = useState([]);
  const [edition, setEdition] = useState({
    isEdition: false,
    initialFormValues: {},
  });
  const [accordionsItems, setAccordionsItems] = useState([
    {
      title: t("mapping.dashboard.content.accordion.my.maps"),
      content: [],
    },
    {
      title: t("mapping.dashboard.content.accordion.shared.maps"),
      content: [],
    },
    {
      title: t("mapping.dashboard.content.accordion.archived.maps"),
      content: [],
    },
  ]);
  const providerData = {
    archiveFunction: (mapData) => handleArchiveMap(mapData),
    duplicateFunction: (mapData) => handleDuplicateMap(mapData),
    editFunction: (mapData) => handleEditMap(mapData),
    restoreFunction: (mapData) => handleRestoreMap(mapData),
    deleteFunction: (mapData) => handleDeleteMap(mapData),
  };

  // Initial load where we are getting the user maps
  useEffect(() => {
    const userMapsPromise = new Promise((resolve, reject) => {
      MapClass.getAllUserMaps()
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    userMapsPromise.then((value) => {
      handleToggleView(value, true);
      setUserMaps(value);
      setSecondaryUserMaps(value);
    });
  }, []);

  // Function that switch between the list and grid view.
  function handleToggleView(list, isGrid) {
    const tempAccordionItems = [...accordionsItems];
    tempAccordionItems.forEach((accordionItem) => (accordionItem.content = []));

    list.forEach((map) => {
      const viewMap = isGrid ? (
        <GridMap key={map.id} data={map} />
      ) : (
        <ListMap key={map.id} data={map} />
      );

      if (map.mapStatus === "Archived") {
        tempAccordionItems[2].content.push(viewMap);
      } else {
        tempAccordionItems[0].content.push(viewMap);
      }
    });

    setAccordionsItems(tempAccordionItems);
    setIsGrid(isGrid);
  }

  // Function that allow the user to duplicate an existing map.
  function handleDuplicateMap(mapData) {
    const locations = [];
    const industries = [];

    mapData.location.forEach((location) => {
      locations.push({
        continent: location.continent,
        country: location.country,
        region: location.region,
        city: location.city,
      });
    });

    mapData.industry.forEach((industry) => {
      industries.push({
        mainIndustry: industry.mainIndustry,
        subIndustry: industry.subIndustry,
      });
    });

    const formattedData = {
      title: mapData.title,
      mapStatus: mapData.mapStatus,
      description: mapData.description,
      owner: {
        connect: {
          id: Authentication.getCurrentUser().id,
        },
      },
      creation: moment(),
      lastModification: moment(),
      industry: {
        create: industries,
      },
      location: {
        create: locations,
      },
    };

    handleCreateMap(formattedData);
  }

  // Function that allow the user to put a published map into the archived accordion.
  // It also updates the database and setState the view.
  function handleArchiveMap(mapData) {
    mapData.mapStatus = "Archived";

    const data = {
      id: mapData.id,
      mapStatus: mapData.mapStatus,
    };

    changeMapStatus(data);
  }

  // Function that trigger to open the modal with the value of the selected map.
  function handleEditMap(mapData) {
    setEdition({
      isEdition: true,
      initialFormValues: mapData,
    });
    onOpenModal();
  }

  // Function that switch a map from archive to published.
  function handleRestoreMap(mapData) {
    mapData.mapStatus = "Published";

    const data = {
      id: mapData.id,
      mapStatus: mapData.mapStatus,
    };

    changeMapStatus(data);
  }

  // Function that delete a map from the database.
  function handleDeleteMap(mapData) {
    const deleteMapPromise = new Promise((resolve, reject) => {
      MapClass.deleteMap(mapData.id)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    deleteMapPromise
      .then((value) => {
        // Check if we have don't have errors
        if (value.deleteEcosystemMap) {
          let tempUserMaps = [...secondaryUserMaps];

          // Get the index to remove the correct object in the array
          let index = tempUserMaps.findIndex(
            (userMap) => userMap.id === mapData.id
          );
          tempUserMaps.splice(index, 1);
          setSecondaryUserMaps(tempUserMaps);
          handleToggleView(tempUserMaps, isGrid);

          // Do the same for the userMaps
          tempUserMaps = [...userMaps];
          // Get the index to remove the correct object in the array
          index = tempUserMaps.findIndex(
            (userMap) => userMap.id === mapData.id
          );
          tempUserMaps.splice(index, 1);
          setUserMaps(tempUserMaps);

          onCloseModal();
          ToastComponent(t("mapping.dashboard.toast.map.deleted"), "success");
        }
      })
      .catch(() => ToastComponent(t("mapping.dashboard.toast.error"), "error"));
  }

  // Function that handle the creation of the map with the handling or potential errors.
  function handleCreateMap(formattedData) {
    const createMapPromise = new Promise((resolve, reject) => {
      MapClass.createMap(formattedData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    createMapPromise
      .then((value) => {
        // Check if we have don't have errors
        if (value.createEcosystemMap) {
          const tempUserMaps = [...secondaryUserMaps];

          tempUserMaps.push(value.createEcosystemMap);
          setUserMaps((previousState) => {
            previousState.push(value.createEcosystemMap);
            return previousState;
          });
          setSecondaryUserMaps(tempUserMaps);
          handleToggleView(tempUserMaps, isGrid);

          onCloseModal();
          ToastComponent(t("mapping.dashboard.toast.map.created"), "success");
        }
      })
      .catch(() => ToastComponent(t("mapping.dashboard.toast.error"), "error"));
  }

  // Function that handle the edition of the map with the handling or potential errors.
  function handleEdit(formattedData) {
    const updateMapPromise = new Promise((resolve, reject) => {
      MapClass.updateMap(formattedData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    updateMapPromise
      .then((value) => {
        // Check if we have don't have errors
        if (value.updateEcosystemMap) {
          let tempUserMaps = [...secondaryUserMaps];

          // Get the index to remove the correct object in the array
          let index = tempUserMaps.findIndex(
            (userMap) => userMap.id === formattedData.id
          );
          tempUserMaps.splice(index, 1);

          tempUserMaps.push(value.updateEcosystemMap);
          setSecondaryUserMaps(tempUserMaps);
          handleToggleView(tempUserMaps, isGrid);

          // Do the same for the userMaps
          tempUserMaps = [...userMaps];
          index = tempUserMaps.findIndex(
            (userMap) => userMap.id === formattedData.id
          );
          tempUserMaps.splice(index, 1);
          tempUserMaps.push(value.updateEcosystemMap);
          setUserMaps(tempUserMaps);

          onCloseModal();
          ToastComponent(t("mapping.dashboard.toast.map.updated"), "success");
        }
      })
      .catch(() => ToastComponent(t("mapping.dashboard.toast.error"), "error"));
  }

  // Function that either change the map status as archived or published. Then, update the list to see the modifications.
  function changeMapStatus(data) {
    const changeMapStatusPromise = new Promise((resolve, reject) => {
      MapClass.changeMapStatus(data)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });

    changeMapStatusPromise
      .then(() => {
        let tempUserMaps = [...secondaryUserMaps];

        let index = tempUserMaps.findIndex((map) => map.id === data.id);
        tempUserMaps[index].mapStatus = data.mapStatus;

        handleToggleView(tempUserMaps, isGrid);
        setSecondaryUserMaps(tempUserMaps);

        // Do the same for the userMaps
        tempUserMaps = [...userMaps];
        index = tempUserMaps.findIndex((map) => map.id === data.id);
        tempUserMaps[index].mapStatus = data.mapStatus;
        setUserMaps(tempUserMaps);

        ToastComponent(t("mapping.dashboard.toast.map.updated"), "success");
      })
      .catch(() => {
        ToastComponent(t("mapping.dashboard.toast.error"), "error");
      });
  }

  // Function to sort depending on the choice of the user: alphabetically, last modification or last created,
  // it will then setState the page to update the view.
  function handleSorting(sortBy) {
    if (sortBy === "Alphabetical") {
      secondaryUserMaps.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "Modification") {
      secondaryUserMaps
        .sort(
          (a, b) =>
            moment(a.lastModification, "YYYY-MM-DD") -
            moment(b.lastModification, "YYYY-MM-DD")
        )
        .reverse();
    } else {
      secondaryUserMaps
        .sort(
          (a, b) =>
            moment(a.creation, "YYYY-MM-DD") - moment(b.creation, "YYYY-MM-DD")
        )
        .reverse();
    }
    handleToggleView(secondaryUserMaps, isGrid);
  }

  function handleSearchMap(mapTitle) {
    const resultMaps = userMaps.filter((map) => map.title.includes(mapTitle));

    setSecondaryUserMaps(resultMaps);
    handleToggleView(resultMaps, isGrid);
  }

  function handleCloseSearch() {
    onCloseSearch();
    setSecondaryUserMaps(userMaps);
    handleToggleView(userMaps, isGrid);
  }

  const primaryButton = (
    <Button
      onClick={() => {
        setEdition({ isEdition: false, initialFormValues: {} });
        onOpenModal();
      }}
      leftIcon={<AddIcon />}
    >
      {t("mapping.navigation.bar.new.map.button")}
    </Button>
  );

  const additionalButtons = (
    <HStack>
      {/*Button View*/}
      {!isGrid && (
        <Button
          variant="blackGhost"
          marginRight="1rem"
          leftIcon={<GridIcon size="20" />}
          onClick={() => handleToggleView(secondaryUserMaps, true)}
        >
          {t("mapping.navigation.bar.view.grid.button")}
        </Button>
      )}
      {isGrid && (
        <Button
          variant="blackGhost"
          marginRight="1rem"
          leftIcon={<HamburgerIcon w={5} h={5} />}
          onClick={() => handleToggleView(secondaryUserMaps, false)}
        >
          {t("mapping.navigation.bar.view.list.button")}
        </Button>
      )}
      {/*Button sort*/}
      <Box paddingRight="1rem">
        <Menu>
          <MenuButton
            as={Button}
            variant="blackGhost"
            leftIcon={
              <SortDownAlt
                size="20"
                title={t("mapping.navigation.bar.sort.button")}
              />
            }
          >
            {t("mapping.navigation.bar.sort.button")}
          </MenuButton>
          <MenuList>
            <MenuItem
              fontSize="sm"
              onClick={() => handleSorting("Modification")}
            >
              {t("mapping.navigation.bar.sort.last.modification")}
            </MenuItem>
            <MenuItem fontSize="sm" onClick={() => handleSorting("Creation")}>
              {t("mapping.navigation.bar.sort.last.created")}
            </MenuItem>
            <MenuItem
              fontSize="sm"
              onClick={() => handleSorting("Alphabetical")}
            >
              {t("mapping.navigation.bar.sort.alphabetically")}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      {/*Button search*/}
      {!isOpenSearch && (
        <Box paddingRight="1rem">
          <IconButton
            variant="greyGhost"
            marginRight="1rem"
            icon={
              <SearchIcon
                color={isOpenSearch ? "brand.500" : "blackAlpha.700"}
                w="15px"
                h="15px"
              />
            }
            onClick={onOpenSearch}
            aria-label={t("mapping.navigation.bar.search.aria.label")}
          />
        </Box>
      )}
      {isOpenSearch && (
        <InputGroup w="200px">
          <InputLeftElement>
            <SearchIcon color={isOpenSearch ? "brand.500" : "blackAlpha.700"} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={t("mapping.navigation.bar.search.placeholder")}
            border={0.5}
            borderColor={"brand.500"}
            _hover={{ borderColor: "brand.500" }}
            onChange={(e) => handleSearchMap(e.target.value)}
          />
          <InputRightElement cursor="pointer" onClick={handleCloseSearch}>
            <CloseIcon color={"blackAlpha.700"} />
          </InputRightElement>
        </InputGroup>
      )}
    </HStack>
  );

  return (
    <DashboardProvider.Provider value={providerData}>
      <Box w="100vw" h="100vh">
        <NavigationBar
          title={t("mapping.navigation.bar.map.dashboard.title")}
          primaryButton={primaryButton}
          additionalButtons={additionalButtons}
        />
        <MapForm
          isOpen={isOpenModal}
          onClose={onCloseModal}
          isEdition={edition.isEdition}
          initialFormValues={edition.initialFormValues}
          onCreateMap={handleCreateMap}
          onEditMap={handleEdit}
        />
        <Box paddingY={3}>
          <MapAccordion isGrid={isGrid} accordionItems={accordionsItems} />
        </Box>
      </Box>
    </DashboardProvider.Provider>
  );
}

export default Dashboard;
