import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  Flex,
  Image,
  Tag,
  HStack,
  TagLabel,
  Grid,
  Link,
} from "@chakra-ui/react";
import { ServicePhase } from "./ServicePhase";
import imgProgressBar from "../../assets/images/Group 194.png";
import ServiceChangesLog from "./ServiceChangesLog";
import EditServiceModal from "./EditServiceModal";
import ConverterSDP from "components/miscellaneousComponents/ConverterSDP";
import Checkboxes from "assets/checkbox.json";
import { Icon } from "@chakra-ui/icons";
import { PhaseRange } from "components/phaseRangeBar/PhaseRange";
import { getCurrentUser } from "service/AuthenticationService"
import Services from "../../service/EcosystemMapServices";
import { useTranslation } from 'react-i18next';

export default function PublishedServiceForm({ name, orgName }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let user = getCurrentUser()
  const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  const succesClose = () => {
    onOpen(false);
    onClose(true);
  };
  const dateformater = (date) => {
    try {
      return new Date(date).toUTCString();
    } catch (error) {
      console.log(error);
    }
  };
  const updateRange=(data)=>{
    Services.UpdatePhaseRangeonResize({
      id: orgName.id,
      toPhase: ConverterSDP.getPoint(data.high),
      fromPhase: ConverterSDP.getPoint(data.low)
    }).then(res => {
       orgName.fromPhase = res.updateService.fromPhase
       orgName.toPhase = res.updateService.toPhase
    })
    .catch((error)=>console.log(error))
  }
  return (
    <>
    <PhaseRange
    type=""
    low={ConverterSDP.getPoint(orgName.fromPhase)}
    high={ConverterSDP.getPoint(orgName.toPhase)}
    // returnData={(data) => {
    //   updateRange(data,orgName)
    // }}
    returnData={updateRange}
    serviceStatus ={orgName.serviceStatus}
    hideRailticks={true}
    bg={
      Checkboxes.checkbox.filter((result) => {
        return result.name === orgName.serviceFocus;
      })[0].color
    }
    name={name}
    onClick={onOpen}
    />
      {/* <Button
        className="btnHover"
        bg={
          Checkboxes.checkbox.filter((result) => {
            return result.name === orgName.serviceFocus;
          })[0].color
        }
        style={style}
        onClick={onOpen}
      >
        {name}
      </Button> */}
      <Box m="0px" className="full-screen">
        <Modal onClose={onClose} size="full" isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent overflow="scroll" h="100px" m="10px" p="72px 84px">
            <ModalHeader className="pf-hdr" mb="15px" mr="3">
              {name} &nbsp;
              <EditServiceModal
                succesClose={() => {
                  succesClose();
                }}
                data={orgName}
              />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody p="0">
              <Flex>
                <Box
                  width={[
                    "100%", // 0-30em
                    "50%", // 30em-48em
                    "25%", // 48em-62em
                    "25%", // 62em+
                  ]}
                >
                  <Box m="0px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.owner')}:{" "}
                      {orgName.serviceOwner[0] && (
                        <Tag fontWeight="bold">
                          {" "}
                          {orgName.serviceOwner[0].organisationName}
                        </Tag>
                      )}
                    </Text>
                  </Box>
                  <Box m="0px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.application.type')}:{" "}
                      {orgName.applicationType && (
                        <Tag fontWeight="bold"> {orgName.applicationType}</Tag>
                      )}
                    </Text>
                  </Box>
                  <Box className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.service.category')}:{" "}
                      <Grid
                        templateColumns="repeat(1, 1fr)"
                        gap={3}
                        className="mod-checklbl service-type"
                      >
                        <Box pos="relative">
                          <Tag p="0" fontWeight="bold">
                            {" "}
                            {orgName.serviceFocus}{" "}
                          </Tag>{" "}
                          <CircleIcon
                            className="service-circle"
                            boxSize={5}
                            color={
                              Checkboxes.checkbox.filter((result) => {
                                return result.name === orgName.serviceFocus;
                              })[0].color
                            }
                            float="right"
                          />
                        </Box>
                      </Grid>
                      {/* <Tag fontWeight="bold"> {orgName.serviceFocus} </Tag> */}
                    </Text>
                  </Box>
                  <Box className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.available')}:{" "}
                      <Text>
                        {orgName.onlineService && (
                          <Box>
                            {" "}
                            <Tag fontWeight="bold">{t('startup.popup.service.details.content.online')} -</Tag>{" "}
                            <Text ml="9px">
                              <Link color="blue" href={orgName.serviceLocation}>
                                {" "}
                                {orgName.serviceLocation}{" "}
                              </Link>
                            </Text>{" "}
                          </Box>
                        )}
                        {orgName.offlineSerivce && (
                          <Box>
                            <Tag fontWeight="bold">{t('startup.popup.service.details.content.venue')} -</Tag>
                            <Text fontSize="sm" ml="9px">
                              {orgName.serviceLocation}
                            </Text>
                          </Box>
                        )}
                      </Text>
                      <Tag fontSize="smaller" fontWeight="semibold">
                        {" "}
                        {t('startup.popup.service.details.content.service.starts')} - {dateformater(
                          orgName.serviceStartTime
                        )}{" "}
                      </Tag>
                      <Tag fontSize="smaller" fontWeight="semibold">
                        {" "}
                        {t('startup.popup.service.details.content.service.ends')} - {dateformater(orgName.serviceEndTime)}{" "}
                      </Tag>
                    </Text>
                  </Box>

                  <Box mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.belongs.to')}:{" "}
                      <Tag fontWeight="bold" background="none">
                        {" "}
                        Formation & Validation phase{" "}
                      </Tag>
                    </Text>
                    <ServicePhase
                      data={{
                        low: ConverterSDP.getPoint(orgName.fromPhase),
                        high: ConverterSDP.getPoint(orgName.toPhase),
                      }}
                      type={"show"}
                      phaseData={() => {}}
                    />
                    {/* <Grid templateColumns="repeat(1, 1fr)">
                    <Box>
                      <Image src={imgRect1} alt="image" mt="2" width="80%" />
                    </Box>
                
                  </Grid> */}
                  </Box>

                  <Box className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.service.is')}{" - "}
                      <Tag fontWeight="bold">Verified</Tag>
                    </Text>
                  </Box>
                  <Box className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.applied')}:{" "}
                      <Tag fontWeight="bold">
                        {" "}
                        Internally, in the organization
                      </Tag>
                    </Text>
                  </Box>
                  <Box className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.audience')}:
                      <Text fontSize="ml">
                        {orgName.serviceAudience.map((value) => (
                          <Tag w="100%" fontWeight="bold">
                            {value}
                          </Tag>
                        ))}
                      </Text>
                    </Text>
                  </Box>
                  <Box className="pf-gry-crd" mb="5">
                    {t('startup.popup.service.details.content.budget')}:
                    <Text fontSize="ml">
                      <Tag fontWeight="bold">{orgName.budget}</Tag>
                    </Text>
                  </Box>
                </Box>

                <Box
                  width={[
                    "100%", // 0-30em
                    "50%", // 30em-48em
                    "25%", // 48em-62em
                    "50%", // 62em+
                  ]}
                >
                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.precedes.service')}:
                    </Text>
                    <Tag fontWeight="bold">{orgName.previousService}</Tag>
                  </Box>

                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.follows.service')}:
                    </Text>
                    <Tag fontWeight="bold">{orgName.followingService}</Tag>
                  </Box>

                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">{t('startup.popup.service.details.content.service.description')}:</Text>
                    <Tag fontWeight="bold">{orgName.serviceBreif}</Tag>
                  </Box>

                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">{t('startup.popup.service.details.content.service.is')}:</Text>
                    <Tag fontWeight="bold">{orgName.serviceDescription}</Tag>
                  </Box>
                  <Box
                    ml="28px"
                    display="flex"
                    justifyContent="center"
                    p="15px"
                    mt="128"
                  >
                    <span className="lbl-progress-txt">{t('startup.popup.service.details.content.progress')}</span> &nbsp;
                    <Box>
                      <Image src={imgProgressBar} alt="image" align="center" />
                    </Box>
                    &nbsp; <span className="lbl-progress-txt">100%</span>
                  </Box>
                </Box>

                <Box
                  width={[
                    "100%", // 0-30em
                    "50%", // 30em-48em
                    "25%", // 48em-62em
                    "25%", // 62em+
                  ]}
                >
                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">{t('startup.popup.service.details.content.user.expect')}:</Text>
                    <Tag fontWeight="bold">{orgName.serviceOutcomes}</Tag>
                  </Box>

                  <HStack
                    className="tag-labels"
                    spacing={0}
                    flexWrap="wrap"
                    ml="28px"
                    mb="5"
                  >
                    {orgName.tagTitle.map((tag) => (
                      <Tag borderRadius="full">
                        <TagLabel>{tag}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                  {/* 
                <Box ml="28px" className="pf-gry-crd" mb="5">
                  <Text fontSize="ml">
                    Service that proceeds this service:
                    <Tag fontWeight="bold">Lorem ipsum</Tag>
                  </Text>
                </Box> */}
                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {orgName.serviceComments[0] && dateformater(orgName.serviceComments[orgName.serviceComments.length - 1].updatedDataAt) } 
                      { " "}
                      {" "}{user.user.displayName}{" "}
                       {t('startup.popup.service.details.content.says')}:
                    </Text>
                    <Tag fontWeight="bold"> {orgName.serviceComments[0] && orgName.serviceComments[orgName.serviceComments.length - 1 ].userComments}</Tag>
                    <Text>
                      <ServiceChangesLog allComments={orgName.serviceComments}/>
                    </Text>
                  </Box>

                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.timezone')}: <Tag fontWeight="bold">{orgName.timezone}</Tag>
                    </Text>
                  </Box>
                  <Box ml="28px" className="pf-gry-crd" mb="5">
                    <Text fontSize="ml">
                      {t('startup.popup.service.details.content.service.status')}: <Tag fontWeight="bold">{orgName.serviceStatus}</Tag>
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
