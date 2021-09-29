import React, {  useState } from "react";
import { Button, Box } from "@chakra-ui/react";

const AddEventComponent = ({ passVal, passValModal }) => {
  
  
  const [val, setVal] = useState(passValModal);
  return (
    <Box className="addEvent">
      <Button
        colorScheme="blue"
        onClick={() => {
          setVal(!val);
          passVal(!val);
        }}
        className="addEvntButton"
      >
        {!val ? "+" : "-"}
      </Button>
    </Box>
  );
};
export { AddEventComponent };
