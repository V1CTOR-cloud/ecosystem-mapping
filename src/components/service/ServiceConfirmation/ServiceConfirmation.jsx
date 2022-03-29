import React from "react";

import { Box, Image, useDisclosure } from "@chakra-ui/react";
import styled from "styled-components";

import ModalComponent from "../../basic/ModalComponent";
import ButtonComponent from "../../basic/Button";

const TitleModal = styled.h1`
  font-family: Ubuntu, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 45px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #222c2f;
`;

const ContentModal = styled.h1`
  font-family: Ubuntu, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  color: #222c2f;
`;

// Component that display a button, if clicked, it will show a modal with a title, content and image.
// Used mainly for: publishing a service; saving in draft a service.
const ServiceConfirmation = (props) => {
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
        <Box mt="90px">
          <Image style={props.style} src={props.image} alt="image" />
        </Box>
        <Box mt="60px">
          <TitleModal>{props.titleText}</TitleModal>
        </Box>
        <ContentModal>{props.contentText}</ContentModal>
      </ModalComponent>
    </>
  );
};

export default ServiceConfirmation;
