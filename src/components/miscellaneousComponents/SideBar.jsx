import React, { useState } from "react";

import { ProSidebar } from "react-pro-sidebar";
import { Box, Image } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { SliderButton } from "helper/constant";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="l-pad" style={{ zIndex: "100" }}>
      <Box pos="relative" h="100%">
        <div
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="toggleBtn"
        >
          {!collapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          <Image
            src={SliderButton.default}
            alt="image"
            className="sidebarButton"
          />
        </div>
        <ProSidebar collapsed={collapsed}>
          {!collapsed && (
            <div className="mg-left">
              <p className="heading-sidebar">Service templates</p>
              <p className="sidebar-desc">
                Drag and drop pre-set services on the map on the left to
                familiarize yourself with the tool or get inspired
              </p>
            </div>
          )}
        </ProSidebar>
      </Box>
    </div>
  );
};

export default SideBar;
