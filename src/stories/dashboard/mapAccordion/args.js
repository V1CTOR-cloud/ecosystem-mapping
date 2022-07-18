import React from "react";

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
            creation: "2022-06-22",
            lastModification: "2022-06-22",
            image: "",
            location: [
              {
                continent: "Europe",
                country: "Finland",
                region: "",
                city: "",
              },
            ],
            industry: [
              {
                mainIndustry: "Information Technology",
                subIndustry: "",
              },
            ],
            service: [],        isVisible: true,

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
            creation: "2022-06-22",
            lastModification: "2022-06-22",
            image: "",
            location: [
              {
                continent: "Europe",
                country: "Finland",
                region: "",
                city: "",
              },
            ],
            industry: [
              {
                mainIndustry: "Information Technology",
                subIndustry: "",
              },
            ],
            service: [],        isVisible: true,

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
            creation: "2022-06-22",
            lastModification: "2022-06-22",
            image: "",
            location: [
              {
                continent: "Europe",
                country: "Finland",
                region: "",
                city: "",
              },
            ],
            industry: [
              {
                mainIndustry: "Information Technology",
                subIndustry: "",
              },
            ],
            service: [],        isVisible: true,

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
            creation: "2022-06-22",
            lastModification: "2022-06-22",
            image: "",
            location: [
              {
                continent: "Europe",
                country: "Finland",
                region: "",
                city: "",
              },
            ],
            industry: [
              {
                mainIndustry: "Information Technology",
                subIndustry: "",
              },
            ],
            service: [],        isVisible: true,

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
            creation: "2022-06-22",
            lastModification: "2022-06-22",
            image: "",
            location: [
              {
                continent: "Europe",
                country: "Finland",
                region: "",
                city: "",
              },
            ],
            industry: [
              {
                mainIndustry: "Digiole",
                subIndustry: "",
              },
            ],
            service: [],        isVisible: true,

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
            creation: "2022-06-22",
            lastModification: "2022-06-22",
            image: "",
            location: [
              {
                continent: "Europe",
                country: "Finland",
                region: "",
                city: "",
              },
            ],
            industry: [
              {
                mainIndustry: "Information Technology",
                subIndustry: "",
              },
            ],
            service: [],        isVisible: true,

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
