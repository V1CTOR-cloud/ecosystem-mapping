import React from "react";
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
import "../../assets/fonts/fonts.css";
import Service from "../../service/RegionServices";
import { useTranslation } from 'react-i18next';

const DeleteModal = (props) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const toast = useToast();
  const onConfirm = () => {
    Service.DeleteEcoMap(props.id).then((res) => {
      setIsOpen(false);
      toast({
        title: (t('startup.toast.delete')),
        description: (t('startup.toast.delete.map.message')),
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
        {t('startup.list.map.page.map.card.delete')}
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
             {t('startup.popup.delete.map.heading')}
            </AlertDialogHeader>

            <AlertDialogBody>
              {t('startup.popup.delete.map.content')}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t('startup.popup.ecosystem.map.button.cancel')}
              </Button>
              <Button colorScheme="red" ml={3} onClick={onConfirm}>
                {t('startup.list.map.page.map.card.delete')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export {DeleteModal}
