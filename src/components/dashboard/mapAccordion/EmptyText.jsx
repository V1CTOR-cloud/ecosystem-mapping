import React from "react";

import { Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function EmptyText(props) {
  const { index } = props;
  const { t } = useTranslation();

  if (index === 0) {
    return (
      <VStack justify="center">
        <Text fontSize="md">
          {t("mapping.dashboard.content.accordion.my.maps.empty")}
        </Text>
        <Text fontSize="md">
          {t("mapping.dashboard.content.accordion.my.maps.empty.sub")}
        </Text>
      </VStack>
    );
  } else if (index === 1) {
    return (
      <Text fontSize="md" w="100%" align="center">
        {t("mapping.dashboard.content.accordion.shared.maps.empty")}
      </Text>
    );
  } else {
    return (
      <Text fontSize="md" w="100%" align="center">
        {t("mapping.dashboard.content.accordion.archived.maps.empty")}
      </Text>
    );
  }
}

export default EmptyText;

EmptyText.propTypes = {
  index: PropTypes.number.isRequired,
};
