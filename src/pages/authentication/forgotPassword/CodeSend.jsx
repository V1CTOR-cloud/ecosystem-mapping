import React from "react";

import { Button, Center, Image, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import email from "../../../assets/images/Email.png";

export default function CodeSend({ setIndex }) {
  const { t } = useTranslation();

  return (
    <>
      <Text marginY={2.5} fontSize="xl">
        {t("common.authentication.forgot.password.reset.title")}
      </Text>
      <Center marginY={4}>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={email}
          alt="email send image"
        />
      </Center>
      <Text>
        {t("common.authentication.forgot.password.reset.confirmation")}
      </Text>
      <Center marginTop={2.5}>
        <Button onClick={() => setIndex(2)}>
          {t("common.authentication.forgot.password.button.set.password")}
        </Button>
      </Center>
    </>
  );
}

CodeSend.propTypes = {
  setIndex: PropTypes.func.isRequired,
};
