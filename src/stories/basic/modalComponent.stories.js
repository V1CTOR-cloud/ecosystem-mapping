import React from "react";

import { Box, Container, Image } from "@chakra-ui/react";
import {
  constantDraftImage,
  constantPublishImage,
  constantPublishImageStyle,
} from "../../helper/constant";
import { useArgs } from "@storybook/client-api";

import ModalComponent from "../../components/basic/ModalComponent";

export default {
  title: "Modal Component",
  component: ModalComponent,
};

const Modal = (args) => {
  const [{ isOpen }, updateArgs] = useArgs();

  return (
    <ModalComponent
      isOpen={args.isOpen}
      onClose={() => updateArgs({ isOpen: !isOpen })}
    >
      <Box mt="91px">
        <Image style={args.style} src={args.image} alt="image" />
      </Box>
      <Box mt="60px">
        <h1 className="md-msg">{args.titleText}</h1>
      </Box>
      <Container mt="24px" width="507px" height="44px" alignItems="center">
        <h1 className="md-txt">{args.contentText}</h1>
      </Container>
    </ModalComponent>
  );
};

//👇 Each story then reuses that template
export const Draft = Modal.bind({});

Draft.args = {
  style: constantPublishImageStyle,
  image: constantPublishImage,
  titleText: "This is the title of the draft modal",
  contentText: "This is the content of the draft modal",
  isOpen: true,
};

export const Published = Modal.bind({});
Published.args = {
  ...Draft.args,
  image: constantDraftImage,
  titleText: "This is the title of the published modal",
  contentText: "This is the content of the draft modal",
};
