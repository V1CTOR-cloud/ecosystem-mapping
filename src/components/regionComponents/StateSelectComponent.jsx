import React from "react";
import { Select, Box } from "@chakra-ui/react";

const StateSelectComponent = (props) => {
  return (
    <Box>
      <Select size='sm'
        disabled={props.data.length > 0 ? false : true}
        placeholder="Select State"
        value={props.state}
        onChange={(e)=>{props.selectedState(e.target.value)}}     
      >
        {props.data.length > 0 &&
          props.data.map((p, key) => {
            return (
              <option value={p.name} key={key}>
                {p.name}
              </option>
            );
          })}
      </Select>
      {/* { props.data.length > 0 && props.invalid && props.invalid.includes("state") &&<span style={{color:'red'}}>
       * required
      </span> } */}
    </Box>
  );
};
export { StateSelectComponent };
