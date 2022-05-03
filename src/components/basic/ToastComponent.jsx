import { createStandaloneToast } from "@chakra-ui/react";

// Display a toast with the text pass props. For the status: "success", "error", "warning", "info" are available.
function toastComponent(text, status, duration) {
  const toast = createStandaloneToast();

  return toast({
    title: text,
    status: status,
    isClosable: true,
    duration: duration ? duration : 2000,
  });
}

export default toastComponent;
