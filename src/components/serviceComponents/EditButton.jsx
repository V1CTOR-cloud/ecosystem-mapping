import React from "react";

import { Flex, Image, Text, useDisclosure } from "@chakra-ui/react";

import imgSource from "../assets/images/Vector.png";

const EditButton = () => {
  const { onOpen } = useDisclosure();

  return (
    <Flex align="center">
      <Image onClick={onOpen} src={imgSource} alt="image" mr="1" />
      <Text onClick={onOpen} className="edit-txt">
        edit
      </Text>
    </Flex>
  );
};

export default EditButton;