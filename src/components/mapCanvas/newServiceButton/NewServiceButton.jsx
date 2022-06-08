import React, { useRef } from "react";

import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import ButtonComponent from "../../basic/buttons/ButtonComponent";
import {
  mediumPadding,
  verySmallPadding,
  whiteColor,
} from "../../../helper/constant";
import ServiceForm from "./form/ServiceForm";
import PropTypes from "prop-types";

function NewServiceButton(props) {
  const {
    onOpen,
    isOpen,
    onClose,
    isError,
    fetchedData,
    organisations,
    audiences,
    services,
    locations,
    mapId,
  } = props;
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
        onClick={onOpen}
      />
      <ServiceForm
        isEditing={false}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        isError={isError}
        fetchedData={fetchedData}
        organisations={organisations}
        audiences={audiences}
        services={services}
        locations={locations}
        mapId={mapId}
      />
    </React.Fragment>
  );
}

NewServiceButton.propTypes = {
  isError: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  mapId: PropTypes.string.isRequired,
  organisations: PropTypes.array.isRequired,
  audiences: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  fetchedData: PropTypes.object.isRequired,
  services: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default NewServiceButton;
