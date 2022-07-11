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
            service: [],
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
            service: [],
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
            service: [],
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
            service: [],
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
            service: [],
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
            service: [],
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
