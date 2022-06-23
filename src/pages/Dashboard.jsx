import React, { useEffect, useState } from "react";

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

import NavigationBar from "../components/bar/navigationBar/NavigationBar";
import MapForm from "../components/dashboard/form/MapForm";
import { Map as MapClass } from "../service/map";
import MapAccordion from "../components/dashboard/mapAccordion/MapAccordion";
import GridMap from "../components/dashboard/mapView/GridMap";
import ListMap from "../components/dashboard/mapView/ListMap";
import ToastComponent from "../components/basic/ToastComponent";

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
  const [accordionsItems, setAccordionsItems] = useState([
    {
      title: "My maps",
      content: [],
    },
    {
      title: "Shared with me",
      content: [],
    },
    {
      title: "Archived",
      content: [],
    },
  ]);

  const primaryButton = (
    <Button onClick={onOpenModal} leftIcon={<AddIcon />}>
      New Ecosystem Map
    </Button>
  );

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
          const tempUserMaps = [...userMaps];

          tempUserMaps.push(value.createEcosystemMap);
          setUserMaps(tempUserMaps);
          handleToggleView(tempUserMaps, true);

          onCloseModal();
          ToastComponent("New map created.", "success");
        }
      })
      .catch(() =>
        ToastComponent("An error occurred, please try again.", "error")
      );
  }

  console.log(userMaps);

  const additionalButtons = (
    <HStack>
      {/*Button View*/}
      {!isGrid && (
        <Button
          variant="blackGhost"
          marginRight="1rem"
          leftIcon={<GridIcon size="20" />}
          onClick={() => handleToggleView(userMaps, true)}
        >
          {t("mapping.navigation.bar.view.button")}
        </Button>
      )}
      {isGrid && (
        <Button
          variant="blackGhost"
          marginRight="1rem"
          leftIcon={<HamburgerIcon w={5} h={5} />}
          onClick={() => handleToggleView(userMaps, false)}
        >
          List view
        </Button>
      )}
      {/*Button sort*/}
      <Box paddingRight="1rem">
        <Button
          variant="blackGhost"
          leftIcon={
            <SortDownAlt
              size="20"
              title={t("mapping.navigation.bar.sort.button")}
            />
          }
          onClick={() => {}}
        >
          {t("mapping.navigation.bar.sort.button")}
        </Button>
      </Box>
      {/*Button search*/}
      {!isOpenSearch && (
        <Box paddingRight="1rem">
          <IconButton
            variant="ghost"
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
          <InputLeftElement cursor="pointer" onClick={() => {}}>
            <SearchIcon color={isOpenSearch ? "brand.500" : "blackAlpha.700"} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={t("mapping.navigation.bar.search.placeholder")}
            border={0.5}
            borderColor={"brand.500"}
            _hover={{ borderColor: "brand.500" }}
          />
          <InputRightElement cursor="pointer" onClick={onCloseSearch}>
            <CloseIcon color={"blackAlpha.700"} />
          </InputRightElement>
        </InputGroup>
      )}
    </HStack>
  );

  return (
    <Box w="100vw" h="100vh">
      <NavigationBar
        title={"Map Dashboard"}
        primaryButton={primaryButton}
        additionalButtons={additionalButtons}
      />
      <MapForm
        isOpen={isOpenModal}
        onClose={onCloseModal}
        onCreateMap={handleCreateMap}
      />
      <Box paddingY={3}>
        <MapAccordion isGrid={isGrid} accordionItems={accordionsItems} />
      </Box>
    </Box>
  );
}

export default Dashboard;
