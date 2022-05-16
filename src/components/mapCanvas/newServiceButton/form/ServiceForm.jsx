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
  Button,
} from "@chakra-ui/react";
import { Archive } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";

import { greyTextColor, mediumPadding } from "../../../../helper/constant";
import InputComponent from "../../../basic/inputs/input/inputComponent/InputComponent";
import ServiceFocusComponent from "./serviceFocusComponent/ServiceFocusComponent";
import ServiceTabs from "./tabs/ServiceTabs";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import service from "../../../../assets/servicesFocus.json";
import Service from "../../../../service/EcosystemMapServices";
import toastComponent from "../../../basic/ToastComponent";
import { replaceNumberToPhase } from "../../../../service/phaseConverter";

function ServiceForm(props) {
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const formValue = {
    serviceName: "",
    serviceFocus: service.servicesFocus[0],
    ownerOrganisation: props.organisations[0].name,
    applicationType: props.applicationTypeButtons[0],
    phases: [-1.0, 1.0],

    serviceStartTime: new Date(),
    serviceEndTime: new Date(),
    link: "",
    audience: props.audiences[0].name,
    location: "",
    budgets: [{ name: "", value: "" }],

    description: "",
    outcomes: "",
    precededService: t("mapping.canvas.form.service.select.service"),
    followedService: t("mapping.canvas.form.service.select.service"),
  };

  // Function that will send to the database the new service that was created (publish and draft)
  async function handleDraftOrPublishClick(serviceStatus) {
    const organisationId = props.organisations.find(
      (organisation) => formValue["ownerOrganisation"] === organisation.name
    ).id;

    console.log(organisationId);

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
      location: formValue["location"],
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

    console.log(data);

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
            <Button onClick={() => console.log(formValue)}>
              show formValue
            </Button>
            <Box zIndex={10}>
              <ServiceTabs
                organisations={props.organisations}
                applicationTypeButtons={props.applicationTypeButtons}
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
                    props.handleIsEditingChange(false);
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
                  //TODO function to unpublished the service
                  onClick={() => {
                    console.log("Unpublished clicked");
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
                  buttonText={"Save"}
                  isPrimary={true}
                  onClick={() => {
                    //props.handleUpdateClick("Published");
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
