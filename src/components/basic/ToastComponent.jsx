import { createStandaloneToast } from "@chakra-ui/react";

// Display a toast with the text pass props. For the status: "success", "error", "warning", "info" are available.
/**
 * Display a toast message with a text. Multiple style are available depending on the need.
 * @param text The message display inside the toast.
 * @param status The style that we want to give to our toast. (success, error, warning and info).
 * @param duration The time during which the toast stay on the screen. Default: 2000ms.
 */
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
