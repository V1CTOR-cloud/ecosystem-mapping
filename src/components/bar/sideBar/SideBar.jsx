import React, { useState } from "react";

import { TableChart } from "@styled-icons/material-outlined";
import styled from "styled-components";
import { Draft } from "@styled-icons/remix-line/Draft";
import { Archive } from "@styled-icons/boxicons-regular";
import { Accordion } from "@chakra-ui/accordion";

import ButtonComponent from "../../basic/ButtonComponent";
import AccordionItemComponent from "./AccordionItemComponent";
import {
  blackColor,
  blueColor,
  smallPadding,
  whiteColor,
} from "../../../helper/constant";

const SideBarContainer = styled.div`
  position: absolute;
  background-color: ${whiteColor};
  z-index: 100;
  width: 50px;
  // Height depending of the filter bar: 75px for the navbar and 60px for the filter bar when open
  height: ${(props) =>
    props.isFilterOpen ? "calc(100% - 135px)" : "calc(100% - 75px)"};
  &:hover {
    width: 250px
  }
}`;

function SideBar(props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const buttons = [
    {
      title: "Service Templates",
      icon: [
        <TableChart color={blueColor} />,
        <TableChart color={blackColor} />,
      ],
      children: [
        <ButtonComponent
          key="Financing"
          buttonText="Financing"
          isPrimary={true}
          onClick={() => {}}
          width="100%"
          padding={`0 ${smallPadding} 0 ${smallPadding}`}
          borderRadius="50"
        />,
        <ButtonComponent
          key="Business Model"
          buttonText="Business Model"
          isPrimary={true}
          onClick={() => {}}
          width="100%"
          padding={`${smallPadding} ${smallPadding} 0 ${smallPadding}`}
          borderRadius="50"
        />,
      ],
    },
    {
      title: "Draft Services",
      icon: [<Draft color={blueColor} />, <Draft color={blackColor} />],
      children: [],
    },
    {
      title: "Archived Services",
      icon: [<Archive color={blueColor} />, <Archive color={blackColor} />],
      children: [],
    },
  ];

  function handleClick() {
    //todo
  }

  function handleOnMouseOver() {
    setIsCollapsed(false);
  }

  function handleOnMouseLeave() {
    setIsCollapsed(true);
  }

  return (
    <SideBarContainer
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      isFilterOpen={props.isFilterOpen}
    >
      <Accordion allowToggle>
        {buttons.map((button) => (
          <AccordionItemComponent
            key={button.title}
            onClick={handleClick}
            isCollapsed={isCollapsed}
            button={button}
          />
        ))}
      </Accordion>
    </SideBarContainer>
  );
}

export default SideBar;
