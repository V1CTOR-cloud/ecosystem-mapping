import React from "react";

import { useDisclosure } from "@chakra-ui/react";

import ModalComponent from "../../basic/ModalComponent";
import ButtonComponent from "../../basic/Button";

// Component that display a button, if clicked, it will show a modal with a title, content and image.
// Used mainly for: publishing a service; saving in draft a service.
const ButtonOpenModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = async () => {
    const hasNoError = await props.onClick();
    if (hasNoError) {
      onOpen();
    }
  };

  return (
    <>
      <ButtonComponent
        isPrimary={props.isPrimaryButton}
        onClick={handleOnClick}
        text={props.textButton}
        margin={props.marginButton}
      />
      <ModalComponent isOpen={isOpen} onClose={onClose}>
        {props.children}
      </ModalComponent>
    </>
  );
};

export default ButtonOpenModal;
