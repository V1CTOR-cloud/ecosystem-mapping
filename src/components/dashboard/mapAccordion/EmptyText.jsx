import React from "react";

import { Link, Text, VStack } from "@chakra-ui/react";
import PropTypes from "prop-types";

function EmptyText(props) {
  const { index } = props;

  if (index === 0) {
    return (
      <VStack justify="center">
        <Text fontSize="md">Your dashboard is still empty!</Text>
        <Link
          fontSize="md"
          color="pink.600"
          onClick={() => {
            //TODO
          }}
        >
          Click here to create your first Ecosystem Map
        </Link>
      </VStack>
    );
  } else if (index === 1) {
    return (
      <Text fontSize="md" w="100%" align="center">
        When someone invite you to a map, it will appear in this area.
      </Text>
    );
  } else {
    return (
      <Text fontSize="md" w="100%" align="center">
        This is your personal archive where you can store your old maps
      </Text>
    );
  }
}

export default EmptyText;

EmptyText.propTypes = {
  index: PropTypes.number.isRequired,
};
