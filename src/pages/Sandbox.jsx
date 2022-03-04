// import React from "react";

// const Sandbox = () => {
//   return <>Loading...</>;
// };
// export { Sandbox };

// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import Service from "service/RegionServices";
// import { SimpleGrid } from "@chakra-ui/react";
// import { CitySelectComponent } from "components/regionComponents/CitySelectComponent";
// import { StateSelectComponent } from "components/regionComponents/StateSelectComponent";
// import { CountrySelectComponent } from "components/regionComponents/CountrySelectComponent";

// const Sandbox = () => {
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCites] = useState([]);
//   useEffect(() => {
//     Service.getCountries().then((res) => {
//       setCountries(res.data);
//     });
//   }, []);
//   const selectedCountry = (e) => {
//     setStates([]);
//     setCites([]);
//     Service.getStates(e).then((res) => {
//       setStates(res.data);
//     });
//   };

//   const selectedState = (e) => {
//     setCites([]);
//     Service.getCities(e).then((res) => {
//       setCites(res.data);
//     });
//   };
//   const selectedCity = (e) => {};
//   return (
//     <>
//       <SimpleGrid columns={3} spacing={4}>
//         <CountrySelectComponent
//           data={countries}
//           selectedCountry={(s) => selectedCountry(s)}
//         />
//         <StateSelectComponent
//           data={states}
//           selectedState={(s) => selectedState(s)}
//         />
//         <CitySelectComponent
//           data={cities}
//           selectedCity={(s) => selectedCity(s)}
//         />
//       </SimpleGrid>
//     </>
//   );
// };
// export { Sandbox };

import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "redux/actions";

const Sandbox = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <Box>
      <Button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </Button>
      <Text>{counter}</Text>
    </Box>
  );
};
export { Sandbox };
