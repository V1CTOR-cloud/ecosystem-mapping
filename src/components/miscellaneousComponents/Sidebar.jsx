import React, { useState } from "react";
import { ProSidebar } from "react-pro-sidebar";
// import { Menu, MenuItem } from "react-pro-sidebar";
import { SliderButton } from "helper/constant";
import { Image, Box } from "@chakra-ui/react";
import "react-pro-sidebar/dist/css/styles.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
// import PublishedServiceForm from "../serviceComponents/PublishedServiceForm";

const Sidebar = ({ items }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="l-pad" style={{zIndex:"100"}}>
       
      <Box pos="relative" h="100%">
        <div
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="tooglebtn"
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
            <>
              <div className="mg-left" mt="7">
                <p className="heading-sidebar">Service templates</p>
                <p className="sidebar-desc">
                  Drag and drop pre-set services on the map on the left to
                  fammiliarize yourself with the tool or get inspired
                </p>
              </div>
{/* 
              <Menu  iconShape="square">
                {items.length > 0 &&
                  items.map((p) => {
                    return <MenuItem onClick={()=>{}}><PublishedServiceForm name={p.serviceName} /></MenuItem>;
                  })}
              </Menu> */}
            </>
          )}
        </ProSidebar>
      </Box>
    </div>
  );
};
export { Sidebar };
