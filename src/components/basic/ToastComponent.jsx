import { createStandaloneToast } from "@chakra-ui/react";

// Display a toast with the text pass props. For the status: "success", "error", "warning", "info" are available.
function ToastComponent(text, status, duration) {
  const { toast, ToastContainer } = createStandaloneToast();

  toast({
    title: text,
    status: status,
    isClosable: true,
    duration: duration ? duration : 2000,
  });

  return ToastContainer;
}

export default ToastComponent;
