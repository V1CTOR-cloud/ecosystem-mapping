import { Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import imgSource from '../assets/images/Vector.png';

export default function EditButton() {
    const { onOpen } = useDisclosure();
  return (
    <Flex align="center">
      <Image onClick={onOpen} src={imgSource} alt="image" mr="1" />
      <Text onClick={onOpen} className="edit-txt">
        edit
      </Text>
    </Flex>
  );
}
