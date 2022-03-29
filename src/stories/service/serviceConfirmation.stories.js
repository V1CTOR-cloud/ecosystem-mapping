import React from "react";
import {
  constantDraftImage,
  constantDraftImageStyle,
} from "../../helper/constant";
import ServiceConfirmation from "../../components/service/ServiceConfirmation/ServiceConfirmation";

export default {
  title: "Service Confirmation",
  component: ServiceConfirmation,
};

const ServiceConfirmationTemplate = (args) => {
  return (
    <ServiceConfirmation
      buttonText={args.buttonText}
      titleText={args.titleText}
      contentText={args.contentText}
      style={constantDraftImageStyle}
      image={constantDraftImage}
      onClick={() => true}
    />
  );
};

export const Draft = ServiceConfirmationTemplate.bind({});

Draft.args = {
  titleText: "This is the title of the draft modal",
  contentText: "This is the content of the draft modal",
  buttonText: "Save in draft",
};

export const Published = ServiceConfirmationTemplate.bind({});
Published.args = {
  titleText: "This is the title of the published modal",
  contentText: "This is the content of the draft modal",
  buttonText: "Publish",
};
