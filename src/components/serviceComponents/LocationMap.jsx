import React from "react";

import { Box, Text, Image, useDisclosure } from "@chakra-ui/react";
import Iframe from "react-iframe";

import imgSearch from "../../assets/images/search.png";
import imgEditIcon from "../../assets/images/Edit.png";

const LocationMap = () => {
  const { onOpen } = useDisclosure();

  return (
    <Box mt="10px">
      <Iframe
        width="550px"
        height="300px"
        alt="demo"
        borderWidth="1px"
        url={
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
        }
      />
      <Box p="6" background="#FFFFFF" width="550px" borderWidth="1px">
        <Box d="flex" alignItems="center" flexWrap="wrap">
          <Box flex="1">
            <Text className="col-gray f-14 ff-ubuntu">
              Saint George RoadSaint George Road, Staten Island, NY, 10306
            </Text>
          </Box>
          <Box flex="1" d="inline-flex" justifyContent="flex-end">
            <Image onClick={onOpen} src={imgEditIcon} alt="image" mr="15px" />
            <Image onClick={onOpen} src={imgSearch} alt="image" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LocationMap;
