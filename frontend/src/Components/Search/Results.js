import React, { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getSearchResults,
	clearErrors,
} from "../../Redux/Actions/showsActions";
import Show from "../Genre/Show";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";

const Results = () => {
	const match = useMatch("/results/:keyword");
	const dispatch = useDispatch();
	const alert = useAlert();

	const { loading, results, error } = useSelector((state) => state.shows);
	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
			return;
		}
		dispatch(getSearchResults(match.params.keyword));
	}, [dispatch, match, error]);

	return loading ? (
		<Loader />
	) : (
		<div>
			{results.length == 0 ? (
				"No Results Found"
			) : (
				<div className='flex flex-wrap m-10'>
					{results.map((each) => (
						<Show data={each.show} />
					))}
				</div>
			)}
		</div>
	);
};

export default Results;
