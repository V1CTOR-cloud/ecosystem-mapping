import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { Box, HStack, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

import LabelWithTooltip from "../../../../basic/labelWithTooltip/LabelWithTooltip";

function ApplicationTypeComponent(props) {
  const { applicationType, onChange, applicationTypeButtons } = props;
  const { t } = useTranslation();
  const [value, setValue] = useState(applicationType);

  function handleOnChange(applicationType) {
    setValue(applicationType);
    onChange(applicationType);
  }

  return (
    <Box marginTop={3}>
      <LabelWithTooltip
        label={t("mapping.canvas.form.application.type")}
        tooltipAriaLabel={t("mapping.canvas.form.application.type")}
        tooltipText={t("mapping.canvas.form.application.type.tooltip")}
      />
      <HStack marginTop={2}>
        {applicationTypeButtons.map((buttonText) => {
          return (
            <Box key={buttonText}>
              <Button
                marginRight="0.75rem"
                variant="ghost"
                bg={value === buttonText ? "brand.50" : undefined}
                _hover={{
                  bg: value === buttonText ? "brand.100" : "blackAlpha.200",
                }}
                _active={{
                  bg: value === buttonText ? "brand.200" : "blackAlpha.300",
                }}
                color={value === buttonText ? "brand.500" : "blackAlpha.600"}
                onClick={() => handleOnChange(buttonText)}
              >
                {buttonText}
              </Button>
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
