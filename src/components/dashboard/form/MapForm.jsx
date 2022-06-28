import React, { useContext, useRef, useState } from "react";

import {
  Text,
  Box,
  FormControl,
  Button,
  FormErrorMessage,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";

import InputComponent from "../../basic/inputs/input/inputComponent/InputComponent";
import LabelWithTooltip from "../../basic/labelWithTooltip/LabelWithTooltip";
import LabeledMultilineInputComponent from "../../basic/inputs/input/multilineInputComponent/LabeledMultilineInputComponent";
import { AppProvider } from "../../../App";
import MultiIndustryPicker from "../../basic/picker/industryPicker/MultiIndustryPicker";
import MultiLocationPicker from "../../basic/picker/locationPicker/MultiLocationPicker";
import { Authentication } from "../../../service/authentication";

function MapForm(props) {
  const {
    locationsList,
    industriesList,
    isOpen,
    onClose,
    isEdition,
    initialFormValues,
    onCreateMap,
    onEditMap,
  } = props;
  const cancelRef = useRef();
  const { t } = useTranslation();
  const appProvider = useContext(AppProvider);
  const [isError, setIsError] = useState(false);
  const formValues = isEdition
    ? {
        title: initialFormValues.title,
        description: initialFormValues.description,
        locations: initialFormValues.location,
        industries: initialFormValues.industry,
      }
    : {
        title: "",
        description: "",
        locations: [
          {
            continent: null,
            country: null,
            region: null,
            city: null,
          },
        ],
        industries: [
          {
            mainIndustry: null,
            subIndustry: null,
          },
        ],
      };

  function handleCreateMap() {
    if (formValues.title === "") {
      setIsError(true);
    } else {
      setIsError(false);
      const data = {
        title: formValues.title,
        mapStatus: "Published",
        description: "",
        owner: {
          connect: {
            id: Authentication.getCurrentUser().id,
          },
        },
        creation: moment(),
        lastModification: moment(),
        industry: {
          create: formValues.industries,
        },
        location: {
          create: formValues.locations,
        },
      };

      onCreateMap(data);
    }
  }

  function handleEditMap() {
    if (formValues.title === "") {
      setIsError(true);
    } else {
      setIsError(false);

      const updateIndustries = [];
      const updateLocations = [];

      formValues.industries.forEach((industry) => {
        updateIndustries.push({
          where: { id: industry.id === undefined ? "undefined" : industry.id },
          data: {
            create: {
              mainIndustry: industry.mainIndustry,
              subIndustry: industry.subIndustry,
            },
            update: {
              mainIndustry: industry.mainIndustry,
              subIndustry: industry.subIndustry,
            },
          },
        });
      });

      formValues.locations.forEach((location) => {
        updateLocations.push({
          where: { id: location.id === undefined ? "undefined" : location.id },
          data: {
            create: {
              continent: location.continent,
              country: location.country,
              region: location.region,
              city: location.city,
            },
            update: {
              continent: location.continent,
              country: location.country,
              region: location.region,
              city: location.city,
            },
          },
        });
      });

      const data = {
        id: initialFormValues.id,
        title: formValues.title,
        mapStatus: "Published",
        description: formValues.description,
        lastModification: moment(),
        industry: {
          upsert: updateIndustries,
        },
        location: {
          upsert: updateLocations,
        },
      };

      onEditMap(data);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      leastDestructiveRef={cancelRef}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="xl" align="center">
            {isEdition
              ? t("mapping.dashboard.form.title.edition")
              : t("mapping.dashboard.form.title.creation")}
          </Text>
          <Box marginY={3} h="2px" bg="blackAlpha.300" />
        </ModalHeader>
        <ModalBody>
          <FormControl isInvalid={isError}>
            <LabelWithTooltip
              label={t("mapping.dashboard.form.title.input")}
              tooltipText={t("mapping.dashboard.form.title.input.tooltip")}
              tooltipAriaLabel={t("mapping.dashboard.form.title.input")}
            />
            <InputComponent
              isRequired={true}
              initialValue={formValues.title}
              placeholder={t("mapping.dashboard.form.title.input")}
              onChange={(value) => {
                formValues.title = value;
                if (value === "") {
                  setIsError(true);
                } else {
                  setIsError(false);
                }
              }}
            />
            {formValues.title === "" && (
              <FormErrorMessage>
                {t("mapping.dashboard.form.title.input.error")}
              </FormErrorMessage>
            )}
          </FormControl>
          <Box paddingY={5}>
            <LabeledMultilineInputComponent
              label={t("mapping.dashboard.form.description.input")}
              tooltipText={t(
                "mapping.dashboard.form.description.input.tooltip"
              )}
              tooltipAriaLabel={t("mapping.dashboard.form.description.input")}
              initialValue={formValues.description}
              placeholder={t("mapping.dashboard.form.description.input")}
              onChange={(value) => (formValues.description = value)}
            />
          </Box>
          <Box paddingBottom={5}>
            <MultiLocationPicker
              initialValues={formValues.locations}
              onChange={(value) => (formValues.locations = value)}
              locationsList={
                appProvider.locations ? appProvider.locations : locationsList
              }
            />
          </Box>
          <MultiIndustryPicker
            initialValues={formValues.industries}
            onChange={(value) => (formValues.industries = value)}
            industriesList={
              appProvider.industries ? appProvider.industries : industriesList
            }
          />
        </ModalBody>

        <ModalFooter>
          <Button marginRight={3} variant="greyGhost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={isEdition ? handleEditMap : handleCreateMap}>
            {isEdition
              ? t("mapping.dashboard.form.save.button")
              : t("mapping.dashboard.form.create.button")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MapForm;

MapForm.defaultProps = {
  onCreateMap: (formattedData) => console.log(formattedData),
  onEditMap: (formattedData) => console.log(formattedData),
  isEdition: false,
  initialFormValues: {},
};

MapForm.propTypes = {
  /**
   * Boolean that determine if we are in edition mode or creation mode. Trigger the field to be filled or empty.
   */
  isEdition: PropTypes.bool,
  /**
   * Mainly for storybook, this argument allow to pass a list of locations in the case that the appProvider was not passed.
   */
  locationsList: PropTypes.array,
  /**
   * Mainly for storybook, this argument allow to pass a list of industries in the case that the appProvider was not passed.
   */
  industriesList: PropTypes.array,
  /**
   * If we are in edition mode this argument will contain all the values of the different fields.
   */
  initialFormValues: PropTypes.object,
  /**
   * Function that allow to create a map in the project and update the dashboard at the same time.
   */
  onCreateMap: PropTypes.func,
  /**
   * Function that allow to edit a map in the project and update the dashboard at the same time.
   */
  onEditMap: PropTypes.func,
  /**
   * Boolean that control the modal to know if he is open or not.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Function that handle automatically the closing of the modal.
   */
  onClose: PropTypes.func.isRequired,
};
