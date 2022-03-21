import React, {useState} from "react";

import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {useTranslation} from "react-i18next";


import Checkboxes from "assets/checkbox.json";
import AppType from "assets/applicationType.json";
import {ServicePhase} from "./ServicePhase";
import ConverterSDP from "components/miscellaneousComponents/ConverterSDP";

const ServiceFilter = ({
  onServiceCategoryValCallback,
  ServiceCategorySDPVal: onServiceCategorySDPValCallback,
  onClearFilter,
  onFilterValuesCallback,
  filterCriteria,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [val, setVal] = useState("");
  const [phase, setPhase] = useState({ low: "one", high: "two" });
  const { t } = useTranslation();

  const headerStyle = {
    fontFamily: "Ubuntu",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "44.8px",
  };

  const primaryBtn = {
    width: "77px",
    height: "40px",
    ml: "17px",
    bottom: "24px",

    background: "#2A69AC",
    borderRadius: "4px",
  };

  const modalWidth = {
    maxWidth: "57rem",

    ml: "224px",
    mt: "80px",
    background: "#FFFFFF",
    borderRadius: "16px",
  };

  const secondaryBtn = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px 16px",

    width: "112px",
    height: "40px",
    mr: "130px",
    bottom: "24px",

    margin: " 0px 10px",

    background: "#FFFFFF",
    border: "1px solid #2A69AC",
    boxSizing: "border-box",
    borderRadius: "4px",
  };

  const labelStyle = {
    fontFamily: "Helvetica",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: "16.8px",
  };

  const chkHeaderStyle = {
    fontFamily: "Helvetica",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "24px",
  };

  const inputStyle = {
    background: "#F7F9FC",
    border: "2px solid #94A3A8",
    boxSizing: "border-box",
    boxShadow: "inset 0px 4px 4px rgba(124, 124, 236, 0.1)",
    borderRadius: "4px",
  };

  const CircleIcon = (props) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  const handleChangeServiceFilter = () => {
    onServiceCategoryValCallback(val);
    onServiceCategorySDPValCallback(phase);

    onOpen(false);
    onClose(true);
  };
  const clearFilter_Btn = () => {
    onClearFilter();
    onOpen(false);
    onClose(true);
    setVal("");
  };
  const setPhaseConv = (data) => {
    setPhase({
      low: ConverterSDP.getPoint(data.low),
      high: ConverterSDP.getPoint(data.high),
    });
    handleFilter("phase", {
      fromPhase: ConverterSDP.getPoint(data.low),
      toPhase: ConverterSDP.getPoint(data.high),
    });
  };
  const handleFilter = (key, value) => {
    onFilterValuesCallback(key, value);
  };
  return (
    <Grid>
      <div>
        <Button className="btn-2" onClick={onOpen} mt="5px">
          {t("startup.home.page.header.filter.button")}
        </Button>
      </div>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent style={modalWidth}>
          <ModalHeader style={headerStyle} b="0">
            {t("startup.home.page.header.filter.button")}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(1, 1fr)"
              gridRow="1"
              gap={10}
              mt="2"
            />

            <FormControl mt={4}>
              <FormLabel style={labelStyle}>
                {t("startup.popup.service.content.service.name")}
              </FormLabel>
              <Input
                style={inputStyle}
                onChange={(e) => handleFilter("serviceName", e.target.value)}
                defaultValue={filterCriteria.serviceName}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel style={labelStyle}>
                {t("startup.popup.filter.location")}
              </FormLabel>
              <HStack spacing={10} direction="row">
                <Checkbox
                  size="lg"
                  colorScheme="blue"
                  className="cstmcheckbx"
                  value="onlineService"
                  onChange={(e) =>
                    handleFilter("location", {
                      onlineService: e.target.checked,
                      offlineService:
                        filterCriteria && filterCriteria.location
                          ? filterCriteria.location.offlineService
                          : false,
                    })
                  }
                  defaultChecked={
                    filterCriteria &&
                    filterCriteria.location &&
                    filterCriteria.location.onlineService
                  }
                >
                  <Text style={chkHeaderStyle}>
                    {t("startup.popup.service.details.content.online")}
                  </Text>
                </Checkbox>
                <Checkbox
                  size="lg"
                  colorScheme="blue"
                  className="cstmcheckbx"
                  value="offlineService"
                  onChange={(e) =>
                    handleFilter("location", {
                      offlineService: e.target.checked,
                      onlineService:
                        filterCriteria && filterCriteria.location
                          ? filterCriteria.location.onlineService
                          : false,
                    })
                  }
                  defaultChecked={
                    filterCriteria &&
                    filterCriteria.location &&
                    filterCriteria.location.offlineService
                  }
                >
                  <Text style={chkHeaderStyle}>
                    {t("startup.popup.service.details.content.venue")}
                  </Text>
                </Checkbox>
              </HStack>
            </FormControl>
            <Box>
              <FormControl mt={4}>
                <FormLabel style={labelStyle}>
                  {t("startup.popup.filter.phase")}
                </FormLabel>
                <ServicePhase
                  phaseData={(data) => {
                    setPhaseConv(data);
                  }}
                  data={{
                    low:
                      filterCriteria &&
                      filterCriteria.phase &&
                      filterCriteria.phase.fromPhase
                        ? ConverterSDP.getPoint(filterCriteria.phase.fromPhase)
                        : 0,
                    high:
                      filterCriteria &&
                      filterCriteria.phase &&
                      filterCriteria.phase.toPhase
                        ? ConverterSDP.getPoint(filterCriteria.phase.toPhase)
                        : 1,
                  }}
                />
              </FormControl>
            </Box>
            {/* </Grid> */}
            <FormControl mt={4}>
              <FormLabel style={labelStyle}>
                {t("startup.popup.filter.service.category")}
              </FormLabel>
              <CheckboxGroup
                onChange={(e) => handleFilter("serviceFocus", e)}
                defaultValue={filterCriteria.serviceFocus}
              >
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  gap={3}
                  className="mod-checklbl service-type"
                >
                  {Checkboxes.checkbox.map((result) => (
                    <Box pos="relative">
                      <Checkbox value={result.name}>{result.name}</Checkbox>
                      <CircleIcon
                        className="service-circle"
                        boxSize={5}
                        color={result.color}
                        float="right"
                      />
                    </Box>
                  ))}{" "}
                </Grid>
              </CheckboxGroup>
            </FormControl>

            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(1, 1fr)"
              gridRow="1"
              gap={10}
              mt="2"
            >
              <FormControl mt={4}>
                <FormLabel style={labelStyle}>
                  {t("startup.popup.filter.status")}
                </FormLabel>
                <CheckboxGroup
                  onChange={(e) => handleFilter("serviceStatus", e)}
                  defaultValue={filterCriteria.serviceStatus}
                >
                  <HStack spacing={10} direction="row">
                    <Checkbox
                      size="lg"
                      colorScheme="blue"
                      className="cstmcheckbx"
                      value="Published"
                    >
                      {t(
                        "startup.popup.service.content.service.button.publish"
                      )}
                    </Checkbox>
                    <Checkbox
                      size="lg"
                      colorScheme="blue"
                      className="cstmcheckbx"
                      value="Draft"
                    >
                      {t("startup.popup.service.content.service.button.draft")}
                    </Checkbox>
                  </HStack>
                </CheckboxGroup>
              </FormControl>
            </Grid>

            <Grid
              templateColumns="repeat(2, 1fr)"
              templateRows="repeat(1, 1fr)"
              gridRow="1"
              gap={10}
              mt="2"
            >
              <Box>
                <FormControl mt={4}>
                  <FormLabel style={labelStyle}>
                    {t("startup.popup.filter.application")}
                  </FormLabel>
                  <CheckboxGroup
                    gap="10"
                    onChange={(e) => handleFilter("applicationType", e)}
                    defaultValue={filterCriteria.applicationType}
                  >
                    <HStack spacing={10} direction="row">
                      {AppType.AppType.map((result) => (
                        <Checkbox
                          size="lg"
                          colorScheme="blue"
                          className="cstmcheckbx"
                          value={result.name}
                        >
                          {result.name}
                        </Checkbox>
                      ))}
                    </HStack>
                  </CheckboxGroup>
                </FormControl>
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              style={secondaryBtn}
              onClick={() => {
                clearFilter_Btn();
              }}
            >
              {t("startup.home.page.header.clear.filter.button")}
            </Button>
            <Button
              onClick={() => {
                handleChangeServiceFilter();
              }}
              style={primaryBtn}
              colorScheme="blue"
              mr={3}
            >
              {t("startup.popup.service.content.service.button.apply")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default ServiceFilter;