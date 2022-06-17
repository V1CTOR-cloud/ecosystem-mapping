import React from "react";

import moment from "moment";

import ListMap from "../../../components/dashboard/mapView/ListMap";
import GridMap from "../../../components/dashboard/mapView/GridMap";

export const listArgs = {
  isGrid: false,
  accordionItems: [
    {
      title: "My maps",
      content: [
        <ListMap
          key="0"
          data={{
            id: "",
            mapStatus: "",
            title: "Title",
            owner: {
              profileName: "Digiole",
            },
            created: moment().format("DD-MM-YYYY"),
            lastModification: moment().format("DD-MM-YYYY"),
            image: "",
            location: {
              continent: "Europe",
              country: "Finland",
              region: "",
              city: "",
            },
            industry: {
              mainIndustry: "Information Technology",
              subIndustry: "",
            },
            services: [],
          }}
        />,
        <ListMap
          key="0"
          data={{
            id: "",
            mapStatus: "",
            title: "Title",
            owner: {
              profileName: "Digiole",
            },
            created: moment().format("DD-MM-YYYY"),
            lastModification: moment().format("DD-MM-YYYY"),
            image: "",
            location: {
              continent: "Europe",
              country: "Finland",
              region: "",
              city: "",
            },
            industry: {
              mainIndustry: "Information Technology",
              subIndustry: "",
            },
            services: [],
          }}
        />,
        <ListMap
          key="0"
          data={{
            id: "",
            mapStatus: "",
            title: "Title",
            owner: {
              profileName: "Digiole",
            },
            created: moment().format("DD-MM-YYYY"),
            lastModification: moment().format("DD-MM-YYYY"),
            image: "",
            location: {
              continent: "Europe",
              country: "Finland",
              region: "",
              city: "",
            },
            industry: {
              mainIndustry: "Information Technology",
              subIndustry: "",
            },
            services: [],
          }}
        />,
      ],
    },
  ],
};

export const gridArgs = {
  isGrid: true,
  accordionItems: [
    {
      title: "My maps",
      content: [
        <GridMap
          key="0"
          data={{
            id: "",
            mapStatus: "",
            title: "Title",
            owner: {
              profileName: "Digiole",
            },
            created: moment().format("DD-MM-YYYY"),
            lastModification: moment().format("DD-MM-YYYY"),
            image: "",
            location: {
              continent: "Europe",
              country: "Finland",
              region: "",
              city: "",
            },
            industry: {
              mainIndustry: "Information Technology",
              subIndustry: "",
            },
            services: [],
          }}
        />,
        <GridMap
          key="0"
          data={{
            id: "",
            mapStatus: "",
            title: "Title",
            owner: {
              profileName: "Digiole",
            },
            created: moment().format("DD-MM-YYYY"),
            lastModification: moment().format("DD-MM-YYYY"),
            image: "",
            location: {
              continent: "Europe",
              country: "Finland",
              region: "",
              city: "",
            },
            industry: {
              mainIndustry: "Digiole",
              subIndustry: "",
            },
            services: [],
          }}
        />,
        <GridMap
          key="0"
          data={{
            id: "",
            mapStatus: "",
            title: "Title",
            owner: {
              profileName: "Digiole",
            },
            created: moment().format("DD-MM-YYYY"),
            lastModification: moment().format("DD-MM-YYYY"),
            image: "",
            location: {
              continent: "Europe",
              country: "Finland",
              region: "",
              city: "",
            },
            industry: {
              mainIndustry: "Information Technology",
              subIndustry: "",
            },
            services: [],
          }}
        />,
      ],
    },
  ],
};

export const emptyArgs = {
  isGrid: false,
  accordionItems: [
    {
      title: "My maps",
      content: [],
    },
    {
      title: "Shared with me",
      content: [],
    },
    {
      title: "Archived",
      content: [],
    },
  ],
};
