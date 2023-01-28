import React from "react";
import { useSelector } from "react-redux";
import Show from "./Show";

const Genre = (props) => {
	const { data } = props;
	return (
		<div className='mx-10 my-4'>
			<div className='mt-10 text-3xl font-medium'>{props.name}</div>
			<div className='flex overflow-auto tiles'>
				{data.map((show, index) => (
					<Show key={index} data={show} />
				))}
			</div>
		</div>
	);
};

export default Genre;
