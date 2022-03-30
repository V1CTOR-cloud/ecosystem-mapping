import React from "react";
import {
  constantDraftImage,
  constantDraftImageStyle,
} from "../../helper/constant";
import ButtonOpenModal from "../../components/service/ServiceConfirmation/ButtonOpenModal";

export default {
  title: "Button that open modal",
  component: ButtonOpenModal,
};

const ButtonOpenModalTemplate = (args) => {
  return (
    <ButtonOpenModal
      textButton={args.textButton}
      isPrimaryButton={args.isPrimaryButton}
      titleText={args.titleText}
      contentText={args.contentText}
      style={constantDraftImageStyle}
      image={constantDraftImage}
      onClick={() => true}
    />
  );
};

export const Draft = ButtonOpenModalTemplate.bind({});

Draft.args = {
  titleText: "This is the title of the draft modal",
  contentText: "This is the content of the draft modal",
  textButton: "Save in draft",
};

export const Published = ButtonOpenModalTemplate.bind({});
Published.args = {
  titleText: "This is the title of the published modal",
  contentText: "This is the content of the draft modal",
  textButton: "Publish",
  isPrimaryButton: true,
};
