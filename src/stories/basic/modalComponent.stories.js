import React from "react";

import { Box, Image } from "@chakra-ui/react";
import {
  constantDraftImage,
  constantPublishImage,
  constantPublishImageStyle,
} from "../../helper/constant";
import { useArgs } from "@storybook/client-api";

import ModalComponent from "../../components/basic/ModalComponent";
import styled from "styled-components";

const TitleModal = styled.h1`
  font-family: Ubuntu, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 45px;
  letter-spacing: 0.02em;
  text-align: center;
  color: #222c2f;
`;

const ContentModal = styled.h1`
  font-family: Ubuntu, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  color: #222c2f;
`;

export default {
  title: "Modal Component",
  component: ModalComponent,
};

const ModalComponentTemplate = (args) => {
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
        <TitleModal>{args.titleText}</TitleModal>
      </Box>
      <ContentModal>{args.contentText}</ContentModal>
    </ModalComponent>
  );
};

export const Draft = ModalComponentTemplate.bind({});

Draft.args = {
  style: constantPublishImageStyle,
  image: constantPublishImage,
  titleText: "This is the title of the draft modal",
  contentText: "This is the content of the draft modal",
  isOpen: true,
};

export const Published = ModalComponentTemplate.bind({});
Published.args = {
  ...Draft.args,
  image: constantDraftImage,
  titleText: "This is the title of the published modal",
  contentText: "This is the content of the draft modal",
};
