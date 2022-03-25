import React from "react";

import { useDisclosure, Button, Box, Image, Container } from "@chakra-ui/react";

import ModalComponent from "../../basic/ModalComponent";

const ServiceConfirmation = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnClick = () => {
    onOpen();
    props.onClick();
  };

  return (
    <>
      <Button className={props.buttonClassName} onClick={handleOnClick}>
        {props.buttonText}
      </Button>
      <ModalComponent isOpen={isOpen} onClose={onClose}>
        <Box mt="91px">
          <Image style={props.style} src={props.image} alt="image" />
        </Box>
        <Box mt="60px">
          <h1 className="md-msg">{props.titleText}</h1>
        </Box>
        <Container mt="24px" width="507px" height="44px" alignItems="center">
          <h1 className="md-txt">{props.contentText}</h1>
        </Container>
      </ModalComponent>
    </>
  );
};

export default ServiceConfirmation;
