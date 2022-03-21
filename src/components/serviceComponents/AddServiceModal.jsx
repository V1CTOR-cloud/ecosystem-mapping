import React, { useCallback, useState } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import {
  Box,
  Button,
  Grid,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import PublishServiceConfirm from "../serviceComponents/PublishServiceConfirm";
import SaveAsDraftConfirm from "../serviceComponents/SaveAsDraftConfirm";
import ServiceBasicInfo from "./ServiceBasicInfo";
import ServiceAvailability from "./ServiceAvailability";
import { ServiceInfo } from "./ServiceInfo";
import { TagComment } from "./TagComment";

const AddServiceModal = ({ sendData, mapId, createNewServiceCallback }) => {
  const { t } = useTranslation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [basicInfo, setBasicInfo] = useState(["", "", "", ""]);
  const [serviceAvailability, setServiceAvailability] = useState([]);
  const [serviceInfo, setServiceInfo] = useState([]);
  const [comments, setComments] = useState("");
  const [res, setRes] = useState(false);
  const [tags, setTags] = useState([]);

  const handleToastCall = () => {
    toast({
      title: t("startup.toast.service.name.error"),
      description: t("startup.toast.service.name.message"),
      status: "error",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleBasicInfoChange = (a, b, c, d) => {
    setRes(false);
    setBasicInfo([a, b, c, d]);
  };

  const handleServiceAvailabilityChange = (data) => {
    setServiceAvailability(data);
  };

  const handleServiceInfoChange = (data) => {
    setServiceInfo(data);
  };

  const handleCommentCallback = (data) => {
    setComments(data.comment);
  };

  const handleTagCallback = (data) => {
    setTags(data.tags);
  };

  const SendFinalData = (serviceStatus) => {
    if (createNewServiceCallback) {
      let finalData = {
        basicService: basicInfo,
        serviceAvailability: serviceAvailability,
        serviceInfo: serviceInfo,
        tags: tags,
        comments: comments,
        mapID: mapId,
        serviceStatus: serviceStatus,
      };
      createNewServiceCallback(finalData);
      setBasicInfo(["", "", "", ""]);
      setRes(true);
      sendData(true);
      setTimeout(() => {
        onOpen(false);
        onClose(true);
      }, 1000);
    }
    if (res.message !== undefined) {
      handleToastCall();
    }
  };

  return (
    <Grid>
      <div>
        <Button
          className="add-service-btn fl-right"
          mt="5px"
          onClick={() => onOpen(true)}
        >
          {t("startup.home.page.header.add.service.button")}
        </Button>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent className="mod-service-add-edit" maxW="920px" mt="80px">
          <ModalHeader className="mod-header" b="0">
            {t("startup.popup.service.content.heading.create")}
          </ModalHeader>
          <ModalCloseButton />
          <Text className="mod-subheading">
            {t("startup.popup.service.content.heading.create.text")}
          </Text>
          <Accordion defaultIndex={[0]} allowToggle>
            <AccordionItem mt="5" border="0px" boxShadow="md">
              <h2>
                <AccordionButton>
                  <Box flex="1" className="acc-header">
                    {t(
                      "startup.popup.service.content.heading.basic.information"
                    )}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="acc-panel">
                <ServiceBasicInfo
                  basicInfoData={(a, b, c, d) => {
                    handleBasicInfoChange(a, b, c, d);
                  }}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem allowToggle mt="5" border="0px" boxShadow="md">
              <h2>
                <AccordionButton border="0px">
                  <Box flex="1" className="acc-header">
                    {t(
                      "startup.popup.service.content.heading.service.availability"
                    )}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="acc-panel">
                <ServiceAvailability
                  isAdd={true}
                  ServiceAvailabilityData={useCallback((data) => {
                    handleServiceAvailabilityChange(data);
                  }, [])}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem mt="5" border="0px" boxShadow="md">
              <h2>
                <AccordionButton>
                  <Box flex="1" className="acc-header">
                    {t(
                      "startup.popup.service.content.heading.service.information"
                    )}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} className="acc-panel">
                <ServiceInfo
                  ServiceInfoData={useCallback((data) => {
                    handleServiceInfoChange(data);
                  }, [])}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <TagComment
            tagData={useCallback((data) => {
              handleCommentCallback(data);
            }, [])}
            commentData={useCallback((data) => {
              handleTagCallback(data);
            }, [])}
          />
          <ModalFooter p="0" mt="80px">
            <SaveAsDraftConfirm
              res={res}
              draftStatus={(serviceStatus) => {
                serviceStatus && SendFinalData(serviceStatus);
              }}
              saveDraft={t(
                "startup.popup.service.content.service.button.draft"
              )}
            />
            <PublishServiceConfirm
              res={res}
              publishStatus={(serviceStatus) => {
                serviceStatus && SendFinalData(serviceStatus);
              }}
              publish={t(
                "startup.popup.service.content.service.button.publish"
              )}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default AddServiceModal;
