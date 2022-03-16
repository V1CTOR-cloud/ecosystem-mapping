import React, { useState, useEffect } from "react";
import { ServiceType } from "./ServiceType";
import { ApplicationType } from "./ApplicationType";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  FormLabel,
  Box,
  useToast,
  ModalBody,
} from "@chakra-ui/react";
import OrganisationChoice from "components/organiserComponent/OrganisationChoice";
import Service from "service/EcosystemMapServices";
import AddOrganisation from "components/organiserComponent/AddOrganisation";
import { DebounceInput } from "react-debounce-input";

const ServiceBasicInfo = ({
  basicInfoData,
  dataS = { serviceName: "" },
  isEdit /* name, onChangeBasicInfo*/,
}) => {
  const { t } = useTranslation();
  const [serviceName, setServiceName] = useState("");
  const [data, setData] = useState([]);
  const [serviceOwner, setServiceOwner] = useState("");
  const [serviceFocus, setServiceFocus] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [isInv, setIsinv] = useState(false);
  const [value] = React.useState("1");
  const toast = useToast();
  const [orgCreated, setOrgCreated] = useState(false);
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
      //setServiceName(name);
      setServiceName(dataS.serviceName);
      setServiceFocus(dataS.serviceFocus);
      setServiceOwner(dataS.serviceOwner[0].id);
      setApplicationType(dataS.applicationType);
    }
  }, [dataS, isEdit]);
  const AddOrg = (data_send) => {
    Service.addOrg(data_send).then((res) => {
      if (res.id !== undefined) {
        showToast();
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
  const showToast = () => {
    toast({
      title: t("startup.toast.create"),
      description: t("startup.toast.service.owner.message"),
      status: "success",
      duration: 9000,
      position: "top-right",
      isClosable: true,
    });
  };
  const getOrgData = (data) => {
    setServiceOwner(data);
    basicInfoData(serviceName, data, serviceFocus, applicationType);
  };
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
              e.target.value.length > 0 ? setIsinv(false) : setIsinv(true);
              setServiceName(e.target.value);
              basicInfoData(
                e.target.value,
                serviceOwner,
                serviceFocus,
                value,
                applicationType
              );
              //onChangeBasicInfo(e)
            }}
            //name="serviceName"
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
                getOrgData(data);
              }}
            />
            <AddOrganisation
              orgCreated={orgCreated}
              setData={(data) => {
                AddOrg(data);
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
        {/* <HStack spacing={10} direction="row">
            <Checkbox
              size="lg"
              colorScheme="blue"
              onChange={(e) => {
                setvalue([e.target.checked, value[1]]);
                basicInfoData(serviceName, serviceOwner, serviceFocus, [
                  e.target.checked,
                  value[1],
                ]);
              }}
              className="check-text cstmcheckbx mod-checklbl span"
              defaultChecked={value[0]}
            >
              Market (Internal)
            </Checkbox>

            <Checkbox
              size="lg"
              colorScheme="blue"
              defaultChecked={value[1]}
              className="cstmcheckbx mod-checklbl span"
              onChange={(e) => {
                setvalue([value[0], e.target.checked]);
                basicInfoData(serviceName, serviceOwner, serviceFocus, [
                  value[0],
                  e.target.checked,
                ]);
              }}
            >
              Organisation (External)
            </Checkbox>
          </HStack> */}
      </FormControl>
    </ModalBody>
  );
};

export { ServiceBasicInfo };
