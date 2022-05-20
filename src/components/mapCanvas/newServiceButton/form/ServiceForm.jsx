import React, { useState } from "react";

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
import { Archive } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";

import {
  greyTextColor,
  market,
  market_and_organization,
  mediumPadding,
  organization,
} from "../../../../helper/constant";
import InputComponent from "../../../basic/inputs/input/inputComponent/InputComponent";
import ServiceFocusComponent from "./serviceFocusComponent/ServiceFocusComponent";
import ServiceTabs from "./tabs/ServiceTabs";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import service from "../../../../assets/servicesFocus.json";
import Service from "../../../../service/EcosystemMapServices";
import toastComponent from "../../../basic/ToastComponent";
import {
  replaceNumberToPhase,
  replacePhaseToNumber,
} from "../../../../service/phaseConverter";
import Services from "../../../../service/EcosystemMapServices";

function ServiceForm(props) {
  const applicationTypeButtons = [
    market,
    market_and_organization,
    organization,
  ];
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const formValue = {
    serviceName: "",
    serviceFocus: service.servicesFocus[0],
    ownerOrganisation: props.organisations[0].name,
    applicationType: applicationTypeButtons[0],
    phases: [-1.0, 1.0],

    serviceStartTime: new Date(),
    serviceEndTime: new Date(),
    link: "",
    audience: props.audiences[0].name,
    serviceLocation: "",
    budgets: [{ name: "", value: "" }],

    description: "",
    outcomes: "",
    precededService: t("mapping.canvas.form.service.select.service"),
    followedService: t("mapping.canvas.form.service.select.service"),
  };

  // We set the values of formValue because we are in edition mode.
  // Do not need useEffect since this component is rendered only once
  if (props.isEditing) {
    formValue["serviceName"] = props.serviceWithoutModification.serviceName;
    formValue["serviceFocus"] = service.servicesFocus.find(
      (result) =>
        result.name.split(" ").join("") ===
        props.serviceWithoutModification.serviceFocus
    );
    formValue["ownerOrganisation"] =
      props.serviceWithoutModification.serviceOwner[0].organisationName;
    formValue["applicationType"] =
      props.serviceWithoutModification.applicationType;
    formValue["phases"] = [
      replacePhaseToNumber(props.serviceWithoutModification.fromPhase),
      replacePhaseToNumber(props.serviceWithoutModification.toPhase),
    ];

    formValue["serviceStartTime"] =
      props.serviceWithoutModification.serviceStartTime;
    formValue["serviceEndTime"] =
      props.serviceWithoutModification.serviceEndTime;
    formValue["serviceLocation"] = props.serviceWithoutModification
      .serviceLocation
      ? props.serviceWithoutModification.serviceLocation
      : "";
    formValue["link"] = props.serviceWithoutModification.link
      ? props.serviceWithoutModification.link
      : "";
    formValue["audience"] = props.serviceWithoutModification.serviceAudience
      .split("_")
      .join(" ");
    formValue["budgets"] = props.serviceWithoutModification.budgets
      ? props.serviceWithoutModification.budgets
      : [{ name: "", value: "" }];
    formValue["description"] = props.serviceWithoutModification.description
      ? props.serviceWithoutModification.description
      : "";
    formValue["outcomes"] = props.serviceWithoutModification.outcomes
      ? props.serviceWithoutModification.outcomes
      : "";

    if (props.serviceWithoutModification.previousService !== "") {
      const previousService = props.services.find(
        (service) =>
          service.name === props.serviceWithoutModification.previousService
      );
      if (previousService !== undefined) {
        formValue["precededService"] = previousService;
      }
    }

    if (props.serviceWithoutModification.followedService !== "") {
      const followingService = props.services.find(
        (service) =>
          service.name === props.serviceWithoutModification.followedService
      );
      if (followingService !== undefined) {
        formValue["followingService"] = followingService;
      }
    }
  }

  // Function that will send to the database the new service that was created (publish and draft)
  async function handleDraftOrPublishClick(serviceStatus) {
    const organisationId = props.organisations.find(
      (organisation) => formValue["ownerOrganisation"] === organisation.name
    ).id;

    const fromPhase = replaceNumberToPhase(formValue["phases"][0]);
    const toPhase = replaceNumberToPhase(formValue["phases"][1]);

    const order =
      props.fetchedData[0].rows[formValue["applicationType"]].serviceIds.length;

    const data = {
      serviceName: formValue["serviceName"],
      serviceFocus: formValue["serviceFocus"].name.replaceAll(" ", ""),
      organisationId: organisationId,
      applicationType: formValue["applicationType"]
        .replaceAll(" ", "_")
        .replace("&", "and"),
      serviceStartTime: formValue["serviceStartTime"],
      serviceEndTime: formValue["serviceEndTime"],
      link: formValue["link"],
      serviceLocation: formValue["serviceLocation"],
      audience: formValue["audience"].split(" ").join("_"),
      description: formValue["description"],
      outcomes: formValue["outcomes"],
      precededService:
        formValue["precededService"] === "Select a service"
          ? ""
          : formValue["precededService"],
      followedService:
        formValue["followedService"] === "Select a service"
          ? ""
          : formValue["followedService"],
      fromPhase: fromPhase,
      toPhase: toPhase,

      mapId: props.mapId,
      serviceStatus: serviceStatus,
      order: order,
    };

    await createNewService(data);
  }

  // Function that will check if everything is correct to send it to the database to avoid errors
  async function createNewService(data) {
    if (formValue["serviceName"] === "") {
      setIsError(true);
    } else {
      const res = await Service.createService(data);
      // Check if we created the service
      if (res.createService) {
        props.onClose();

        const newData = addServiceToData(res);

        props.fetchedData[1](newData);
        toastComponent(
          t("mapping.toast.success.create.service"),
          "success",
          5000
        );
      } else {
        toastComponent(res, "error", 5000);
      }
    }
  }

  // Function that add the new service create to the canvas
  function addServiceToData(res) {
    // Format the list of services to correspond to the model of fetchedData
    const tempServices = Object.assign(props.fetchedData[0].services, {
      [res.createService.id]: {
        ...res.createService,
      },
    });

    // Add the service id to the corresponding row
    const tempRows = props.fetchedData[0].rows;
    tempRows[res.createService.applicationType].serviceIds.push(
      res.createService.id
    );

    props.services.push({
      id: res.createService.id,
      name: res.serviceName,
    });

    // Create new object to setState the fetchedData
    return {
      rowsOrder: props.fetchedData[0].rowsOrder,
      services: tempServices,
      rows: tempRows,
    };
  }

  async function handleUpdateClick(serviceStatus) {
    // Retrieve the organisation id that we selected (modified or not)
    const organisationId = props.organisations.find(
      (organisation) => formValue["ownerOrganisation"] === organisation.name
    ).id;

    // Retrieve the organisation id that was previously selected to disconnected it.
    const organisationIdWithoutModification = props.organisations.find(
      (organisation) =>
        props.serviceWithoutModification.serviceOwner[0].organisationName ===
        organisation.name
    ).id;

    const fromPhase = replaceNumberToPhase(formValue["phases"][0]);
    const toPhase = replaceNumberToPhase(formValue["phases"][1]);

    let order;

    // Check if we change of application type (row) if that is the case push the service at the last index, otherwise we are keeping the same.
    if (
      props.serviceWithoutModification.applicationType ===
      formValue["applicationType"].replaceAll(" ", "_").replace("&", "and")
    ) {
      order = props.serviceWithoutModification.order;
    } else {
      order =
        props.fetchedData[0].rows[formValue["applicationType"]].serviceIds
          .length;
    }

    const data = {
      id: props.serviceWithoutModification.id,

      // First tabs
      serviceName: formValue["serviceName"],
      applicationType: formValue["applicationType"]
        .replaceAll(" ", "_")
        .replace("&", "and"),
      organisationId: organisationId,
      serviceFocus: formValue["serviceFocus"].name.replaceAll(" ", ""),
      fromPhase: fromPhase,
      toPhase: toPhase,

      // Second tabs
      serviceStartTime: formValue["serviceStartTime"],
      serviceEndTime: formValue["serviceEndTime"],
      link: formValue["link"],
      location: formValue["location"],
      audience: formValue["audience"].split(" ").join("_"),
      budgets: formValue["budget"],

      // Third tabs
      description: formValue["description"],
      outcomes: formValue["outcomes"],
      precededService:
        formValue["precededService"] ===
        t("mapping.canvas.form.service.select.service")
          ? ""
          : formValue["precededService"],
      followedService:
        formValue["followedService"] ===
        t("mapping.canvas.form.service.select.service")
          ? ""
          : formValue["followedService"],

      // Others parameters hidden from the user
      mapId: props.mapId,
      serviceStatus: serviceStatus,
      order: order,

      // Parameters to be able to filter afterwards
      serviceWithoutModification: props.serviceWithoutModification,
      organisationIdWithoutModification: organisationIdWithoutModification,
    };

    await updateService(data);
  }

  async function updateService(data) {
    if (formValue["serviceName"] === "") {
      setIsError(true);
    } else {
      const res = await Service.updateService(data);
      // Check if we update the service
      if (res.updateService) {
        const newData = await updateServiceToData(res.updateService);
        props.fetchedData[1](newData);
        props.onClose();

        toastComponent(t("mapping.toast.success.service"), "success", 5000);
      } else {
        toastComponent(res, "error", 5000);
      }
    }
  }

  async function updateServiceToData(updateService) {
    // Format the list of services to correspond to the model of fetchedData
    const tempServices = Object.assign(props.fetchedData[0].services, {
      [updateService.id]: {
        ...updateService,
      },
    });

    // Add the service id to the corresponding row
    const tempRows = props.fetchedData[0].rows;
    if (
      props.serviceWithoutModification.applicationType ===
      updateService.applicationType
    ) {
      // Remove the element in the same row to put it the updated version.
      tempRows[updateService.applicationType].serviceIds.splice(
        props.serviceWithoutModification.order,
        1,
        updateService.id
      );
    } else {
      // Remove the element in the original row.
      tempRows[
        props.serviceWithoutModification.applicationType
      ].serviceIds.splice(props.serviceWithoutModification.order, 1);
      // Add it at the last index of the new row.
      tempRows[updateService.applicationType].serviceIds.push(updateService.id);

      // Update all the others services because their order have changed
      const values = Object.values(tempServices);
      let error;
      for (const service of values) {
        if (
          service.applicationType ===
            props.serviceWithoutModification.applicationType &&
          service.order > props.serviceWithoutModification.order
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

    // Create new object to setState the fetchedData
    return {
      rowsOrder: props.fetchedData[0].rowsOrder,
      services: tempServices,
      rows: tempRows,
    };
  }

  return (
    <AlertDialog
      size="xl"
      isOpen={props.isOpen}
      leastDestructiveRef={props.cancelRef}
      onClose={props.onClose}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogBody paddingY={mediumPadding}>
            <HStack alignItems="flex-start" zIndex={11}>
              <FormControl isInvalid={isError}>
                <InputComponent
                  isRequired={true}
                  value={formValue["serviceName"]}
                  placeholder={t("mapping.canvas.form.service.name")}
                  onChange={(serviceName) => {
                    formValue["serviceName"] = serviceName;
                    if (serviceName === "") {
                      setIsError(true);
                    } else {
                      setIsError(false);
                    }
                  }}
                />
                {isError ? (
                  <FormErrorMessage>
                    {t("mapping.canvas.form.service.name.error")}
                  </FormErrorMessage>
                ) : (
                  <Box />
                )}
              </FormControl>
              <ServiceFocusComponent
                serviceFocus={formValue["serviceFocus"]}
                onChange={(serviceFocus) =>
                  (formValue["serviceFocus"] = serviceFocus)
                }
              />
            </HStack>
            <Box zIndex={10}>
              <ServiceTabs
                organisations={props.organisations}
                applicationTypeButtons={applicationTypeButtons}
                audiences={props.audiences}
                services={props.services}
                formValue={formValue}
              />
            </Box>
            <Flex paddingTop={mediumPadding}>
              {props.isEditing ? (
                <ButtonComponent
                  buttonText={t("mapping.canvas.form.archive.button")}
                  isWithoutBorder={true}
                  color={greyTextColor}
                  icon={<Archive color={greyTextColor} size="20px" />}
                  //TODO archived function
                  onClick={() => {
                    console.log("Archived Clicked");
                  }}
                />
              ) : (
                <ButtonComponent
                  buttonText={t("common.cancel")}
                  isWithoutBorder={true}
                  color={greyTextColor}
                  onClick={props.onClose}
                />
              )}
              <Spacer />
              {props.isEditing ? (
                <ButtonComponent
                  padding={`0 ${mediumPadding} 0 0`}
                  buttonText={t("common.cancel")}
                  isWithoutBorder={true}
                  color={greyTextColor}
                  onClick={() => {
                    props.onClose();
                  }}
                />
              ) : (
                <Box />
              )}
              {props.isEditing ? (
                <ButtonComponent
                  padding={`0 ${mediumPadding} 0 0`}
                  buttonText={t("mapping.canvas.form.unpublished.button")}
                  isWithoutBorder={false}
                  onClick={async () => {
                    await handleUpdateClick("Draft");
                  }}
                />
              ) : (
                <ButtonComponent
                  padding={`0 ${mediumPadding} 0 0`}
                  buttonText={t("mapping.canvas.form.draft.button")}
                  isWithoutBorder={true}
                  onClick={() => handleDraftOrPublishClick("Draft")}
                />
              )}
              {props.isEditing ? (
                <ButtonComponent
                  buttonText={t("mapping.canvas.form.save.button")}
                  isPrimary={true}
                  onClick={async () => {
                    await handleUpdateClick("Published");
                  }}
                />
              ) : (
                <ButtonComponent
                  buttonText={t("mapping.canvas.form.publish.button")}
                  isPrimary={true}
                  onClick={() => handleDraftOrPublishClick("Published")}
                />
              )}
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ServiceForm;
