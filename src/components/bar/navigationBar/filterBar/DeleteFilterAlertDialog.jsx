import React, { useRef } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

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
            <Button
              variant="ghost"
              color={"blackAlpha.700"}
              _hover={{ bg: "blackAlpha.200" }}
              _active={{ bg: "blackAlpha.400" }}
              onClick={onClose}
            >
              {t("common.cancel")}{" "}
            </Button>
            <Spacer />
            <Button
              bg={"red.500"}
              _hover={{ bg: "red.300" }}
              _active={{ bg: "red.600" }}
              onClick={handleDeleteSavedFilter}
            >
              {t("common.delete")}
            </Button>
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
