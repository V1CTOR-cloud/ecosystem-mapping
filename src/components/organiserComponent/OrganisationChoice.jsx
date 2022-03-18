import {useRef, useState} from "react";

import {useTranslation} from "react-i18next";
import SelectSearch from "react-select-search";

import "./styles.css";

const OrganisationChoice = ({ data, getOrgData, valueData }) => {
  const { t } = useTranslation();
  const searchInput = useRef();

  const [size, setSize] = useState(
    valueData && valueData.serviceOwner !== undefined
      ? {
          name: valueData.serviceOwner[0].organisationName,
          value: valueData.serviceOwner[0].id,
        }
      : {}
  );

  const options = [
    {
      type: "group",
      name: "Atlanta",
      items: data,
    },
  ];

  const handleChange = (...args) => {
    getOrgData(args[0]);
    setSize(args[0]);
  };

  const handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return options;
      }
      return items.map((list) => {
        const newItems = list.items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        return { ...list, items: newItems };
      });
    };
  };

  return (
    <div className="App">
      {data.length > 0 && (
        <SelectSearch
          ref={searchInput}
          options={options}
          filterOptions={handleFilter}
          value={size}
          name="Location"
          placeholder={t("startup.popup.service.content.choose.organisation")}
          search
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default OrganisationChoice;
