import React, { useState } from "react";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function AuthInput({
  field,
  label,
  error,
  helper,
  validation,
  placeholder,
  type,
  icon,
}) {
  const [isShown, setIsShown] = useState(false);
  const inputType =
    type === "password" && !isShown
      ? "password"
      : type === "password" && isShown
      ? "text"
      : type;

  return (
    <FormControl isRequired isInvalid={validation}>
      <FormLabel>{label}</FormLabel>
      <InputGroup marginY={1}>
        <InputLeftElement>{icon}</InputLeftElement>
        <Input type={inputType} {...field} placeholder={placeholder} />
        {type === "password" && (
          <InputRightElement width="4.5rem">
            {isShown === true ? (
              <ViewOffIcon
                color="blackAlpha.700"
                h="1.75rem"
                size="sm"
                onClick={() => setIsShown((previousState) => !previousState)}
              />
            ) : (
              <ViewIcon
                color="blackAlpha.700"
                h="1.75rem"
                size="sm"
                onClick={() => setIsShown((previousState) => !previousState)}
              />
            )}
          </InputRightElement>
        )}
      </InputGroup>
      {validation ? (
        <FormErrorMessage>{error}</FormErrorMessage>
      ) : (
        <FormHelperText color="blackAlpha.500">{helper}</FormHelperText>
      )}
    </FormControl>
  );
}

AuthInput.defaultProps = {
  type: "text",
};

AuthInput.propTypes = {
  type: PropTypes.string,
  validation: PropTypes.any,
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  helper: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default AuthInput;
