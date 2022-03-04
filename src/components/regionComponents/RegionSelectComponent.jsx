import React from "react";
import { Select, Box } from "@chakra-ui/react";

const RegionSelectComponent = (props) => {
  
  return (
    <Box>
      <Select
        size="sm"
        disabled={props.data.length > 0 ? false : true}
        placeholder={"Select Region"}
        value={props.region}
        onChange={(e) => {
          props.selectedRegion(e.target.value);
        }}
      >
        {props.data.length > 0 &&
          props.data.map((p, key) => {
            return (
              <option value={p} key={key}>
                {p}
              </option>
            );
          })}
      </Select>
    {/* { props.invalid && props.invalid.includes("region") &&<span style={{color:'red'}}>
       * required
      </span> } */}
    </Box>
  );
};

export { RegionSelectComponent };
