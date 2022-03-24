import React, { useEffect } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Image,
  Grid,
  Container,
} from "@chakra-ui/react";

import imgSource from "../../assets/images/Save time and effort 1 (1).png";

const saveDraftImg = {
  height: "auto",
  width: "399.4375915527344px",
  margin: "0 auto",
  top: "55.108154296875px",
  borderRadius: "0px",
  align: "center",
};

const SaveAsDraftConfirm = ({ draftStatus, res, saveDraft }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (res) {
      onOpen(false);
    }
  }, [onOpen, res]);

  return (
    <>
      <Button
        mr="32px"
        className="btn-save"
        onClick={() => {
          onOpen(true);
          draftStatus("Draft");
        }}
      >
        {saveDraft}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="md-ntf">
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid>
              <Box mt="91px">
                <Image style={saveDraftImg} src={imgSource} alt="image" />
              </Box>
              <Box mt="60px">
                <h1 className="md-msg">
                  Your Service has been saved in Draft!
                </h1>
              </Box>
              <Container
                width="507px"
                height="44px"
                mt="24px"
                alignItems="center"
              >
                <h1 className="md-txt">
                  You will be able to see the service icon on the map. When
                  you're ready to publish, just click on the icon, scroll down
                  and click publish.
                </h1>
              </Container>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SaveAsDraftConfirm;
