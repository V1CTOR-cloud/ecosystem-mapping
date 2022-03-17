import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import PhaseRange from "components/phaseRangeBar/PhaseRange";

const ServicePhase = ({ phaseData, data, type = "" }) => {
  const { t } = useTranslation();
  const chkSubLblStyle = {
    fontFamily: "Ubuntu",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "24px",
    color: "#3D4D51",
    textAlign: "center !important",
  };

  return (
    <Box>
      <FormControl>
        {type !== "show" ? (
          <FormLabel className="frm-lbl">
            {t("startup.popup.service.content.service.phase")}
          </FormLabel>
        ) : (
          <Box mt="20px"></Box>
        )}

        <Flex>
          <Box flex="1">
            <FormLabel mr="-60px" className="txt-cn" style={chkSubLblStyle}>
              {t("startup.popup.service.content.service.formulation")}
            </FormLabel>
          </Box>
          <Box flex="1">
            <FormLabel mr="-140px" className="txt-cn" style={chkSubLblStyle}>
              {t("startup.popup.service.content.service.validation")}
            </FormLabel>
          </Box>
          <Box flex="1">
            <FormLabel mr="-100px" className="txt-cn" style={chkSubLblStyle}>
              {t("startup.popup.service.content.service.growth")}
            </FormLabel>
          </Box>
        </Flex>
        <Box className="wdth-sdk">
          <PhaseRange
            type={type}
            low={data.low}
            high={data.high}
            returnData={(data) => {
              phaseData(data);
            }}
          />
        </Box>
        <Box mt="20px">
          <p className="tooltipsdk">
            {t("startup.popup.service.content.service.phase.range")}
            <Box ml="10px" display="inline">
              <Tooltip
                label="
              -2 : Ideating
              
              -1 : Concepting
              
              
              0 : Committing
                
              
              1 : Validating
              
              2 : Scaling
              
              3 : stablishing
              
              
              
              
              
    
              "
              >
                <QuestionIcon />
              </Tooltip>
            </Box>
          </p>
        </Box>
      </FormControl>
    </Box>
  );
};

export {ServicePhase};
