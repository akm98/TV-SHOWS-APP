import React, { useState, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getShowDetails, clearErrors } from "../../Redux/Actions/showsActions";
import Loader from "../Loader/Loader";
import Ratings from "../Ratings/Ratings";
import { useAlert } from "react-alert";
import PlaceHolderImg from "../../Assets/Placeholder.jpg";

const ShowsDetails = (props) => {
	const dispatch = useDispatch();
	const match = useMatch("/show/:id/:name");
	const alert = useAlert();

	const [producer, setProducer] = useState("");
	const [cast, setCast] = useState([""]);
	const { showDetails, loading, error } = useSelector((state) => state.shows);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
			return;
		}
		dispatch(getShowDetails(match.params.id));
	}, [dispatch, error]);

	useEffect(() => {
		if (showDetails) {
			// Get crewMembers details
			const crew = showDetails._embedded.crew;
			const producers = crew.filter((each) => each.type == "Producer");
			if (producers.length > 0) {
				setProducer(producers[0].person.name);
			} else if (crew.length > 0) {
				setProducer(crew[0].person.name);
			} else {
				setProducer("No Data Found");
			}

			// Get Cast Details

			const cast = showDetails._embedded.cast
				.slice(0, 3)
				.map((e) => e.person.name);

			if (cast.length > 0) {
				setCast(cast);
			} else {
				setCast(["No Data Found"]);
			}
		}
	}, [showDetails]);

	return loading || showDetails === null ? (
		<Loader />
	) : (
		<div className='flex m-10'>
			{/* Image */}

			<div className='h-auto mx-10 w-96'>
				<img
					src={
						showDetails.image && showDetails.image.original
							? showDetails.image.original
							: PlaceHolderImg
					}
				/>
			</div>

			{/* Data */}

			<div className='w-full'>
				<div className='flex justify-between text-xl'>
					<p className='font-bold'>
						Title: {showDetails.name} | Ratings: {showDetails.rating.average}
					</p>
					<Ratings rating={showDetails.rating.average / 2} />
				</div>
				<div className='text-xl'>
					<p>
						<span className='font-bold'>Premiered: </span>
						{showDetails.premiered} |{" "}
						<span className='font-bold'>Duration: </span> {showDetails.runtime}{" "}
						mins | <span className='font-bold'>Producer: </span> {producer}
					</p>
					<p className='my-4'>
						<span className='font-bold'>Cast</span>: {cast.join(" | ")}
					</p>
					<div className=''>
						{" "}
						<span className='font-bold'>Movie Description: </span>
						<div dangerouslySetInnerHTML={{ __html: showDetails.summary }} />
					</div>
				</div>
				<div className=''></div>
			</div>
		</div>
	);
};

export default ShowsDetails;
