import React, { useState, useEffect } from "react";

import {
  FormControl,
  FormLabel,
  Box,
  useToast,
  ModalBody,
} from "@chakra-ui/react";
import { DebounceInput } from "react-debounce-input";
import { useTranslation } from "react-i18next";

import OrganisationChoice from "components/organiserComponent/OrganisationChoice";
import Service from "service/EcosystemMapServices";
import AddOrganisation from "components/organiserComponent/AddOrganisation";
import ServiceType from "./ServiceType";
import ApplicationType from "./ApplicationType";

const ServiceBasicInfo = ({
  basicInfoData,
  dataS = { serviceName: "" },
  isEdit,
}) => {
  const { t } = useTranslation();
  const [serviceName, setServiceName] = useState("");
  const [data, setData] = useState([]);
  const [serviceOwner, setServiceOwner] = useState("");
  const [serviceFocus, setServiceFocus] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [isInv, setIsInv] = useState(false);
  const [value] = React.useState("1");
  const toast = useToast();
  const [orgCreated, setOrgCreated] = useState(false);

  const handleAddOrganisation = (data_send) => {
    Service.addOrg(data_send).then((res) => {
      if (res.id !== undefined) {
        handleToastCall();
        setOrgCreated(true);
        Service.getAllOrg().then((res_2) => {
          const newArrayOfObj = res_2.map(
            ({ organisationName: name, id: value, ...rest }) => ({
              name,
              value,
              ...rest,
            })
          );
          setData(newArrayOfObj);
        });
      }
    });
  };

  const handleToastCall = () => {
    toast({
      title: t("startup.toast.create"),
      description: t("startup.toast.service.owner.message"),
      status: "success",
      duration: 9000,
      position: "top-right",
      isClosable: true,
    });
  };

  const handleOrganisationChange = (data) => {
    setServiceOwner(data);
    basicInfoData(serviceName, data, serviceFocus, applicationType);
  };

  useEffect(() => {
    Service.getAllOrg().then((res) => {
      const newArrayOfObj = res.map(
          ({ organisationName: name, id: value, ...rest }) => ({
            name,
            value,
            ...rest,
          })
      );
      setData(newArrayOfObj);
    });
    if (isEdit) {
      setServiceName(dataS.serviceName);
      setServiceFocus(dataS.serviceFocus);
      setServiceOwner(dataS.serviceOwner[0].id);
      setApplicationType(dataS.applicationType);
    }
  }, [dataS, isEdit]);

  return (
    <ModalBody pb={6}>
      <FormControl>
        <FormControl>
          <FormLabel className="frm-lbl" mt="15px">
            {t("startup.popup.service.content.service.name")}
          </FormLabel>
          <DebounceInput
            className="service-name"
            value={serviceName}
            isInvalid={isInv}
            onChange={(e) => {
              e.target.value.length > 0 ? setIsInv(false) : setIsInv(true);
              setServiceName(e.target.value);
              basicInfoData(
                e.target.value,
                serviceOwner,
                serviceFocus,
                value,
                applicationType
              );
            }}
            minLength={1}
            debounceTimeout={500}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel className="frm-lbl">
            {t("startup.popup.service.content.service.owner.organisation")}
          </FormLabel>
          <Box display="inline-flex">
            <OrganisationChoice
              valueData={dataS}
              data={data}
              getOrgData={(data) => {
                handleOrganisationChange(data);
              }}
            />
            <AddOrganisation
              orgCreated={orgCreated}
              setData={(data) => {
                handleAddOrganisation(data);
              }}
            />
          </Box>
        </FormControl>
        <ServiceType
          radioValue={(e) => {
            setServiceFocus(e);
            basicInfoData(serviceName, serviceOwner, e, applicationType);
          }}
          val={serviceFocus}
        />
        <ApplicationType
          radioValue={(e) => {
            setApplicationType(e);
            basicInfoData(serviceName, serviceOwner, serviceFocus, e);
          }}
          val={applicationType}
        />
      </FormControl>
    </ModalBody>
  );
};

export default ServiceBasicInfo;
