import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Spacer,
} from "@chakra-ui/react";

import { greyTextColor, mediumPadding } from "../../../../helper/constant";
import InputComponent from "../../../basic/inputs/input/inputComponent/InputComponent";
import ApplicationTypeComponent from "./applicationTypeComponent/ApplicationTypeComponent";
import ServiceTabs from "./tabs/ServiceTabs";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import { useTranslation } from "react-i18next";

function ServiceForm(props) {
  const { t } = useTranslation();

  return (
    <AlertDialog
      size="xl"
      isOpen={props.isOpen}
      leastDestructiveRef={props.cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogBody paddingY={mediumPadding}>
            <HStack alignItems="flex-start">
              <FormControl isInvalid={props.isError}>
                <InputComponent
                  isRequired={true}
                  value={props.name}
                  placeholder="Service Name ..."
                  handleOnChange={props.handleNameChange}
                />
                {props.isError ? (
                  <FormErrorMessage>
                    Enter the name of your service.
                  </FormErrorMessage>
                ) : (
                  <Box />
                )}
              </FormControl>
              <ApplicationTypeComponent
                handleServiceFocusChange={props.handleServiceFocusChange}
                serviceFocus={props.serviceFocus}
              />
            </HStack>
            <ServiceTabs
              ownerOrganisation={props.ownerOrganisation}
              organisations={props.organisations}
              handleOwnerOrganisationChange={
                props.handleOwnerOrganisationChange
              }
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
            />
            <Flex paddingTop={mediumPadding}>
              <ButtonComponent
                buttonText={t("common.cancel")}
                isWithoutBorder={true}
                color={greyTextColor}
                onClick={props.onClose}
              />
              <Spacer />
              <ButtonComponent
                padding={`0 ${mediumPadding} 0 0`}
                buttonText={t("mapping.button.draft")}
                isWithoutBorder={true}
                onClick={() => props.handleDraftOrPublishClick("Draft")}
              />
              <ButtonComponent
                buttonText={t("mapping.button.publish")}
                isPrimary={true}
                onClick={() => props.handleDraftOrPublishClick("Published")}
              />
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ServiceForm;
