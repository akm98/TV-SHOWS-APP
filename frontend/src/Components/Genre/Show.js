import React from "react";
import { Link } from "react-router-dom";
import PlaceHolderImg from "../../Assets/Placeholder.jpg";
const Show = ({ data }) => {
	return (
		<Link
			className='w-48 my-2 mr-8 font-bold text-center shrink-0 '
			to={`/show/${data.id}/${data.name.split(" ").join("-")}`}
		>
			<img
				className='my-4'
				src={data && data.image ? data.image.medium : PlaceHolderImg}
			/>
			{data.name}
		</Link>
	);
};

export default Show;
