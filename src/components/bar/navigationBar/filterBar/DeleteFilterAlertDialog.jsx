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

import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import {
  greyColor,
  redColor,
  redHoverColor,
  whiteColor,
} from "../../../../helper/constant";

function DeleteFilterAlertDialog(props) {
  const { t } = useTranslation();
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
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
              onClick={props.onClose}
              buttonText={t("common.cancel")}
              isWithoutBorder={true}
              color={greyColor}
            />
            <Spacer />
            <ButtonComponent
              onClick={props.handleDeleteSavedFilter}
              buttonText={t("common.delete")}
              isWithoutBorder={true}
              color={whiteColor}
              bg={redColor}
              hover={redHoverColor}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default DeleteFilterAlertDialog;
