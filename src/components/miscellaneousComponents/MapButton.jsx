import React from "react";

import { Button } from "@chakra-ui/react";

const MapButton = ({ setFormOpen }) => {
  return (
    <Button onClick={() => setFormOpen(true)} colorScheme="blue">
      Button
    </Button>
  );
};

export default MapButton;
