import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import moment from "moment";

const EventDateComponent = ({ data, mobile }) => {
	return (
		<div>
			<HStack spacing='0px'>
				<Box
					w={{
						base: "90px",
						md: "100px",
						lg: "110px",
						xl: "120px",
					}}
					h={{
						base: "90px",
						md: "100px",
						lg: "110px",
						xl: "120px",
					}}
					className=' box-colour'
					p={4}
					color='white'>
					<div className='height-image-break lh-normal'>
						<Text
							fontSize={{
								base: "45",
								md: "55px",
								lg: "60px",
								xl: "65px",
							}}
							align='center'
							className='date'>
							{moment(data.startDateTime).format("DD")}
						</Text>
					</div>

					<div className='height-image-break'>
						<Text
							fontSize={{ base: "30px", md: "33px", lg: "34", xl: "35px" }}
							align='center'
							className='month'>
							{moment(data.startDateTime).format("MMM")}
						</Text>
					</div>
				</Box>
			</HStack>
		</div>
	);
};

export default EventDateComponent;
