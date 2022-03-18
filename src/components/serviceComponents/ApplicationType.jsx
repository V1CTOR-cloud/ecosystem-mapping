import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import RadioButtonsApplicationType from "./RadioButtonsApplicationType";
import { useTranslation } from "react-i18next";

const ApplicationType = ({radioValue,val}) => {
  const { t } = useTranslation();
  return (
    <FormControl mt={4}>
      <FormLabel className="frm-lbl" mt="24px" mb="17px">
      {t('startup.popup.service.content.application.type')}
      </FormLabel>
      <RadioButtonsApplicationType radioValue={(e)=>radioValue(e)} val={val} />
    </FormControl>
  );
};
export { ApplicationType };