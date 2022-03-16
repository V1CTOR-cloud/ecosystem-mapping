import React from "react";

import { Select } from "@chakra-ui/react";

import Location from "assets/locations.json";

class LocationDropdown extends React.Component {
  render() {
    return (
      <div>
        <Select className="fm-ip-flds" maxWidth="656px">
          <option>Select Location</option>
          {Location.location.map((result) => (
            <option text={result.id}>{result.name}</option>
          ))}
        </Select>
      </div>
    );
  }
}

export default LocationDropdown;
