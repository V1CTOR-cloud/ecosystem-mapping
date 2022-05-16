import React, { useRef } from "react";

import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import ButtonComponent from "../../basic/Buttons/ButtonComponent";
import {
  mediumPadding,
  verySmallPadding,
  whiteColor,
} from "../../../helper/constant";
import ServiceForm from "./form/ServiceForm";

function NewServiceButton(props) {
  const cancelRef = useRef();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <ButtonComponent
        isPrimary={true}
        padding={`0 0 0 ${mediumPadding}`}
        buttonText={t("mapping.navigation.bar.new.service.button")}
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
        isEditing={false}
        handleIsEditingChange={props.handleIsEditingChange}
        isOpen={props.isOpen}
        onClose={props.onClose}
        cancelRef={cancelRef}
        isError={props.isError}
        organisations={props.organisations}
        applicationTypeButtons={props.applicationTypeButtons}
        audiences={props.audiences}
        services={props.services}
        mapId={props.mapId}
      />
    </React.Fragment>
  );
}

export default NewServiceButton;
