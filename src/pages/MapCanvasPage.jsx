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
import service from "../assets/servicesFocus.json";
import { replaceNumberToPhase } from "../service/phaseConverter";
import toastComponent from "../components/basic/ToastComponent";
import ServiceForm from "../components/mapCanvas/newServiceButton/form/ServiceForm";

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
  // VARIABLES
  const applicationTypeButtons = [
    market,
    market_and_organization,
    organization,
  ];
  const phase = [-1.0, 1.0];

  // HOOKS
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
  const [services] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [fetchedData, setFetchedData] = useState(null);
  const [fetchedOrganization, setFetchedOrganization] = useState(null);
  const [fetchedAudiences, setFetchedAudiences] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [serviceFocus, setServiceFocus] = useState(service.servicesFocus[0]);
  const [ownerOrganisation, setOwnerOrganisation] = useState("");
  // const [tags, setTags] = useState([]);
  const [applicationType, setApplicationType] = useState(
    applicationTypeButtons[0]
  );
  const [serviceStartTime, setServiceStartTime] = useState(new Date());
  const [serviceEndTime, setServiceEndTime] = useState(new Date());
  const [link, setLink] = useState("");
  const [location, setLocation] = useState("");
  const [audience, setAudience] = useState("");
  const [budgets, setBudgets] = useState([{ name: "", value: "" }]);
  const [description, setDescription] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [precededService, setPrecededService] = useState("");
  const [followedService, setFollowedService] = useState("");

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
      setOwnerOrganisation(tempOrganizations[0].name);

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
      setAudience(tempAudiences[0].name);

      const tempServices = Object.values(sortedData.services);
      tempServices.forEach((thisService) => {
        services.push({
          id: thisService.id,
          name: thisService.serviceName,
        });
      });
      if (services.length >= 2) {
        setPrecededService(tempServices[0].name);
        setFollowedService(tempServices[1].name);
      }
    };

    fetchData().then(() => setIsDataLoaded(true));
  }, [props.mapId]);

  // Each time we are opening the form, we reset the data.
  useEffect(() => {
    if (isDataLoaded) {
      setIsError(false);
      setName("");
      setServiceFocus(service.servicesFocus[0]);
      setOwnerOrganisation(fetchedOrganization[0].name);
      setApplicationType(applicationTypeButtons[0]);
      setServiceStartTime(new Date());
      setServiceEndTime(new Date());
      setLink("");
      setLocation("");
      setAudience(fetchedAudiences[0].name);
      //setBudgets([{ name: "", value: "" }]);
      setDescription("");
      setOutcomes("");
      if (services.length >= 2) {
        setPrecededService(services[0].name);
        setFollowedService(services[1].name);
      }
    }
  }, [isOpenForm]);

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

  function handleServiceClick(service) {
    onOpenForm();
  }

  function handleValueChange(value, setValue) {
    setValue(value);
  }

  function handleNameChange(name) {
    setIsError(name === "");
    setName(name);
  }

  function handleBudgetValueChange(value, index) {
    // Create temporary variables to modify the value
    const tempBudgets = Array.from(budgets);
    const values = Object.values(tempBudgets[index]);

    values[1] = value;
    // Create the new object
    const tempBudget = { name: values[0], value: values[1] };
    tempBudgets.splice(index, 1, tempBudget);

    setBudgets(tempBudgets);
  }

  function handleBudgetNameChange(name, index) {
    // Create temporary variables to modify the value
    const tempBudgets = Array.from(budgets);
    const values = Object.values(tempBudgets[index]);

    values[0] = name;
    // Create the new object
    const tempBudget = { name: values[0], value: values[1] };
    tempBudgets.splice(index, 1, tempBudget);

    setBudgets(tempBudgets);
  }

  function handleAddBudget() {
    const tempBudgets = Array.from(budgets);
    tempBudgets.push({ name: "", value: "" });
    setBudgets(tempBudgets);
  }

  function handleRemoveBudget(index) {
    const tempBudgets = Array.from(budgets);
    tempBudgets.splice(index, 1);
    setBudgets(tempBudgets);
  }

  // function handleTagsChange(tag) {
  //   setTags(tag);
  // }

  async function handleDraftOrPublishClick(serviceStatus) {
    const organisationId = fetchedOrganization.find(
      (organisation) => ownerOrganisation === organisation.name
    ).id;

    const fromPhase = replaceNumberToPhase(phase[0]);
    const toPhase = replaceNumberToPhase(phase[1]);

    const order = fetchedData.rows[applicationType].serviceIds.length;

    const data = {
      serviceName: name,
      serviceFocus: serviceFocus.name.replaceAll(" ", ""),
      organisationId: organisationId,
      applicationType: applicationType.replaceAll(" ", "_").replace("&", "and"),
      serviceStartTime: serviceStartTime,
      serviceEndTime: serviceEndTime,
      link: link,
      location: location,
      audience: audience.split(" ").join("_"),
      description: description,
      outcomes: outcomes,
      precededService: precededService,
      followedService: followedService,
      fromPhase: fromPhase,
      toPhase: toPhase,

      mapId: props.mapId,
      serviceStatus: serviceStatus,
      order: order,
    };

    if (name === "") {
      setIsError(true);
    } else {
      const res = await Service.createService(data);
      // Check if we created the service
      if (res.createService) {
        onCloseForm();

        // Create the new service object with the id

        // Format the list of services to correspond to the model of fetchedData
        const tempServices = Object.assign(fetchedData.services, {
          [res.createService.id]: {
            ...res.createService,
          },
        });

        const tempRows = fetchedData.rows;

        tempRows[res.createService.applicationType].serviceIds.push(
          res.createService.id
        );

        const newData = {
          rowsOrder: fetchedData.rowsOrder,
          services: tempServices,
          rows: tempRows,
        };

        services.push({
          id: res.createService.id,
          name: data.serviceName,
        });

        setFetchedData(newData);
      } else {
        toastComponent(res, "error", 5000);
      }
    }
  }

  return !isDataLoaded ? (
    <Text>Loading</Text>
  ) : (
    <Flex align="start" direction="column" h="100%">
      <Box w="100%">
        <NavigationBar
          title={"Ecosystem Map Title"}
          isMapDashboard={false}
          onFilterClick={onOpenFilter}
          onClearFilterClick={onCloseFilter}
          button={
            <NewServiceButton
              isOpen={isOpenForm}
              onClose={onCloseForm}
              onOpen={onOpenForm}
              organisations={fetchedOrganization}
              audiences={fetchedAudiences}
              fetchedData={fetchedData}
              isError={isError}
              name={name}
              handleNameChange={(event) => handleNameChange(event.target.value)}
              serviceFocus={serviceFocus}
              handleServiceFocusChange={(thisServiceFocus) =>
                handleValueChange(thisServiceFocus, setServiceFocus)
              }
              ownerOrganisation={ownerOrganisation}
              handleOwnerOrganisationChange={(ownerOrganisation) =>
                handleValueChange(ownerOrganisation, setOwnerOrganisation)
              }
              applicationTypeButtons={applicationTypeButtons}
              applicationType={applicationType}
              handleApplicationTypeChange={(applicationType) =>
                handleValueChange(applicationType, setApplicationType)
              }
              phase={phase}
              serviceStartTime={serviceStartTime}
              handleServiceStartTimeChange={(date) =>
                handleValueChange(date, setServiceStartTime)
              }
              serviceEndTime={serviceEndTime}
              handleServiceEndTime={(date) =>
                handleValueChange(date, setServiceEndTime)
              }
              link={link}
              handleLinkChange={(event) =>
                handleValueChange(event.target.value, setLink)
              }
              location={location}
              handleLocationChange={(event) =>
                handleValueChange(event.target.value, setLocation)
              }
              audience={audience}
              handleAudienceChange={(audience) =>
                handleValueChange(audience, setAudience)
              }
              budgets={budgets}
              handleBudgetValueChange={(event, index) =>
                handleBudgetValueChange(event.target.value, index)
              }
              handleBudgetNameChange={(event, index) =>
                handleBudgetNameChange(event.target.value, index)
              }
              handleAddBudget={handleAddBudget}
              handleRemoveBudget={(budget) => handleRemoveBudget(budget)}
              description={description}
              handleDescriptionChange={(event) =>
                handleValueChange(event.target.value, setDescription)
              }
              outcomes={outcomes}
              handleOutcomesChange={(event) =>
                handleValueChange(event.target.value, setOutcomes)
              }
              precededService={precededService}
              services={services}
              handlePrecededServiceChange={(precededService) =>
                handleValueChange(precededService, setPrecededService)
              }
              followedService={followedService}
              handleFollowedServiceChange={(followedService) =>
                handleValueChange(followedService, setFollowedService)
              }
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
      <Box w="100%" flex="max-content" bg="#EEEEEE" align="start">
        <SideBar isFilterOpen={isOpenFilter} />
        <Box h="100%" zIndex={0} marginLeft="100px" paddingTop={smallPadding}>
          <BackgroundCanvas isFilterOpen={isOpenFilter} />
          <ContentCanvas
            isFilterOpen={isOpenFilter}
            data={fetchedData}
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
          isOpen={isOpenForm}
          onClose={onCloseForm}
          onOpen={onOpenForm}
          organisations={fetchedOrganization}
          audiences={fetchedAudiences}
          fetchedData={fetchedData}
          isError={isError}
          name={name}
          handleNameChange={(event) => handleNameChange(event.target.value)}
          serviceFocus={serviceFocus}
          handleServiceFocusChange={(thisServiceFocus) =>
            handleValueChange(thisServiceFocus, setServiceFocus)
          }
          ownerOrganisation={ownerOrganisation}
          handleOwnerOrganisationChange={(ownerOrganisation) =>
            handleValueChange(ownerOrganisation, setOwnerOrganisation)
          }
          applicationTypeButtons={applicationTypeButtons}
          applicationType={applicationType}
          handleApplicationTypeChange={(applicationType) =>
            handleValueChange(applicationType, setApplicationType)
          }
          phase={phase}
          serviceStartTime={serviceStartTime}
          handleServiceStartTimeChange={(date) =>
            handleValueChange(date, setServiceStartTime)
          }
          serviceEndTime={serviceEndTime}
          handleServiceEndTime={(date) =>
            handleValueChange(date, setServiceEndTime)
          }
          link={link}
          handleLinkChange={(event) =>
            handleValueChange(event.target.value, setLink)
          }
          location={location}
          handleLocationChange={(event) =>
            handleValueChange(event.target.value, setLocation)
          }
          audience={audience}
          handleAudienceChange={(audience) =>
            handleValueChange(audience, setAudience)
          }
          budgets={budgets}
          handleBudgetValueChange={(event, index) =>
            handleBudgetValueChange(event.target.value, index)
          }
          handleBudgetNameChange={(event, index) =>
            handleBudgetNameChange(event.target.value, index)
          }
          handleAddBudget={handleAddBudget}
          handleRemoveBudget={(budget) => handleRemoveBudget(budget)}
          description={description}
          handleDescriptionChange={(event) =>
            handleValueChange(event.target.value, setDescription)
          }
          outcomes={outcomes}
          handleOutcomesChange={(event) =>
            handleValueChange(event.target.value, setOutcomes)
          }
          precededService={precededService}
          services={services}
          handlePrecededServiceChange={(precededService) =>
            handleValueChange(precededService, setPrecededService)
          }
          followedService={followedService}
          handleFollowedServiceChange={(followedService) =>
            handleValueChange(followedService, setFollowedService)
          }
          handleDraftOrPublishClick={handleDraftOrPublishClick}
        />
      )}
    </Flex>
  );
}

HStack.defaultProps = {
  spacing: 0,
};

export default withRouter(MapCanvasPage);
