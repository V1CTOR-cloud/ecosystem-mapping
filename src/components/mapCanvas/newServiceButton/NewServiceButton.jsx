import React, { useRef } from "react";

import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import ServiceForm from "./form/ServiceForm";

function NewServiceButton(props) {
  const { onOpen, isOpen, onClose, organisations } = props;
  const cancelRef = useRef();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Button
        leftIcon={<AddIcon marginRight={2} color={"white"} w="15px" h="15px" />}
        onClick={onOpen}
      >
        {t("mapping.navigation.bar.new.service.button")}
      </Button>
      <ServiceForm
        isEditing={false}
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        propOrganisations={organisations}
      />
    </React.Fragment>
  );
}

NewServiceButton.propTypes = {
  organisations: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default NewServiceButton;
