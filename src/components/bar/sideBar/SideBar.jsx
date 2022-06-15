import React, { useEffect, useState } from "react";

import { TableChart } from "@styled-icons/material-outlined";
import styled from "styled-components";
import { Draft } from "@styled-icons/remix-line";
import { Archive } from "@styled-icons/boxicons-regular";
import { Accordion, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import AccordionItemComponent from "./AccordionItemComponent";

const SideBarContainer = styled.div`
  position: absolute;
  background-color: white;
  z-index: 100;
  width: 50px;
  // Height depending of the filter bar: 75px for the navbar and 60px for the filter bar when open
  height: ${({ isFilterOpen }) =>
    isFilterOpen ? "calc(100% - 135px)" : "calc(100% - 75px)"};

  &:hover {
    width: 250px
  }
}`;

function SideBar(props) {
  const { t } = useTranslation();
  const {
    archivedData,
    onOpenFormEdition,
    handleServiceClick,
    isFilterOpen,
    draftData,
  } = props;

  const initialAccordionButtons = [
    {
      key: 0,
      title: t("mapping.canvas.side.bar.toggle.service.templates"),
      icon: <TableChart />,
      children: [
        <Button
          key="Financing"
          w="100%"
          marginBottom="0.5rem"
          onClick={() => {}}
        >
          Financing
        </Button>,
        <Button key="Business Model" w="100%" onClick={() => {}}>
          Business Model
        </Button>,
      ],
    },
    {
      key: 1,
      title: t("mapping.canvas.side.bar.toggle.draft.services"),
      icon: <Draft />,
      children: [],
    },
    {
      key: 2,
      title: t("mapping.canvas.side.bar.toggle.archived.services"),
      icon: <Archive />,
      children: [],
    },
  ];
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [accordionButtons] = useState(initialAccordionButtons);

  // Update the draft buttons and archived buttons at every update or creation of a service
  useEffect(() => {
    accordionButtons[2].children = [];
    accordionButtons[1].children = [];

    archivedData.forEach((service) => {
      accordionButtons[2].children.push(
        <Button
          key={service.id}
          w="100%"
          marginBottom="0.5rem"
          onClick={() => handleDraftOrArchivedServiceClick(service)}
        >
          {service.serviceName}
        </Button>
      );
    });

    draftData.forEach((service) => {
      accordionButtons[1].children.push(
        <Button
          key={service.id}
          w="100%"
          marginBottom="0.5rem"
          onClick={() => handleDraftOrArchivedServiceClick(service)}
        >
          {service.serviceName}
        </Button>
      );
    });
  });

  function handleOnMouseOver() {
    setIsCollapsed(false);
  }

  function handleOnMouseLeave() {
    setIsCollapsed(true);
  }

  function handleDraftOrArchivedServiceClick(service) {
    onOpenFormEdition();
    handleServiceClick(service);
  }

  return (
    <SideBarContainer
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      isFilterOpen={isFilterOpen}
    >
      <Accordion allowToggle>
        {accordionButtons.map((thisAccordionButtons) => (
          <AccordionItemComponent
            key={thisAccordionButtons.key}
            isCollapsed={isCollapsed}
            button={thisAccordionButtons}
          />
        ))}
      </Accordion>
    </SideBarContainer>
  );
}

SideBar.propTypes = {
  isFilterOpen: PropTypes.bool.isRequired,
  archivedData: PropTypes.array.isRequired,
  draftData: PropTypes.array.isRequired,
  onOpenFormEdition: PropTypes.func.isRequired,
  handleServiceClick: PropTypes.func.isRequired,
};

export default SideBar;
