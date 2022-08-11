import React, { useContext, useState } from "react";

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
import PropTypes from "prop-types";

import {
  audienceList,
  market,
  market_and_organization,
  organization,
} from "../../../../helper/constant";
import InputComponent from "../../../basic/inputs/input/inputComponent/InputComponent";
import ServiceFocusComponent from "./serviceFocusComponent/ServiceFocusComponent";
import ServiceTabs from "./tabs/ServiceTabs";
import service from "../../../../assets/servicesFocus.json";
import ToastComponent from "../../../basic/ToastComponent";
import { Service } from "../../../../service/service";
import { CanvasProvider } from "../../../../pages/MapCanvasPage";

function ServiceForm(props) {
  const {
    propOrganisations,
    isEditing,
    isOpen,
    serviceWithoutModification,
    onClose,
    cancelRef,
  } = props;
  const canvasProvider = useContext(CanvasProvider);
  const [data, setData] = canvasProvider.fetchedData;
  const services = canvasProvider.services;
  const applicationTypeButtons = [
    market,
    market_and_organization.replaceAll("_", " "),
    organization,
  ];
  const { t } = useTranslation();
  const [isError, setIsError] = useState(false);
  const organisations = [{ id: 0, name: "Organisation" }, ...propOrganisations];
  const audiences = [{ id: 0, name: "Audience" }, ...audienceList];
  const formValue = {
    serviceName: "",
    serviceFocus: service.servicesFocus[0],
    ownerOrganization: organisations[0].name,
    serviceApplication: applicationTypeButtons[0],
    servicePhaseRange: {
      startPhase: -1.0,
      endPhase: 1.0,
    },
    serviceTime: {
      startTime: new Date(),
      endTime: new Date(),
    },
    serviceLink: "",
    serviceAudience: audiences[0].name,
    serviceLocation: [
      {
        continent: null,
        country: null,
        region: null,
        city: null,
      },
    ],
    serviceBudget: [{ budgetTitle: "", budgetValue: "", budgetCurrency: "€" }],

    serviceDescription: "",
    serviceOutcomes: "",
    precededService: t("mapping.canvas.form.service.select.service"),
    followedService: t("mapping.canvas.form.service.select.service"),
  };

  // We set the values of formValue because we are in edition mode.
  // Do not need useEffect since this component is rendered only once
  if (isEditing) {
    formValue.serviceName = serviceWithoutModification.serviceName;
    formValue.serviceFocus = service.servicesFocus.find(
      (result) =>
        result.name.split(" ").join("") ===
        serviceWithoutModification.serviceFocus
    );
    formValue.ownerOrganization = serviceWithoutModification.ownerOrganization
      ? serviceWithoutModification.ownerOrganization[0].organisationName
      : organisations[0].name;
    formValue.serviceApplication =
      serviceWithoutModification.serviceApplication.replaceAll("_", " ");
    formValue.servicePhaseRange = {
      startPhase: Service.replacePhaseToNumber(
        serviceWithoutModification.servicePhaseRange.startPhase
      ),
      endPhase: Service.replacePhaseToNumber(
        serviceWithoutModification.servicePhaseRange.endPhase
      ),
    };

    // For the time we convert the data to the timeZone of the user because the data retrieve are in GMT+00:00
    formValue.serviceTime.startTime = timeZoneConvertor(
      serviceWithoutModification.serviceTime.startTime,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    formValue.serviceTime.endTime = timeZoneConvertor(
      serviceWithoutModification.serviceTime.endTime,
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    formValue.serviceLocation = serviceWithoutModification.serviceLocation
      ? [serviceWithoutModification.serviceLocation]
      : [
          {
            continent: null,
            country: null,
            region: null,
            city: null,
          },
        ];
    formValue.serviceLink = serviceWithoutModification.serviceLink
      ? serviceWithoutModification.serviceLink
      : "";
    formValue.serviceAudience = serviceWithoutModification.serviceAudience
      ? serviceWithoutModification.serviceAudience
      : audiences[0].name;
    formValue.serviceBudget = serviceWithoutModification.serviceBudget
      ? props.serviceWithoutModification.serviceBudget
      : [
          {
            budgetTitle: "",
            budgetValue: "",
            budgetCurrency: "€",
          },
        ];
    formValue.serviceDescription = serviceWithoutModification.serviceDescription
      ? serviceWithoutModification.serviceDescription
      : "";
    formValue.serviceOutcomes = serviceWithoutModification.serviceOutcomes
      ? serviceWithoutModification.serviceOutcomes
      : "";

    if (serviceWithoutModification.previousService !== "") {
      const previousService = services.find(
        (service) => service.name === serviceWithoutModification.previousService
      );
      if (previousService !== undefined) {
        formValue.precededService = previousService;
      }
    }

    if (serviceWithoutModification.followedService !== "") {
      const followingService = services.find(
        (service) => service.name === serviceWithoutModification.followedService
      );
      if (followingService !== undefined) {
        formValue.followingService = followingService;
      }
    }

    // Check if the budget is 0 to replace it with an empty string
    formValue.serviceBudget.forEach((budget) => {
      budget.budgetValue = budget.budgetValue === 0 ? "" : budget.budgetValue;
    });
  }

  // Function that will send to the database the new service that was created (publish and draft)
  async function handleDraftOrPublishClick(serviceStatus) {
    formatLocation();
    formatAudience();
    formatOrganisation();
    formatBudget();

    let organisationId = null;
    // OwnerOrganization in comments because we haven't device yet how to implement it.
    // if (formValue.ownerOrganization !== organisations[0].name) {
    //   organisationId = propOrganisations.find(
    //     (organisation) => formValue.ownerOrganisation === organisation.name
    //   ).id;
    // }

    const serviceOrder =
      data.rows[formValue.serviceApplication.replaceAll(" ", "_")].serviceIds
        .length;

    const argument = {
      serviceName: formValue.serviceName,
      serviceFocus: formValue.serviceFocus.name.replaceAll(" ", ""),
      organisationId: organisationId,
      serviceApplication: formValue.serviceApplication
        .replaceAll(" ", "_")
        .replace("&", "and"),
      serviceTime: formValue.serviceTime,
      serviceLink: formValue.serviceLink,
      serviceLocation: formValue.serviceLocation[0],
      serviceAudience: formValue.serviceAudience,
      serviceBudget: formValue.serviceBudget,
      serviceDescription: formValue.serviceDescription,
      serviceOutcomes: formValue.serviceOutcomes,
      precededService:
        formValue.precededService === "Select a service"
          ? ""
          : formValue.precededService,
      followedService:
        formValue.followedService === "Select a service"
          ? ""
          : formValue.followedService,

      servicePhaseRange: {
        startPhase: Service.replaceNumberToPhase(
          formValue.servicePhaseRange.startPhase
        ),
        endPhase: Service.replaceNumberToPhase(
          formValue.servicePhaseRange.endPhase
        ),
      },

      mapId: canvasProvider.mapId,
      serviceStatus: serviceStatus,
      serviceOrder: serviceOrder,
    };

    await createNewService(argument);
  }

  // Function that will check if everything is correct to send it to the database to avoid errors
  async function createNewService(data) {
    if (formValue.serviceName === "") {
      setIsError(true);
    } else {
      const res = await Service.createService(data);
      // Check if we created the service
      if (res.createService) {
        onClose();

        res.createService.isVisible = true;
        const newData = addServiceToData(res);

        setData(newData);
        ToastComponent(
          t("mapping.toast.success.service.created"),
          "success",
          5000
        );
      } else {
        ToastComponent(res, "error", 5000);
      }
    }
  }

  // Function that add the new service create to the canvas
  function addServiceToData(res) {
    // Format the list of services to correspond to the model of fetchedData
    const tempServices = Object.assign(data.services, {
      [res.createService.id]: {
        ...res.createService,
      },
    });

    // Add the service id to the corresponding row
    const tempRows = data.rows;
    tempRows[res.createService.serviceApplication].serviceIds.push(
      res.createService.id
    );

    services.push({
      id: res.createService.id,
      name: res.serviceName,
    });

    // Create new object to setState the fetchedData
    return {
      rowsOrder: data.rowsOrder,
      services: tempServices,
      rows: tempRows,
    };
  }

  async function handleUpdateClick(serviceStatus) {
    formatLocation();
    formatAudience();
    formatOrganisation();
    formatBudget();

    let organisationId = null;
    // if (formValue.ownerOrganization !== organisations[0].name) {
    //   // Retrieve the organisation id that we selected (modified or not)
    //   organisationId = propOrganisations.find(
    //     (organisation) => formValue.ownerOrganization === organisation.name
    //   ).id;
    // }

    let organisationIdWithoutModification;
    // if (serviceWithoutModification.ownerOrganization !== null) {
    //   // Retrieve the organisation id that was previously selected to disconnected it.
    //   organisationIdWithoutModification = propOrganisations.find(
    //     (organisation) =>
    //       serviceWithoutModification.ownerOrganization[0].ownerOrganization ===
    //       organisation.name
    //   ).id;
    // }

    let serviceOrder;

    // Check if we change of application type (row) if that is the case push the service at the last index, otherwise we are keeping the same.
    if (
      serviceWithoutModification.serviceApplication ===
      formValue.serviceApplication.replaceAll(" ", "_").replace("&", "and")
    ) {
      // Put the serviceOrder to 999 to avoid conflict when putting again in draft or published
      if (serviceStatus === "Archived") {
        serviceOrder = 999;
      } else if (serviceWithoutModification.serviceStatus === "Archived") {
        serviceOrder =
          data.rows[formValue.serviceApplication].serviceIds.length;
      } else {
        serviceOrder = serviceWithoutModification.serviceOrder;
      }
    } else {
      serviceOrder = data.rows[formValue.serviceApplication].serviceIds.length;
    }

    const argument = {
      id: serviceWithoutModification.id,

      // First tabs
      serviceName: formValue.serviceName,
      serviceApplication: formValue.serviceApplication
        .replaceAll(" ", "_")
        .replace("&", "and"),
      organisationId: organisationId,
      serviceFocus: formValue.serviceFocus.name.replaceAll(" ", ""),
      servicePhaseRange: {
        id: serviceWithoutModification.servicePhaseRange.id,
        startPhase: Service.replaceNumberToPhase(
          formValue.servicePhaseRange.startPhase
        ),
        endPhase: Service.replaceNumberToPhase(
          formValue.servicePhaseRange.endPhase
        ),
      },

      // Second tabs
      serviceTime: {
        startTime: formValue.startTime,
        endTime: formValue.endTime,
      },
      serviceLink: formValue.serviceLink,
      serviceLocation: {
        ...formValue.serviceLocation,
        id: serviceWithoutModification.serviceLocation.id,
      },
      serviceAudience: formValue.serviceAudience,
      serviceBudget: formValue.serviceBudget,

      // Third tabs
      serviceDescription: formValue.serviceDescription,
      serviceOutcomes: formValue.serviceOutcomes,
      precededService:
        formValue.precededService ===
        t("mapping.canvas.form.service.select.service")
          ? ""
          : formValue.precededService,
      followedService:
        formValue.followedService ===
        t("mapping.canvas.form.service.select.service")
          ? ""
          : formValue.followedService,

      // Others parameters hidden from the user
      mapId: canvasProvider.mapId,
      serviceStatus: serviceStatus,
      serviceOrder: serviceOrder,

      // Parameters to be able to filter afterwards
      serviceWithoutModification: serviceWithoutModification,
      organisationIdWithoutModification: organisationIdWithoutModification,
    };

    await updateService(argument);
  }

  async function updateService(data) {
    if (formValue.serviceName === "") {
      setIsError(true);
    } else {
      const res = await Service.updateService(data);
      // Check if we update the service
      if (res.updateService) {
        res.updateService.isVisible = true;
        const newData = await updateServiceToData(res.updateService);
        setData(newData);
        onClose();

        ToastComponent(
          t("mapping.toast.success.service.updated"),
          "success",
          5000
        );
      } else {
        ToastComponent(res, "error", 5000);
      }
    }
  }

  async function updateServiceToData(updatedService) {
    // Format the list of services to correspond to the model of fetchedData
    const tempServices = Object.assign(data.services, {
      [updatedService.id]: {
        ...updatedService,
      },
    });

    // Add the service id to the corresponding row
    const tempRows = data.rows;

    if (
      serviceWithoutModification.serviceApplication ===
      updatedService.serviceApplication
    ) {
      if (updatedService.serviceStatus === "Archived") {
        // Remove the element in the same row
        tempRows[updatedService.serviceApplication].serviceIds.splice(
          serviceWithoutModification.serviceOrder,
          1
        );

        await updateAllServices(tempServices);
      } else {
        // Remove the element in the same row to put it the updated version.
        tempRows[updatedService.serviceApplication].serviceIds.splice(
          serviceWithoutModification.serviceOrder,
          1,
          updatedService.id
        );
      }
    } else {
      // Remove the element in the original row.
      tempRows[serviceWithoutModification.serviceApplication].serviceIds.splice(
        serviceWithoutModification.serviceOrder,
        1
      );
      if (updatedService.serviceStatus !== "Archived") {
        // Add it at the last index of the new row.
        tempRows[updatedService.serviceApplication].serviceIds.push(
          updatedService.id
        );
      }
      await updateAllServices(tempServices);
    }

    // Create new object to setState the fetchedData
    return {
      rowsOrder: data.rowsOrder,
      services: tempServices,
      rows: tempRows,
    };
  }

  function updateAllServices(tempServices) {
    // Update all the others services because their serviceOrder have changed
    const values = Object.values(tempServices);
    let error;
    for (const service of values) {
      if (
        service.serviceApplication ===
          serviceWithoutModification.serviceApplication &&
        service.serviceOrder > serviceWithoutModification.serviceOrder
      ) {
        service.serviceOrder -= 1;
        const data = {
          serviceOrder: service.serviceOrder,
          serviceApplication: service.serviceApplication,
        };

        Service.updateServiceOrderAndApplicationType(
          service.id,
          data
          // eslint-disable-next-line no-loop-func
        ).catch((e) => (error = e));

        //Stop the loop if we have an error
        if (error) {
          ToastComponent(t("mapping.toast.error"), "error");
          break;
        }
      }
    }
  }

  // Set to null when we have no location selected.
  function formatLocation() {
    if (formValue.serviceLocation.continent === "Continent") {
      formValue.serviceLocation.continent = null;
    }
    if (formValue.serviceLocation.country === "Country") {
      formValue.serviceLocation.country = null;
    }
    if (formValue.serviceLocation.region === "Region") {
      formValue.serviceLocation.region = null;
    }
    if (formValue.serviceLocation.city === "City") {
      formValue.serviceLocation.city = null;
    }
  }

  // Set to null when we have no audience selected.
  function formatAudience() {
    if (formValue.serviceAudience === "Audience") {
      formValue.serviceAudience = null;
    }
  }

  // Set to null when we have no organisation selected.
  function formatOrganisation() {
    if (formValue.ownerOrganisation === "Organisation") {
      formValue.ownerOrganisation = null;
    }
  }

  function formatBudget() {
    formValue.serviceBudget.forEach((budget) => {
      budget.budgetValue =
        budget.budgetValue === "" ? 0 : parseFloat(budget.budgetValue);
    });
  }

  function timeZoneConvertor(date, timeZone) {
    return new Date(
      (typeof date === "string" ? new Date(date) : date).toLocaleString(
        "en-US",
        { timeZone: timeZone }
      )
    );
  }

  return (
    <AlertDialog
      size="2xl"
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogBody paddingY={6}>
            <HStack alignItems="flex-start" zIndex={11}>
              <FormControl isInvalid={isError}>
                <InputComponent
                  isRequired={true}
                  initialValue={formValue.serviceName}
                  placeholder={t("mapping.canvas.form.service.name")}
                  onChange={(serviceName) => {
                    formValue.serviceName = serviceName;
                    if (serviceName === "") {
                      setIsError(true);
                    } else {
                      setIsError(false);
                    }
                  }}
                />
                {isError && (
                  <FormErrorMessage>
                    {t("mapping.canvas.form.service.name.error")}
                  </FormErrorMessage>
                )}
              </FormControl>
              <ServiceFocusComponent
                serviceFocus={formValue.serviceFocus}
                onChange={(serviceFocus) =>
                  (formValue.serviceFocus = serviceFocus)
                }
              />
            </HStack>
            <Box zIndex={10}>
              <ServiceTabs
                organisations={organisations}
                applicationTypeButtons={applicationTypeButtons}
                audiences={audiences}
                formValue={formValue}
              />
            </Box>
            <Flex paddingTop={6}>
              {isEditing ? (
                <Button
                  variant="greyGhost"
                  leftIcon={<Archive color={"blackAlpha.600"} size="20px" />}
                  onClick={async () => {
                    await handleUpdateClick("Archived");
                  }}
                >
                  {t("mapping.canvas.form.archive.button")}
                </Button>
              ) : (
                <Button
                  variant="greyGhost"
                  color={"blackAlpha.600"}
                  onClick={onClose}
                >
                  {t("common.cancel")}
                </Button>
              )}
              <Spacer />
              {isEditing ? (
                <Button variant="greyGhost" onClick={onClose}>
                  {t("common.cancel")}
                </Button>
              ) : (
                <Box />
              )}
              {isEditing ? (
                <Button
                  marginX={5}
                  variant="outline"
                  onClick={async () => {
                    await handleUpdateClick("Draft");
                  }}
                >
                  {t("mapping.canvas.form.unpublished.button")}
                </Button>
              ) : (
                <Button
                  marginRight={5}
                  variant="outline"
                  onClick={() => handleDraftOrPublishClick("Draft")}
                >
                  {t("mapping.canvas.form.draft.button")}
                </Button>
              )}
              {isEditing ? (
                <Button
                  onClick={async () => {
                    await handleUpdateClick("Published");
                  }}
                >
                  {t("mapping.canvas.form.save.button")}
                </Button>
              ) : (
                <Button onClick={() => handleDraftOrPublishClick("Published")}>
                  {t("mapping.canvas.form.publish.button")}
                </Button>
              )}
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

ServiceForm.propTypes = {
  propOrganisations: PropTypes.array,
  serviceWithoutModification: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  cancelRef: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ServiceForm;
