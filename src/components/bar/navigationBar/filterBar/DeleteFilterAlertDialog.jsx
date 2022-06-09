import React, { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Spacer,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import ButtonComponent from "../../../basic/buttons/ButtonComponent";

function DeleteFilterAlertDialog(props) {
  const { isOpen, onClose, handleDeleteSavedFilter } = props;
  const { t } = useTranslation();
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {t("mapping.alert.dialog.delete.saved.filter.title")}
          </AlertDialogHeader>

          <AlertDialogBody>
            {t("mapping.alert.dialog.delete.saved.filter.body")}
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonComponent
              onClick={onClose}
              buttonText={t("common.cancel")}
              isWithoutBorder={true}
              color={"blackAlpha.700"}
            />
            <Spacer />
            <ButtonComponent
              onClick={handleDeleteSavedFilter}
              buttonText={t("common.delete")}
              isWithoutBorder={true}
              color={"white"}
              bg={"red.500"}
              hover={"red.300"}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

DeleteFilterAlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDeleteSavedFilter: PropTypes.func.isRequired,
};

export default DeleteFilterAlertDialog;
