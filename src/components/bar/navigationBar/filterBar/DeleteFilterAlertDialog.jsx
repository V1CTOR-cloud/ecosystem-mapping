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
import ButtonComponent from "../../../basic/Buttons/ButtonComponent";
import {
  greyColor,
  redColor,
  redHoverColor,
  whiteColor,
} from "../../../../helper/constant";

function DeleteFilterAlertDialog(props) {
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
            Delete filter view
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to remove this filter view?
          </AlertDialogBody>

          <AlertDialogFooter>
            <ButtonComponent
              onClick={props.onClose}
              buttonText="Cancel"
              isWithoutBorder={true}
              color={greyColor}
            />
            <Spacer />
            <ButtonComponent
              onClick={props.handleDeleteSavedFilter}
              buttonText="Delete"
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
