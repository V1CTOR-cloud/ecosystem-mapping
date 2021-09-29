import React from "react";
import { HStack, Box } from "@chakra-ui/react";
export const SDPScaleComponent = ({ from, to, value }) => {

	const SetWidthStart = () => {
		if (from === 100 && to === 0) {
			return 100; //Case 1 :When from =100% Means the cell wont start
		} else if (to === 100 && from === 0) {
			return 0; //Case 2 :When to =100% Means the cell end in Dark Blue colour
		} else {
			return from; //case:3 Evaluated value
		}
	};
	const SetWidthMid = () => {
		if (from === 100 && to === 0) {
			return 0; //Case 1 :When from =100% Means the cell wont start
		} else if (to === 100 && from === 0) {
			return 100; //Case 2 :When to =100% Means the cell end in Dark Blue colour
		} else {
			return from > to ? from - to : to - from; //case:3 Evaluated value
		}
	};
	const SetWidthEnd = () => {
		if (from === 100 && to === 0) {
			return 0; //Case 1 :When from =100% Means the cell wont start
		} else if (to === 100 && from === 0) {
			return 0; //Case 2 :When to =100% Means the cell end in Dark Blue colour
		} else {
			return 100 - to; //case:3 Evaluated value
		}
	};
	return (
		<HStack style={{justifyContent:'center'}} spacing='0px'>
			<div className='sdp-scale-text'>{value}</div>

			<Box
				w={() => {
					return SetWidthStart() + "%";
				}}
				h='22px'
				bg='#B4E4F8'
			/>

			<Box
				w={() => {
					return SetWidthMid() + "%";
				}}
				h='22px'
				bg='#4CA6CD'
			/>

			<Box
				w={() => {
					return SetWidthEnd() + "%";
				}}
				h='22px'
				bg='#B4E4F8'
			/>
		</HStack>
	);
};
