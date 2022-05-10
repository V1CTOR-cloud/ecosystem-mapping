import React, { createContext, useEffect, useReducer, useState } from "react";

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
import service from "../assets/servicesFocus.json";
import {
  replaceNumberToPhase,
  replacePhaseToNumber,
} from "../service/phaseConverter";
import toastComponent from "../components/basic/ToastComponent";
import ServiceForm from "../components/mapCanvas/newServiceButton/form/ServiceForm";
import Services from "../service/EcosystemMapServices";
import { useTranslation } from "react-i18next";

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

// Creation of a context to be able to pass argument through the context not the props.
export const MapContext = createContext(null);

function MapCanvasPage(props) {
  const applicationTypeButtons = [
    market,
    market_and_organization,
    organization,
  ];
  const { t } = useTranslation();
  const initialsValues = {
    serviceName: "",
    description: "",
    outcomes: "",
    serviceFocus: service.servicesFocus[0],
    ownerOrganisation: "",
    applicationType: applicationTypeButtons[0],
    serviceStartTime: new Date(),
    serviceEndTime: new Date(),
    link: "",
    audience: "",
    precededService: t("mapping.canvas.form.service.select.service"),
    followedService: t("mapping.canvas.form.service.select.service"),
    location: "",
    budgets: [{ name: "", value: "" }],
    phase: [-1.0, 1.0],
  };
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
  const [isError, setIsError] = useState(false);
  const [formValues, setFormValues] = useReducer(formReducer, initialsValues);
  const [serviceWithoutModification, setServiceWithoutModification] =
    useState(null);
  const [services] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [mapTitle, setMapTitle] = useState("");
  const [fetchedData, setFetchedData] = useState(null);
  const [fetchedOrganization, setFetchedOrganization] = useState(null);
  const [fetchedAudiences, setFetchedAudiences] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      handleFormChange(
        tempOrganizations[0].name,
        "serviceFocus",
        "classicOnChange"
      );

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
      handleFormChange(tempAudiences[0].name, "audience", "classicOnChange");

      const tempServices = Object.values(sortedData.services);
      tempServices.forEach((thisService) => {
        services.push({
          id: thisService.id,
          name: thisService.serviceName,
        });
      });
      if (services.length >= 2) {
        handleFormChange(
          tempServices[0].name,
          "precededService",
          "classicOnChange"
        );
        handleFormChange(
          tempServices[1].name,
          "followedService",
          "classicOnChange"
        );
      }
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

  // Each time we are opening the form, we reset the data.
  function setFields(thisService) {
    setIsError(false);
    handleFormChange(
      thisService ? thisService.serviceName : "",
      "serviceName",
      "serviceNameChange"
    );
    handleFormChange(
      thisService
        ? service.servicesFocus.find((result) => {
            return result.name.split(" ").join("") === thisService.serviceFocus;
          })
        : service.servicesFocus[0],
      "serviceFocus",
      "classicOnChange"
    );
    handleFormChange(
      thisService
        ? thisService.serviceOwner[0].organisationName
        : fetchedOrganization[0].name,
      "ownerOrganisation",
      "classicOnChange"
    );
    handleFormChange(
      thisService ? thisService.applicationType : applicationTypeButtons[0],
      "applicationType",
      "classicOnChange"
    );
    handleFormChange(
      thisService ? thisService.serviceStartTime : new Date(),
      "serviceStartTime",
      "classicOnChange"
    );
    handleFormChange(
      thisService ? thisService.serviceEndTime : new Date(),
      "serviceEndTime",
      "classicOnChange"
    );
    handleFormChange(
      thisService ? thisService.link : "",
      "link",
      "classicOnChange"
    );
    handleFormChange(
      thisService ? thisService.location : "",
      "location",
      "classicOnChange"
    );
    handleFormChange(
      thisService ? thisService.description : "",
      "description",
      "classicOnChange"
    );
    handleFormChange(
      thisService ? thisService.outcomes : "",
      "outcomes",
      "classicOnChange"
    );
    handleFormChange(
      thisService
        ? thisService.budgets
          ? thisService.budgets
          : [{ name: "", value: "" }]
        : [{ name: "", value: "" }],
      "budgets",
      "classicOnChange"
    );
    handleFormChange(
      thisService
        ? thisService.serviceAudience.split("_").join(" ")
        : fetchedAudiences[0].name
    );
    handleFormChange(
      thisService
        ? [
            replacePhaseToNumber(thisService.fromPhase),
            replacePhaseToNumber(thisService.toPhase),
          ]
        : [-1, 1],
      "phase",
      "classicOnChange"
    );
    if (services.length >= 2) {
      if (thisService) {
        if (thisService.previousService !== "") {
          const serviceFound = services.find(
            (service) => service.name === thisService.previousService
          );
          handleFormChange(
            serviceFound !== undefined
              ? serviceFound.name
              : t("mapping.canvas.form.service.select.service"),
            "precededService",
            "classicOnChange"
          );
        } else {
          handleFormChange(
            t("mapping.canvas.form.service.select.service"),
            "precededService",
            "classicOnChange"
          );
        }

        if (thisService.followingService !== "") {
          const serviceFound = services.find(
            (service) => service.name === thisService.followingService
          );
          handleFormChange(
            serviceFound !== undefined
              ? serviceFound.name
              : t("mapping.canvas.form.service.select.service"),
            "followedService",
            "classicOnChange"
          );
        } else {
          handleFormChange(
            t("mapping.canvas.form.service.select.service"),
            "followedService",
            "classicOnChange"
          );
        }
      } else {
        handleFormChange(
          t("mapping.canvas.form.service.select.service"),
          "precededService",
          "classicOnChange"
        );
        handleFormChange(
          t("mapping.canvas.form.service.select.service"),
          "followedService",
          "classicOnChange"
        );
      }
    }
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

  function handleServiceClick(service) {
    setServiceWithoutModification(service);
    setIsEditing(true);
    setFields(service);
    onOpenForm();
  }

  function handleIsEditingChange(value, setValue) {
    setValue(value);
  }

  async function handleDraftOrPublishClick(serviceStatus) {
    const organisationId = fetchedOrganization.find(
      (organisation) => formValues["ownerOrganisation"] === organisation.name
    ).id;

    const fromPhase = replaceNumberToPhase(formValues["phase"][0]);
    const toPhase = replaceNumberToPhase(formValues["phase"][1]);

    const order =
      fetchedData.rows[formValues["applicationType"]].serviceIds.length;

    const data = {
      serviceName: formValues["serviceName"],
      serviceFocus: formValues["serviceFocus"].name.replaceAll(" ", ""),
      organisationId: organisationId,
      applicationType: formValues["applicationType"]
        .replaceAll(" ", "_")
        .replace("&", "and"),
      serviceStartTime: formValues["serviceStartTime"],
      serviceEndTime: formValues["serviceEndTime"],
      link: formValues["link"],
      location: formValues["location"],
      audience: formValues["audience"].split(" ").join("_"),
      description: formValues["description"],
      outcomes: formValues["outcomes"],
      precededService:
        formValues["precededService"] === "Select a service"
          ? ""
          : formValues["precededService"],
      followedService:
        formValues["followedService"] === "Select a service"
          ? ""
          : formValues["followedService"],
      fromPhase: fromPhase,
      toPhase: toPhase,

      mapId: props.mapId,
      serviceStatus: serviceStatus,
      order: order,
    };

    await createNewService(data);
  }

  async function handleUpdateClick(serviceStatus) {
    const organisationId = fetchedOrganization.find(
      (organisation) => formValues["ownerOrganisation"] === organisation.name
    ).id;

    const organisationIdWithoutModification = fetchedOrganization.find(
      (organisation) =>
        serviceWithoutModification.serviceOwner[0].organisationName ===
        organisation.name
    ).id;

    const fromPhase = replaceNumberToPhase(formValues["phase"][0]);
    const toPhase = replaceNumberToPhase(formValues["phase"][1]);

    let order;

    // Check if we change of application type (row) if that is the case push the service at the last index, otherwise we are keeping the same.
    if (
      serviceWithoutModification.applicationType ===
      formValues["applicationType"].replaceAll(" ", "_").replace("&", "and")
    ) {
      order = serviceWithoutModification.order;
    } else {
      order = fetchedData.rows[formValues["applicationType"]].serviceIds.length;
    }

    const data = {
      id: serviceWithoutModification.id,
      serviceWithoutModification: serviceWithoutModification,
      organisationIdWithoutModification: organisationIdWithoutModification,
      serviceName: formValues["serviceName"],
      serviceFocus: formValues["serviceFocus"].name.replaceAll(" ", ""),
      organisationId: organisationId,
      applicationType: formValues["applicationType"]
        .replaceAll(" ", "_")
        .replace("&", "and"),
      serviceStartTime: formValues["serviceStartTime"],
      serviceEndTime: formValues["serviceEndTime"],
      link: formValues["link"],
      location: formValues["location"],
      audience: formValues["audience"].split(" ").join("_"),
      description: formValues["description"],
      outcomes: formValues["outcomes"],
      precededService:
        formValues["precededService"] ===
        t("mapping.canvas.form.service.select.service")
          ? ""
          : formValues["precededService"],
      followedService:
        formValues["followedService"] ===
        t("mapping.canvas.form.service.select.service")
          ? ""
          : formValues["followedService"],
      fromPhase: fromPhase,
      toPhase: toPhase,

      mapId: props.mapId,
      serviceStatus: serviceStatus,
      order: order,
    };

    await updateService(data);
  }

  function handleOpenForm() {
    setFields();
    onOpenForm();
  }

  async function createNewService(data) {
    if (formValues["serviceName"] === "") {
      setIsError(true);
    } else {
      const res = await Service.createService(data);
      // Check if we created the service
      if (res.createService) {
        onCloseForm();

        const newData = addServiceToData(res);

        setFetchedData(newData);
      } else {
        toastComponent(res, "error", 5000);
      }
    }
  }

  async function updateService(data) {
    if (formValues["serviceName"] === "") {
      setIsError(true);
    } else {
      const res = await Service.updateService(data);
      console.log(res);
      // Check if we update the service
      if (res.updateService) {
        const newData = await updateServiceToData(res.updateService);
        setFetchedData(newData);
        setIsEditing(false);
        onCloseForm();
      } else {
        toastComponent(res, "error", 5000);
      }
    }
  }

  function addServiceToData(res) {
    // Format the list of services to correspond to the model of fetchedData
    const tempServices = Object.assign(fetchedData.services, {
      [res.createService.id]: {
        ...res.createService,
      },
    });

    // Add the service id to the corresponding row
    const tempRows = fetchedData.rows;
    tempRows[res.createService.applicationType].serviceIds.push(
      res.createService.id
    );

    services.push({
      id: res.createService.id,
      name: res.serviceName,
    });

    // Create new object to setState the fetchedData
    return {
      rowsOrder: fetchedData.rowsOrder,
      services: tempServices,
      rows: tempRows,
    };
  }

  async function updateServiceToData(updateService) {
    // Format the list of services to correspond to the model of fetchedData
    const tempServices = Object.assign(fetchedData.services, {
      [updateService.id]: {
        ...updateService,
      },
    });

    // Add the service id to the corresponding row
    const tempRows = fetchedData.rows;
    if (
      serviceWithoutModification.applicationType ===
      updateService.applicationType
    ) {
      // Remove the element in the same row to put it the updated version.
      tempRows[updateService.applicationType].serviceIds.splice(
        serviceWithoutModification.order,
        1,
        updateService.id
      );
    } else {
      // Remove the element in the original row.
      tempRows[serviceWithoutModification.applicationType].serviceIds.splice(
        serviceWithoutModification.order,
        1
      );
      // Add it at the last index of the new row.
      tempRows[updateService.applicationType].serviceIds.push(updateService.id);

      // Update all the others services because their order have changed
      const values = Object.values(tempServices);
      let error;
      for (const service of values) {
        if (
          service.applicationType ===
            serviceWithoutModification.applicationType &&
          service.order > serviceWithoutModification.order
        ) {
          service.order -= 1;
          const data = {
            order: service.order,
            applicationType: service.applicationType,
          };

          Services.updateServiceOrderAndApplicationType(
            service.id,
            data
            // eslint-disable-next-line no-loop-func
          ).catch((e) => (error = e));

          //Stop the loop if we have an error
          if (error) {
            toastComponent(
              t("mapping.canvas.error.service.order.modification"),
              "error"
            );
            break;
          }
        }
      }
    }

    console.log(tempRows);

    // Create new object to setState the fetchedData
    return {
      rowsOrder: fetchedData.rowsOrder,
      services: tempServices,
      rows: tempRows,
    };
  }

  function formReducer(state, action) {
    switch (action.type) {
      case "classicOnChange":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "serviceNameChange":
        setIsError(action.value === "");
        return {
          ...state,
          [action.field]: action.value,
        };
      case "budgetValueChange":
        // Create temporary variables to modify the value
        const tempBudgets = Array.from(state.budgets);
        const values = Object.values(tempBudgets[action.index]);

        values[1] = action.value;
        // Create the new object
        const tempBudget = { name: values[0], value: values[1] };
        tempBudgets.splice(action.index, 1, tempBudget);
        return {
          ...state,
          [action.field]: tempBudgets,
        };
      case "budgetNameChange":
        // Create temporary variables to modify the value
        const thisTempBudgets = Array.from(state.budgets);
        const thisValues = Object.values(thisTempBudgets[action.index]);

        thisValues[0] = action.value;
        // Create the new object
        const thisTempBudget = { name: thisValues[0], value: thisValues[1] };
        thisTempBudgets.splice(action.index, 1, thisTempBudget);

        return {
          ...state,
          [action.field]: thisTempBudgets,
        };
      case "addBudget":
        const tempAddBudget = Array.from(state.budgets);
        tempAddBudget.push({ name: "", value: "" });
        return {
          ...state,
          [action.field]: tempAddBudget,
        };
      case "removeBudget":
        const tempRemoveBudgets = Array.from(state.budgets);
        tempRemoveBudgets.splice(action.index, 1);
        return {
          ...state,
          [action.field]: tempRemoveBudgets,
        };
      default:
        return state;
    }
  }

  function handleFormChange(value, name, type, index) {
    setFormValues({
      field: name,
      value: value,
      type: type,
      index: index,
    });
  }

  return !isDataLoaded ? (
    <Text>Loading</Text>
  ) : (
    <MapContext.Provider value={[formValues, handleFormChange]}>
      <Flex align="start" direction="column" h="100%">
        <Box w="100%" zIndex={2}>
          <NavigationBar
            title={mapTitle}
            isMapDashboard={false}
            onFilterClick={onOpenFilter}
            onClearFilterClick={onCloseFilter}
            button={
              <NewServiceButton
                handleIsEditingChange={(value) =>
                  handleIsEditingChange(value, setIsEditing)
                }
                isOpen={isOpenForm}
                onClose={onCloseForm}
                onOpen={handleOpenForm}
                organisations={fetchedOrganization}
                audiences={fetchedAudiences}
                fetchedData={fetchedData}
                isError={isError}
                applicationTypeButtons={applicationTypeButtons}
                services={services}
                handleDraftOrPublishClick={handleDraftOrPublishClick}
              />
            }
          />
        </Box>

        {isOpenFilter && (
          <FilterBar
            filters={filters}
            isButtonActive={false}
            handleAllClick={handleAllClick}
            handleNoneClick={handleNoneClick}
            handleItemClick={handleItemClick}
            handleSave={handleSave}
          />
        )}
        <Box w="100%" flex="max-content" bg="#EEEEEE" align="start" zIndex={1}>
          <SideBar isFilterOpen={isOpenFilter} />
          <Box h="100%" zIndex={0} marginLeft="100px" paddingTop={smallPadding}>
            <BackgroundCanvas isFilterOpen={isOpenFilter} />
            <ContentCanvas
              isFilterOpen={isOpenFilter}
              data={[fetchedData, setFetchedData]}
              handleServiceClick={(service) => handleServiceClick(service)}
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
        {isOpenForm && (
          <ServiceForm
            isEditing={isEditing}
            handleIsEditingChange={(value) =>
              handleIsEditingChange(value, setIsEditing)
            }
            isOpen={isOpenForm}
            onClose={onCloseForm}
            onOpen={onOpenForm}
            organisations={fetchedOrganization}
            audiences={fetchedAudiences}
            fetchedData={fetchedData}
            isError={isError}
            applicationTypeButtons={applicationTypeButtons}
            services={services}
            handleDraftOrPublishClick={handleDraftOrPublishClick}
            handleUpdateClick={handleUpdateClick}
          />
        )}
      </Flex>
    </MapContext.Provider>
  );
}

HStack.defaultProps = {
  spacing: 0,
};

export default withRouter(MapCanvasPage);
