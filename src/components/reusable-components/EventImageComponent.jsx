import React from "react";
import { Box, Image, HStack } from "@chakra-ui/react";

const EventImageComponent = ({ data }) => {
  return (
    <div>
      {data.eventImage !== undefined && (
        <HStack spacing="0px">
          <Box
            w={{
              base: "80px",
              md: "110px",
              lg: "110px",
              xl: "120px",
            }}
            h={{
              base: "80px",
              md: "110px",
              lg: "110px",
              xl: "120px",
            }}
          >
            {data.eventImage !== null && (
              <div className="height-image-break2">
                <Image
                  className="img-style"
                  src={`${data.eventImage.url}`}
                  alt="Loading..."
                />
              </div>
            )}
          </Box>
        </HStack>
      )}
    </div>
  );
};

export default EventImageComponent;
