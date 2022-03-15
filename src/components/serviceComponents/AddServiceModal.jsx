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
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import React, { useCallback } from "react";
import PublishServiceConfirm from "../serviceComponents/PublishServiceConfirm";
import SaveAsDraftConfirm from "../serviceComponents/SaveAsDraftConfirm";
// import PublishedServiceForm from "../serviceComponents/PublishedServiceForm";
import { ServiceBasicInfo } from "../serviceComponents/ServiceBasicInfo";
import { ServiceAvailability } from "../serviceComponents/ServiceAvailability";
import { ServiceInfo } from "../serviceComponents/ServiceInfo";
import { TagComment } from "../serviceComponents/TagComment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@chakra-ui/react";

export default function AddServiceModal({
  sendData,
  mapId,
  createNewServiceCallback,
}) {
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

  // const [arr, setarr] = useState([])

  const callToast = () => {
    toast({
      title: t("startup.toast.service.name.error"),
      description: t("startup.toast.service.name.message"),
      status: "error",
      position: "top-right",
      duration: 9000,
      isClosable: true,
    });
  };
  const basicInfoData = (a, b, c, d) => {
    setRes(false);
    setBasicInfo([a, b, c, d]);
  };
  const ServiceAvailabilityData = (data) => {
    setServiceAvailability(data);
  };
  const ServiceInfoDataBack = (data) => {
    setServiceInfo(data);
  };
  const commentDataCallback = (data) => {
    setComments(data.comment);
  };
  const tagDataCallback = (data) => {
    setTags(data.tags);
  };
  const SendFinalData = (serviceStatus) => {
    // let TagServices = [];
    // arr.forEach( element => {
    //   TagServices.push({id : element})
    // })
    // Service.pushService({
    //   basicService: basicInfo,
    //   serviceAvailibility: serviceAvailability,
    //   serviceInfo: serviceInfo,
    //   tags: tags,
    //   comments: comments,
    //   mapID:mapId
    // }).then((res) => {
    //   setBasicInfo(["", "", "", ""]);
    //   setRes(true);
    //   sendData(true)
    //   setTimeout(() => {
    //     onOpen(false);
    //     onClose(true);
    //   }, 1000);
    //   if (res.message !== undefined) {
    //     callToast();
    //   }
    // });

    if (createNewServiceCallback) {
      let finalData = {
        basicService: basicInfo,
        serviceAvailibility: serviceAvailability,
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
      callToast();
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
        <ModalContent
          className="mod-service-add-edit"
          maxW="920px"
          //ml="224px"
          mt="80px"
        >
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
                    basicInfoData(a, b, c, d);
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
                    ServiceAvailabilityData(data);
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
                    ServiceInfoDataBack(data);
                  }, [])}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <TagComment
            tagData={useCallback((data) => {
              commentDataCallback(data);
            }, [])}
            commentData={useCallback((data) => {
              tagDataCallback(data);
            }, [])}
            // tagArray={useCallback((data) => {
            //   setarr(data);
            // }, [])}
          />
          <ModalFooter p="0" mt="80px">
            {/* <ServiceFilter btnFilter={'Filter'}/> */}
            <SaveAsDraftConfirm
              res={res}
              draftStatus={(serviceStatus) => {
                serviceStatus && SendFinalData(serviceStatus);
              }}
              saveDraft={t(
                "startup.popup.service.content.service.button.draft"
              )}
            />
            {/* {basicInfo[0].trim().length > 0 &&
              basicInfo[1].trim().length > 0 &&
              basicInfo[2].trim().length > 0 && ( */}
            <PublishServiceConfirm
              res={res}
              publishStatus={(serviceStatus) => {
                serviceStatus && SendFinalData(serviceStatus);
              }}
              publish={t(
                "startup.popup.service.content.service.button.publish"
              )}
            />
            {/* )} */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
}
