import React from 'react';
import { Image, Box, Flex } from '@chakra-ui/react';
//import { financeProfessional } from 'helper/constant';
import imgSource from '../../assets/images/In-HouseFinanceProfessional12.png';

export default function DashboardImages() {
  //   const mystyle = {
  //     position: 'static',
  //     width: '100%',
  //     //height:"900px",
  //     //mt: '476',
  //     //ml: '52',
  //     color: 'white',
  //     //backgroundColor: "DodgerBlue",
  //     //padding: "10px",
  //     //fontFamily: "Arial"
  //   };
  return (
    // <Box style={mystyle} boxSize="md">
    //   <Image  src={imgSource} alt="image" />
    // </Box>
    <Flex>
      <Box flex="1">
        <Image width="70%" ml="auto" src={imgSource} alt="image" />
      </Box>
    </Flex>
  );
}
