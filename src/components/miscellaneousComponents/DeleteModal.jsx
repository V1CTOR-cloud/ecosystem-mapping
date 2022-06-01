import React, { useState, useRef } from "react";

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogContent,
  Button,
  AlertDialogBody,
  AlertDialogFooter,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import Service from "../../service/RegionServices";
import "../../assets/fonts/fonts.css";

const DeleteModal = (props) => {
  const { t } = useTranslation();
  const toast = useToast();
  const cancelRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleConfirm = () => {
    Service.DeleteEcoMap(props.id).then(() => {
      setIsOpen(false);
      toast({
        title: t("startup.toast.delete"),
        description: t("startup.toast.delete.map.message"),
        status: "warning",
        duration: 9000,
        position: "top-right",
        isClosable: true,
      });
      props.notifyParent();
    });
  };

  return (
    <>
      <MenuItem colorScheme="red" onClick={() => setIsOpen(true)}>
        {t("startup.list.map.page.map.card.delete")}
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("startup.popup.delete.map.heading")}
            </AlertDialogHeader>
            <AlertDialogBody>
              {t("startup.popup.delete.map.content")}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleClose}>
                {t("startup.popup.ecosystem.map.button.cancel")}
              </Button>
              <Button colorScheme="red" ml={3} onClick={handleConfirm}>
                {t("startup.list.map.page.map.card.delete")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteModal;
