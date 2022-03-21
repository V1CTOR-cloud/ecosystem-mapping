import React, { useMemo, useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  Textarea,
  ModalBody,
  HStack,
  Select,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Multiselect } from "multiselect-react-dropdown";

import { ServicePhase } from "./ServicePhase";
import Service from "../../service/EcosystemMapServices";
import ConverterSDP from "components/miscellaneousComponents/ConverterSDP";

const Audience = [
  "New_Founders",
  "Co_Founders",
  "Talent_Joining_Startups",
  "Support_Service_Staff",
];

const Budget = ["500 - 1000 EUR/Session", "6000 - 12000 EUR per year"];

const style = {
  chips: {
    background: "#f7f9fc !important",
  },
  searchBox: {
    border: "2px solid #94a3a8",
    boxSizing: "border-box",
    boxShadow: "inset 0px 4px 4px rgba(124, 124, 236, 0.1)",
  },
  option: {
    padding: "0px",
    paddingLeft: "20px",
  },
  placeholder: {
    background: "",
  },
};

const ServiceInfo = ({
  ServiceInfoData,
  dataS = { serviceName: "" },
  isEdit,
}) => {
  const { t } = useTranslation();
  const [service1, setService1] = useState("");
  const [service2, setService2] = useState("");
  const [descService, setDescService] = useState("");
  const [descServiceDetails, setDescServiceDetails] = useState("");
  const [audience, setAudience] = useState([]);
  const [budget, setBudget] = useState("");
  const [expectations, setExpectations] = useState("");
  const [verifiedDetails, setVerifiedDetails] = useState("1");
  const [phase, setPhase] = useState({ low: "zero", high: "one" });
  const [items, setItems] = useState([]);


  useMemo(() => {
    ServiceInfoData({
      service1: service1,
      service2: service2,
      descService: descService,
      descServiceDettail: descServiceDetails,
      expectations: expectations,
      audience: audience,
      budget: budget,
      isVerified: verifiedDetails,
      phase: phase,
    });
  }, [
    service1,
    service2,
    descService,
    descServiceDetails,
    expectations,
    audience,
    budget,
    verifiedDetails,
    phase,
    ServiceInfoData,
  ]);

  const setPhaseConv = (data) => {
    setPhase({
      low: ConverterSDP.getPoint(data.low),
      high: ConverterSDP.getPoint(data.high),
    });
  };

  useEffect(() => {
    Service.getServicesList().then((res) => {
      setItems(res);
    });
    if (isEdit) {
      setService1(dataS.previousService);
      setService2(dataS.followingService);
      setDescService(dataS.serviceBreif);
      setDescServiceDetails(dataS.serviceDescription);
      setAudience(dataS.serviceAudience);
      setBudget(dataS.budget);
      setExpectations(dataS.serviceOutcomes);
      setPhase({ low: dataS.fromPhase, high: dataS.toPhase });
    }
  }, [dataS, isEdit]);

  return (
    <ModalBody pb={6}>
      <FormControl>
        <FormLabel className="frm-lbl">
          {t("startup.popup.service.content.service.precedes")}
        </FormLabel>
        <Select
          className="fm-ip-flds"
          placeholder={t("startup.popup.service.content.service.select")}
          value={service1}
          onChange={(data) => setService1(data.target.value)}
        >
          {items.map((service) => (
            <option text={service.id}>{service.serviceName}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel className="frm-lbl">
          {t("startup.popup.service.content.service.follows")}
        </FormLabel>
        <Select
          value={service2}
          onChange={(data) => setService2(data.target.value)}
          className="fm-ip-flds"
          placeholder={t("startup.popup.service.content.service.select")}
        >
          {items.map((service) => (
            <option text={service.id}>{service.serviceName}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel className="frm-lbl">
          {t("startup.popup.service.content.service.describe.short")}
        </FormLabel>
        <Input
          value={descService}
          onChange={(e) => {
            setDescService(e.target.value);
          }}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel className="frm-lbl">
          {t("startup.popup.service.content.service.describe.details")}
        </FormLabel>
        <Textarea
          value={descServiceDetails}
          onChange={(data) => {
            setDescServiceDetails(data.target.value);
          }}
          className="fm-ip-flds"
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel className="frm-lbl">
          {t("startup.popup.service.content.service.user.expect")}
        </FormLabel>
        <Input
          value={expectations}
          onChange={(e) => {
            setExpectations(e.target.value);
          }}
        />
        <FormControl mt={4}>
          <FormLabel className="frm-lbl">
            {t("startup.popup.service.content.service.choose.audience")}
          </FormLabel>
          <Multiselect
            className="fm-ip-flds"
            placeholder={t(
              "startup.popup.service.content.service.select.audience"
            )}
            showCheckbox
            value={audience}
            options={Audience}
            isObject={false}
            style={style}
            selectedValues={audience}
            onSelect={(selectedAudienceList) =>
              setAudience(selectedAudienceList)
            }
          />
        </FormControl>{" "}
        <FormControl mt={4}>
          <FormLabel className="frm-lbl">
            {t("startup.popup.service.details.content.budget")}
          </FormLabel>
          <Select
            className="fm-ip-flds"
            placeholder={t(
              "startup.popup.service.content.service.select.budget"
            )}
            value={budget}
            onChange={(data) => setBudget(data.target.value)}
          >
            {Budget.map((value) => (
              <option> {value} </option>
            ))}
          </Select>
        </FormControl>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel className="frm-lbl">
          {t("startup.popup.service.content.service.verified")}
        </FormLabel>
        <HStack spacing={10} direction="row">
          <RadioGroup onChange={setVerifiedDetails} value={verifiedDetails}>
            <Stack direction="row">
              <Radio value="1">
                {t("startup.popup.service.content.service.yes")}
              </Radio>
              <Box w="10px" />
              <Radio value="2">
                {t("startup.popup.service.content.service.no")}
              </Radio>
            </Stack>
          </RadioGroup>
        </HStack>
      </FormControl>
      <ServicePhase
        phaseData={(data) => {
          setPhaseConv(data);
        }}
        data={
          isEdit
            ? {
                low: ConverterSDP.getPoint(dataS.fromPhase),
                high: ConverterSDP.getPoint(dataS.toPhase),
              }
            : { low: 0, high: 1 }
        }
      />
    </ModalBody>
  );
};

export default ServiceInfo;
