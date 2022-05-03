import React, { useEffect, useRef, useState } from "react";

import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import ButtonComponent from "../../basic/Buttons/ButtonComponent";
import {
  market,
  market_and_organization,
  mediumPadding,
  organization,
  verySmallPadding,
  whiteColor,
} from "../../../helper/constant";
import { replaceNumberToPhase } from "../../../service/phaseConverter";
import toastComponent from "../../basic/ToastComponent";
import ServiceForm from "./form/ServiceForm";
import service from "assets/servicesFocus.json";
import Service from "service/EcosystemMapServices";

function NewServiceButton(props) {
  // VARIABLES
  const applicationTypeButtons = [
    market,
    market_and_organization,
    organization,
  ];
  const phase = [-1.0, 1.0];
  const services = [];
  const tempServices = Object.values(props.fetchedData.services);
  tempServices.forEach((thisService) =>
    services.push({
      id: thisService.id,
      name: thisService.serviceName,
    })
  );

  // HOOKS
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
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
  const [audience, setAudience] = useState(props.audiences[0]);
  const [budgets, setBudgets] = useState([{ name: "", value: "" }]);
  const [description, setDescription] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [precededService, setPrecededService] = useState(
    services.length >= 2 ? services[0].name : ""
  );
  const [followedService, setFollowedService] = useState(
    services.length >= 2 ? services[1].name : ""
  );

  // Get all organisation and initialise by default to the first organisation in the list.
  useEffect(() => {
    setOwnerOrganisation(props.organisations[0].name);
    setAudience(props.audiences[0].name);
  }, [props.organisations, props.audiences]);

  // Each time we are opening the form, we reset the data.
  useEffect(() => {
    setIsError(false);
    setName("");
    setServiceFocus(service.servicesFocus[0]);
    setOwnerOrganisation(props.organisations[0].name);
    setApplicationType(applicationTypeButtons[0]);
    setServiceStartTime(new Date());
    setServiceEndTime(new Date());
    setLink("");
    setLocation("");
    setAudience(props.audiences[0].name);
    //setBudgets([{ name: "", value: "" }]);
    setDescription("");
    setOutcomes("");
    if (services.length >= 2) {
      setPrecededService(services[0].name);
      setFollowedService(services[1].name);
    }
  }, [isOpen]);

  function handleValueChange(value, setValue) {
    setValue(value);
  }

  function handleNameChange(name) {
    setIsError(name === "");
    setName(name);
  }

  function handleServiceFocusChange(serviceFocus) {
    setServiceFocus(serviceFocus);
  }

  function handleOwnerOrganisationChange(ownerOrganisation) {
    setOwnerOrganisation(ownerOrganisation);
  }

  function handleApplicationTypeChange(applicationType) {
    setApplicationType(applicationType);
  }

  function handleServiceStartTimeChange(serviceStartTime) {
    setServiceStartTime(serviceStartTime);
  }

  function handleServiceEndTimeChange(serviceEndTime) {
    setServiceEndTime(serviceEndTime);
  }

  function handleLinkChange(link) {
    setLink(link);
  }

  function handleLocationChange(location) {
    setLocation(location);
  }

  function handleAudienceChange(audience) {
    setAudience(audience);
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

  function handleDescriptionChange(description) {
    setDescription(description);
  }

  function handleOutcomesChange(outcomes) {
    setOutcomes(outcomes);
  }

  function handlePrecededServiceChange(precededService) {
    setPrecededService(precededService);
  }

  function handleFollowedServiceChange(followedService) {
    setFollowedService(followedService);
  }

  // function handleTagsChange(tag) {
  //   setTags(tag);
  // }

  async function handleDraftOrPublishClick(serviceStatus) {
    const organisationId = props.organisations.find(
      (organisation) => ownerOrganisation === organisation.name
    ).id;

    const fromPhase = replaceNumberToPhase(phase[0]);
    const toPhase = replaceNumberToPhase(phase[1]);

    const data = {
      name: name,
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
      //TODO Find a way to add at the end of the section
      //order: order
    };

    if (name === "") {
      setIsError(true);
    } else {
      const res = await Service.createService(data);
      // Check if we created the service
      if (res.createService) {
        onClose();
        //TODO set service
      } else {
        toastComponent(res, "error", 5000);
      }
    }
  }

  return (
    <React.Fragment>
      <ButtonComponent
        isPrimary={true}
        padding={`0 0 0 ${mediumPadding}`}
        buttonText={"New service"}
        icon={
          <AddIcon
            marginRight={verySmallPadding}
            color={whiteColor}
            w="15px"
            h="15px"
          />
        }
        onClick={onOpen}
      />
      <ServiceForm
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        isError={isError}
        name={name}
        handleNameChange={(event) => handleNameChange(event.target.value)}
        serviceFocus={serviceFocus}
        handleServiceFocusChange={(thisServiceFocus) =>
          handleValueChange(thisServiceFocus, setServiceFocus)
        }
        organisations={props.organisations}
        ownerOrganisation={ownerOrganisation}
        handleOwnerOrganisationChange={(ownerOrganisation) =>
          handleOwnerOrganisationChange(ownerOrganisation)
        }
        applicationTypeButtons={applicationTypeButtons}
        applicationType={applicationType}
        handleApplicationTypeChange={(applicationType) =>
          handleApplicationTypeChange(applicationType)
        }
        phase={phase}
        serviceStartTime={serviceStartTime}
        handleServiceStartTimeChange={(date) =>
          handleServiceStartTimeChange(date)
        }
        serviceEndTime={serviceEndTime}
        handleServiceEndTime={(date) => handleServiceEndTimeChange(date)}
        link={link}
        handleLinkChange={(event) => handleLinkChange(event.target.value)}
        location={location}
        handleLocationChange={(event) =>
          handleLocationChange(event.target.value)
        }
        audience={audience}
        audiences={props.audiences}
        handleAudienceChange={(audience) => handleAudienceChange(audience)}
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
          handleDescriptionChange(event.target.value)
        }
        outcomes={outcomes}
        handleOutcomesChange={(event) =>
          handleOutcomesChange(event.target.value)
        }
        precededService={precededService}
        services={services}
        handlePrecededServiceChange={(precededService) =>
          handlePrecededServiceChange(precededService)
        }
        followedService={followedService}
        handleFollowedServiceChange={(followedService) =>
          handleFollowedServiceChange(followedService)
        }
        handleDraftOrPublishClick={handleDraftOrPublishClick}
      />
    </React.Fragment>
  );
}

export default NewServiceButton;
