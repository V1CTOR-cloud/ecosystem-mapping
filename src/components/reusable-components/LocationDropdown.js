import "./styles.css";
import SelectSearch from "react-select-search";
import { useRef, useState } from "react";

export default function App({ data, getLocationData,location }) {
  const [size, setSize] = useState({name:location.city,value:location.id});
  const searchInput = useRef();
  const options = [
    {
      type: "group",
      name: "Atlanta",
      items: data,
    },
  ];

  const handleChange = (...args) => {

    getLocationData(args);
    setSize(args[0])
  };

  const handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return options;
      }
      const updatedItems = items.map((list) => {
        const newItems = list.items.filter((item) => {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        });
        return { ...list, items: newItems };
      });
      return updatedItems;
    };
  };

  return (
    <div className="App">
      <SelectSearch
        ref={searchInput}
        options={options}
        filterOptions={handleFilter}
        value={size}
        name="Location"
        placeholder="Choose Location"
        search
        onChange={handleChange}
      />
    </div>
  );
}
