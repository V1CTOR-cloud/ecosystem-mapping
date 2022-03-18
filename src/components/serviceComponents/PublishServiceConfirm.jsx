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

import imgSource from "../../assets/images/service published graphic (1).png";

const PublishServiceConfirm = ({ publish, publishStatus, res }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const publishConfirmImg = {
    height: "auto",
    width: "383.09px",
    margin: "0 auto",
    top: "55.86px",
    align: "center",
  };

  useEffect(() => {
    if (res) {
      onOpen(false);
    }
  }, [onOpen, res]);

  return (
    <>
      <Button
        className="btn-pbh"
        onClick={() => {
          onOpen(true);
          publishStatus("Published");
        }}
      >
        {publish}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="md-ntf">
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid>
              <Box mt="91px">
                <Image style={publishConfirmImg} src={imgSource} alt="image" />
              </Box>
              <Box mt="60px">
                <h1 className="md-msg">Your Service has been published!</h1>
              </Box>
              <Container
                mt="24px"
                width="507px"
                height="44px"
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

export default PublishServiceConfirm;