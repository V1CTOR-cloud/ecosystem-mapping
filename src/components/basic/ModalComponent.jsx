import React from "react";

import {
  chakra,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

const ModalContentStyled = chakra(ModalContent, {
  baseStyle: {
    height: "640px",
    maxWidth: "720px !important",
    borderRadius: "4px",
  },
});

//Component that display a Chakra UI modal with a close button and a content that is the children passed as arguments.
const ModalComponent = (props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContentStyled>
        <ModalCloseButton />
        <ModalBody pb={6}>{props.children}</ModalBody>
      </ModalContentStyled>
    </Modal>
  );
};

export default ModalComponent;
