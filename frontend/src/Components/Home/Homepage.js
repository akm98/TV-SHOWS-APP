import React, { useState, useEffect } from "react";
import Genre from "../Genre/Genre";
import Header from "../Header/Header";
import ShowsDetails from "../Genre/ShowsDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllShows, clearErrors } from "../../Redux/Actions/showsActions";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const Homepage = () => {
	const { loading, shows, error } = useSelector((state) => state.shows);

	const dispatch = useDispatch();
	const alert = useAlert();

	const [filteredShows, setFilteredShows] = useState(null);

	const getGenres = () => {
		const values = [];

		shows.forEach((show) => {
			values.push(...show.genres);
		});
		return new Set(values);
	};

	const filterShows = () => {
		const filteredShows = {};

		const uniqueGenres = getGenres();

		uniqueGenres.forEach((genre) => {
			const key = genre;
			filteredShows[key] = shows.filter((eachShow) =>
				eachShow.genres.includes(genre)
			);
		});

		setFilteredShows(filteredShows);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
			return;
		}

		dispatch(getAllShows());
	}, [dispatch, error]);

	if (shows && shows.length > 0 && !filteredShows) {
		filterShows();
	}

	return loading ? (
		<Loader />
	) : (
		<div>
			{
				<div className='Genres'>
					{filteredShows &&
						Object.keys(filteredShows).map((genreName) => (
							<Genre
								data={filteredShows[genreName]}
								key={genreName}
								name={genreName}
							/>
						))}
				</div>
			}
		</div>
	);
};

export default Homepage;
