import React from 'react'
import { Select, Box } from "@chakra-ui/react";

const IndustrySelectComponent = (props) => {
    return (
        <Box>
      {props.data &&
        <Select size='sm'
          disabled={props.data.length > 0 ? false : true}
          placeholder={"Select Industry"}
          value={props.industry}
          onChange={(e)=>{props.selectedIndustry(e.target.value)}}
        >
          { props.data.length > 0 &&
            props.data.map((industrie, key) => {
              return (
                <option value={industrie.industryName} key={key}>
                  {industrie.industryName}
                </option>
              );
            })}
        </Select>
      }
      </Box> 
    )
}

export { IndustrySelectComponent }