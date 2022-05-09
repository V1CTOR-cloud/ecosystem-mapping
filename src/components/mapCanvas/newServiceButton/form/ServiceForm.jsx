import React, { useContext } from "react";

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

import { greyTextColor, mediumPadding } from "../../../../helper/constant";
import InputComponent from "../../../basic/inputs/input/inputComponent/InputComponent";
import ServiceFocusComponent from "./applicationTypeComponent/ServiceFocusComponent";
import ServiceTabs from "./tabs/ServiceTabs";
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import { MapContext } from "../../../../pages/MapCanvasPage";

function ServiceForm(props) {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useContext(MapContext);

  //TODO render 4 time, check why (one is because we useEffect to clear)

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
              <FormControl isInvalid={props.isError}>
                <InputComponent
                  isRequired={true}
                  value={formValues["serviceName"]}
                  placeholder={t("mapping.canvas.form.service.name")}
                  handleOnChange={(event) =>
                    setFormValues(
                      event.target.value,
                      "serviceName",
                      "serviceNameChange"
                    )
                  }
                />
                {props.isError ? (
                  <FormErrorMessage>
                    {t("mapping.canvas.form.service.name.error")}
                  </FormErrorMessage>
                ) : (
                  <Box />
                )}
              </FormControl>
              <ServiceFocusComponent />
            </HStack>
            <Box zIndex={10}>
              <ServiceTabs
                organisations={props.organisations}
                applicationTypeButtons={props.applicationTypeButtons}
                audiences={props.audiences}
                services={props.services}
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
                    props.handleIsEditingChange(false);
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
                    props.handleIsEditingChange(false);
                    console.log("Unpublished clicked");
                  }}
                />
              ) : (
                <ButtonComponent
                  padding={`0 ${mediumPadding} 0 0`}
                  buttonText={t("mapping.button.draft")}
                  isWithoutBorder={true}
                  onClick={() => props.handleDraftOrPublishClick("Draft")}
                />
              )}
              {props.isEditing ? (
                <ButtonComponent
                  buttonText={"Save"}
                  isPrimary={true}
                  //TODO function to update the service
                  onClick={() => {
                    props.handleIsEditingChange(false);
                    props.handleUpdateClick("Published");
                  }}
                />
              ) : (
                <ButtonComponent
                  buttonText={t("mapping.button.publish")}
                  isPrimary={true}
                  onClick={() => props.handleDraftOrPublishClick("Published")}
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
