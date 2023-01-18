import React from "react";

import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="4xl">404 | This page could not be found.</Text>
      <Button onClick={() => navigate(`/`, { replace: true })} marginTop={10}>
        Go to home
      </Button>
    </Box>
  );
}
