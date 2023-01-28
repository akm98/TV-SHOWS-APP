import axios from "axios";
import {
	LOAD_ALL_SHOWS_REQUEST,
	CLEAR_ERRORS,
	LOAD_ALL_SHOWS_FAIL,
	LOAD_ALL_SHOWS_SUCCESS,
	GET_SHOW_DATA_REQUEST,
	GET_SHOW_DATA_SUCCESS,
	GET_SHOW_DATA_FAIL,
	GET_SEARCH_DATA_REQUEST,
	GET_SEARCH_DATA_SUCCESS,
	GET_SEARCH_DATA_FAIL,
} from "../Constants/showsConstant";

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};

export const getAllShows = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_ALL_SHOWS_REQUEST });

		const response = await axios.get("https://api.tvmaze.com/shows");

		dispatch({ type: LOAD_ALL_SHOWS_SUCCESS, payload: response.data });
	} catch (err) {
		dispatch({
			type: LOAD_ALL_SHOWS_FAIL,
			payload: err.response.data.message,
		});
	}
};

export const getShowDetails = (showId) => async (dispatch) => {
	try {
		dispatch({ type: GET_SHOW_DATA_REQUEST });

		const response = await axios.get(
			`https://api.tvmaze.com/shows/${showId}?embed[]=cast&embed[]=crew`
		);

		dispatch({ type: GET_SHOW_DATA_SUCCESS, payload: response.data });
	} catch (err) {
		dispatch({
			type: GET_SHOW_DATA_FAIL,
			payload: err.response.data.message,
		});
	}
};

export const getSearchResults = (keyword) => async (dispatch) => {
	try {
		dispatch({ type: GET_SEARCH_DATA_REQUEST });

		const response = await axios.get(
			`https://api.tvmaze.com/search/shows?q=${keyword}`
		);

		dispatch({ type: GET_SEARCH_DATA_SUCCESS, payload: response.data });
	} catch (err) {
		dispatch({
			type: GET_SEARCH_DATA_FAIL,
			payload: err.response.data.message,
		});
	}
};
