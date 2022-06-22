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

import InputComponent from "../../basic/inputs/input/inputComponent/InputComponent";
import LabelWithTooltip from "../../basic/labelWithTooltip/LabelWithTooltip";
import LabeledMultilineInputComponent from "../../basic/inputs/input/multilineInputComponent/LabeledMultilineInputComponent";
import { AppProvider } from "../../../App";
import MultiIndustryPicker from "../../basic/picker/industryPicker/MultiIndustryPicker";
import MultiLocationPicker from "../../basic/picker/LocationPicker/MultiLocationPicker";

function MapForm(props) {
  const { locationsList, industriesList, isOpen, onClose } = props;
  const cancelRef = useRef();
  const appProvider = useContext(AppProvider);
  const formValues = {
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
  const [isError, setIsError] = useState(false);

  function handleCreateMap() {
    console.log(formValues.title);
    if (formValues.title === "") {
      setIsError(true);
    } else {
      setIsError(false);
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
            New Ecosystem Map
          </Text>
          <Box marginY={3} h="2px" bg="blackAlpha.300" />
        </ModalHeader>
        <ModalBody>
          <FormControl isInvalid={isError}>
            <LabelWithTooltip
              label={"Title"}
              tooltipText={"This will be the name of your ecosystem map"}
              tooltipAriaLabel={"Title"}
            />
            <InputComponent
              isRequired={true}
              initialValue={formValues.title}
              placeholder={"Title"}
              onChange={(value) => {
                formValues.title = value;
                if (value === "") {
                  setIsError(true);
                } else {
                  setIsError(false);
                }
              }}
            />
            {isError && (
              <FormErrorMessage>
                The title is mandatory, please enter a title.
              </FormErrorMessage>
            )}
          </FormControl>
          <Box paddingY={5}>
            <LabeledMultilineInputComponent
              label={"Description"}
              tooltipText={"This will be the description of your ecosystem map"}
              tooltipAriaLabel={"Description"}
              initialValue={formValues.description}
              placeholder={"Description"}
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
          <Button onClick={handleCreateMap}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MapForm;

MapForm.propTypes = {
  /**
   * Mainly for storybook, this argument allow to pass a list of locations in the case that the appProvider was not passed.
   */
  locationsList: PropTypes.array,
  /**
   * Mainly for storybook, this argument allow to pass a list of industries in the case that the appProvider was not passed.
   */
  industriesList: PropTypes.array,
  /**
   * Boolean that control the modal to know if he is open or not.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Function that handle automaticaly the closing of the modal.
   */
  onClose: PropTypes.func.isRequired,
};
