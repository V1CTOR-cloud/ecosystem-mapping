import React from "react";

import NavigationBar from "../../components/bar/navigationBar/NavigationBar";

export default {
  title: "Navigation Bar",
  component: NavigationBar,
};

const NavigationBarTemplate = (args) => {
  return (
    <NavigationBar
      title={args.title}
      buttonText={args.buttonText}
      isMapDashboard={args.isMapDashboard}
    />
  );
};

export const MapDashboard = NavigationBarTemplate.bind({});

MapDashboard.args = {
  title: "My Dashboard",
  buttonText: "New ecosystem map",
  isMapDashboard: true,
};

export const EcosystemMap = NavigationBarTemplate.bind({});

EcosystemMap.args = {
  title: "Ecosystem Map Title",
  buttonText: "New Service",
  isMapDashboard: false,
};
