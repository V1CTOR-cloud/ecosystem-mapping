import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Box, HStack } from "@chakra-ui/react";

import {
  blueColor,
  greyTextColor,
  smallPadding,
  verySmallPadding,
} from "../../../../../helper/constant";
import LabelWithTooltip from "../../../../basic/labelWithTooltip/LabelWithTooltip";
import ButtonComponent from "../../../../basic/buttons/ButtonComponent";

function ApplicationTypeComponent(props) {
  const { t } = useTranslation();
  const [value, setValue] = useState(props.applicationType);

  function handleOnChange(applicationType) {
    setValue(applicationType);
    props.onChange(applicationType);
  }

  return (
    <Box marginTop={smallPadding}>
      <LabelWithTooltip
        label={t("mapping.canvas.form.application.type")}
        tooltipAriaLabel={t("mapping.canvas.form.application.type")}
        tooltipText={t("mapping.canvas.form.application.type.tooltip")}
      />
      <HStack marginTop={verySmallPadding}>
        {props.applicationTypeButtons.map((buttonText) => {
          return (
            <Box key={buttonText}>
              <ButtonComponent
                padding={`0 0 0 ${verySmallPadding}`}
                isWithoutBorder={true}
                buttonText={buttonText}
                color={value === buttonText ? blueColor : greyTextColor}
                isSelected={value === buttonText}
                onClick={() => handleOnChange(buttonText)}
              />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}

export default ApplicationTypeComponent;
