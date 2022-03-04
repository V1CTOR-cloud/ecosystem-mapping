import React from 'react'
import  Location  from 'assets/locations.json';
import { Select } from '@chakra-ui/react';

class LocationDropdown extends React.Component {
    
    render(){
        
        return(
            <div>
                <Select className="fm-ip-flds" maxWidth="656px">
                    <option>Select Location</option>
                    {
                        Location.location.map((result)=>(<option text={result.id}>{result.name}</option>))
                    }
                </Select>
            </div>
        )
    }
    
    
    
}
export default LocationDropdown;