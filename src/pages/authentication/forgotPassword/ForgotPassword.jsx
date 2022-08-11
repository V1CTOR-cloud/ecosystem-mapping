import React, { useState } from "react";

import { Center, Flex, Link, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import UsernameInformation from "./UsernameInformation";
import CodeSend from "./CodeSend";
import ResetPassword from "./ResetPassword";

function ForgotPassword({ setIndex }) {
  const { t } = useTranslation();
  const [contentIndex, setContentIndex] = useState(0);

  return (
    <Flex marginX={5} flexDirection="column" h="100%">
      {contentIndex === 0 && <UsernameInformation setIndex={setContentIndex} />}
      {contentIndex === 1 && <CodeSend setIndex={setContentIndex} />}
      {contentIndex === 2 && <ResetPassword setIndex={setIndex} />}
      <Spacer />
      <Center flexDirection="column">
        <Link color="brand.500" fontSize="md" onClick={() => setIndex(0)}>
          {t("common.authentication.forgot.password.back.login")}
        </Link>
      </Center>
    </Flex>
  );
}

export default ForgotPassword;

ForgotPassword.propTypes = {
  setIndex: PropTypes.func.isRequired,
};
