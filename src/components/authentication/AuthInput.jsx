import React from "react";

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

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
  return (
    <FormControl isRequired isInvalid={validation}>
      <FormLabel>{label}</FormLabel>
      <InputGroup marginY={1}>
        <InputLeftElement>{icon}</InputLeftElement>
        <Input type={type} {...field} placeholder={placeholder} />
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
