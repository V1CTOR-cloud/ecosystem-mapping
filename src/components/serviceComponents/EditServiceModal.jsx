import React, { useCallback, useState, useEffect } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import {
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Box,
  Text,
  Flex,
  Image,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import SaveAsDraftConfirm from "./SaveAsDraftConfirm";
import PublishServiceConfirm from "./PublishServiceConfirm";
import { ServiceBasicInfo } from "./ServiceBasicInfo";
import ServiceAvailability from "./ServiceAvailability";
import { ServiceInfo } from "./ServiceInfo";
import { TagComment } from "./TagComment";
import Service from "service/EcosystemMapServices";
import imgSource from "../../assets/images/Vector.png";

const EditServiceModal = ({ data, successClose }) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [basicInfo, setBasicInfo] = useState([]);
  const [serviceInfo, setServiceInfo] = useState([]);
  const [serviceAvailability, setServiceAvailability] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState("");
  const [serviceState, setServiceState] = useState({});

  const handleTagDataCallback = (data) => {
    setTags(data.tags);
  };

  const handleCommentDataCallback = (data) => {
    setComments(data.comment);
  };

  const handleBasicInfoChange = (a, b, c, d) => {
    setBasicInfo([a, b, c, d]);
  };

  const handleServiceInfoChange = (data) => {
    setServiceInfo(data);
  };

  const handleErrorToastCall = () => {
    toast({
      title: t("startup.toast.service.name.error"),
      description: t("startup.toast.service.name.message"),
      status: "error",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleSuccessToastCall = () => {
    toast({
      title: t("startup.toast.update"),
      description: t("startup.toast.service.update.message"),
      status: "success",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  };

  const editServiceFunc = (serviceStatus) => {
    Service.editService({
      basicService: basicInfo,
      serviceInfo: serviceInfo,
      serviceAvailibility: serviceAvailability,
      tags: tags,
      comments: comments,
      serviceStatus: serviceStatus,
      id: data.id,
    })
      .then((res) => {
        if (res.message !== undefined) {
          handleErrorToastCall();
        } else {
          successClose();
          handleSuccessToastCall();
          onOpen(false);
          onClose(true);
        }
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setBasicInfo([
      data.serviceName,
      data.serviceOwner[0].id,
      data.serviceFocus,
      data.applicationType,
    ]);
    setServiceInfo([
      data.previousService,
      data.followingService,
      data.serviceBreif,
      data.serviceDescription,
      data.serviceOutcomes,
      data.serviceAudience,
      data.budget,
    ]);
    setServiceAvailability([
      data.serviceStartTime,
      data.serviceEndTime,
      data.timezone,
      data.serviceLocation,
    ]);
    setTags(data.tagTitle);
    setComments(data.serviceComments);
    setServiceState(data);
  }, [data]);
  const ServiceAvailabilityData = (a, b, c, d, e, f, g, h) => {
    setServiceAvailability(a, b, c, d, e, f, g, h);
  };

  return (
    <Box zIndex="100">
      <Grid>
        <Flex onClick={onOpen} align="center">
          <Image onClick={onOpen} src={imgSource} alt="image" mr="1" />
          <Text onClick={onOpen} className="edit-txt">
            {t("startup.popup.service.details.content.edit.text")}
          </Text>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="mod-service-add-edit" maxW="920px" mt="80px">
            <ModalHeader className="mod-header" b="0">
              {t("startup.popup.service.content.heading.edit")}
            </ModalHeader>
            <ModalCloseButton />
            <Accordion defaultIndex={[0]} allowMultiple>
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
                    dataS={data}
                    basicInfoData={useCallback((a, b, c, d) => {
                      handleBasicInfoChange(a, b, c, d);
                    }, [])}
                    isEdit={true}
                    name={serviceState.serviceName}
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem mt="5" border="0px" boxShadow="md">
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
                    dataS={data}
                    ServiceAvailabilityData={useCallback(
                      (a, b, c, d, e, f, g, h) => {
                        ServiceAvailabilityData(a, b, c, d, e, f, g, h);
                      },
                      []
                    )}
                    isEdit={true}
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
                    dataS={data}
                    ServiceInfoData={useCallback((data) => {
                      handleServiceInfoChange(data);
                    }, [])}
                    isEdit={true}
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <TagComment
              dataS={data}
              tagData={useCallback((data) => {
                handleCommentDataCallback(data);
              }, [])}
              commentData={(data) => handleTagDataCallback(data)}
              isEdit={true}
            />
            <ModalFooter p="0" mt="80px">
              <SaveAsDraftConfirm
                draftStatus={(serviceStatus) => {
                  serviceStatus && editServiceFunc(serviceStatus);
                }}
                saveDraft={t(
                  "startup.popup.service.content.service.button.draft"
                )}
              />
              <PublishServiceConfirm
                publishStatus={(serviceStatus) => {
                  serviceStatus && editServiceFunc(serviceStatus);
                }}
                publish={t(
                  "startup.popup.service.content.service.button.publish"
                )}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Grid>
    </Box>
  );
};

export default EditServiceModal;
