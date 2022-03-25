import React from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

//Component that display a Chakra UI modal with a close button and a content that is the children passed as arguments.
const ModalComponent = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent className="md-ntf">
        <ModalCloseButton />
        <ModalBody pb={6}>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
