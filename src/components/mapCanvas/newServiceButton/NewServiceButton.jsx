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
        isOpen={props.isOpen}
        onClose={props.onClose}
        cancelRef={cancelRef}
        isError={props.isError}
        fetchedData={props.fetchedData}
        organisations={props.organisations}
        audiences={props.audiences}
        services={props.services}
        locations={props.locations}
        mapId={props.mapId}
      />
    </React.Fragment>
  );
}

export default NewServiceButton;
