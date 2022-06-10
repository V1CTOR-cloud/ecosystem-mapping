import React, { useRef } from "react";

import { AddIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import ButtonComponent from "../../basic/buttons/ButtonComponent";
import ServiceForm from "./form/ServiceForm";

function NewServiceButton(props) {
  const {
    onOpen,
    isOpen,
    onClose,
    fetchedData,
    organisations,
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
        padding={`0 0 0 ${6}`}
        buttonText={t("mapping.navigation.bar.new.service.button")}
        icon={<AddIcon marginRight={2} color={"white"} w="15px" h="15px" />}
        onClick={onOpen}
      />
      <ServiceForm
        isEditing={false}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        fetchedData={fetchedData}
        propOrganisations={organisations}
        services={services}
        locations={locations}
        mapId={mapId}
      />
    </React.Fragment>
  );
}

NewServiceButton.propTypes = {
  organisations: PropTypes.array,
  locations: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  mapId: PropTypes.string.isRequired,
  fetchedData: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default NewServiceButton;
