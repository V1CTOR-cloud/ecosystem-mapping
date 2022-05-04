import React, { useRef } from "react";

import { AddIcon } from "@chakra-ui/icons";

import ButtonComponent from "../../basic/Buttons/ButtonComponent";
import {
  mediumPadding,
  verySmallPadding,
  whiteColor,
} from "../../../helper/constant";
import ServiceForm from "./form/ServiceForm";

function NewServiceButton(props) {
  const cancelRef = useRef();

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
        onClick={props.onOpen}
      />
      <ServiceForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        cancelRef={cancelRef}
        isError={props.isError}
        name={props.name}
        handleNameChange={props.handleNameChange}
        serviceFocus={props.serviceFocus}
        handleServiceFocusChange={props.handleServiceFocusChange}
        organisations={props.organisations}
        ownerOrganisation={props.ownerOrganisation}
        handleOwnerOrganisationChange={props.handleOwnerOrganisationChange}
        applicationTypeButtons={props.applicationTypeButtons}
        applicationType={props.applicationType}
        handleApplicationTypeChange={props.handleApplicationTypeChange}
        phase={props.phase}
        serviceStartTime={props.serviceStartTime}
        handleServiceStartTimeChange={props.handleServiceStartTimeChange}
        serviceEndTime={props.serviceEndTime}
        handleServiceEndTimeChange={props.serviceEndTime}
        link={props.link}
        handleLinkChange={props.handleLinkChange}
        location={props.location}
        handleLocationChange={props.handleLocationChange}
        audience={props.audience}
        audiences={props.audiences}
        handleAudienceChange={props.handleAudienceChange}
        budgets={props.budgets}
        handleBudgetValueChange={props.handleBudgetValueChange}
        handleBudgetNameChange={props.handleBudgetNameChange}
        handleAddBudget={props.handleAddBudget}
        handleRemoveBudget={props.handleRemoveBudget}
        description={props.description}
        handleDescriptionChange={props.handleDescriptionChange}
        outcomes={props.outcomes}
        handleOutcomesChange={props.handleOutcomesChange}
        precededService={props.precededService}
        services={props.services}
        handlePrecededServiceChange={props.handlePrecededServiceChange}
        followedService={props.followedService}
        handleFollowedServiceChange={props.handleFollowedServiceChange}
        handleDraftOrPublishClick={props.handleDraftOrPublishClick}
      />
    </React.Fragment>
  );
}

export default NewServiceButton;
