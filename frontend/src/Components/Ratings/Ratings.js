import React from "react";

const Ratings = ({ rating }) => {
	const Star = <i className='text-yellow-400 bx bxs-star'></i>;
	const NoStar = <i class='text-yellow-400 bx bx-star'></i>;
	const halfStar = <i class='text-yellow-400 bx bxs-star-half'></i>;

	const ratingStars = Array.from({ length: 5 }, (_, i) => {
		return rating >= i + 1 ? Star : rating >= i + 0.5 ? halfStar : NoStar;
	});

	return <div className='text-4xl'>{ratingStars}</div>;
};

export default Ratings;
