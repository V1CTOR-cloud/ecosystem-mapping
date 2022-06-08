import React, { useState } from "react";
import PropTypes from "prop-types";

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
  const { applicationType, onChange, applicationTypeButtons } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState(applicationType);

  function handleOnChange(applicationType) {
    setValue(applicationType);
    onChange(applicationType);
  }

  return (
    <Box marginTop={smallPadding}>
      <LabelWithTooltip
        label={t("mapping.canvas.form.application.type")}
        tooltipAriaLabel={t("mapping.canvas.form.application.type")}
        tooltipText={t("mapping.canvas.form.application.type.tooltip")}
      />
      <HStack marginTop={verySmallPadding}>
        {applicationTypeButtons.map((buttonText) => {
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

ApplicationTypeComponent.propTypes = {
  applicationType: PropTypes.string.isRequired,
  applicationTypeButtons: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ApplicationTypeComponent;
