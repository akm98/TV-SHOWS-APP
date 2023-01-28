import {
	LOAD_ALL_SHOWS_REQUEST,
	LOAD_ALL_SHOWS_FAIL,
	LOAD_ALL_SHOWS_SUCCESS,
	CLEAR_ERRORS,
	GET_SHOW_DATA_REQUEST,
	GET_SHOW_DATA_SUCCESS,
	GET_SHOW_DATA_FAIL,
	GET_SEARCH_DATA_REQUEST,
	GET_SEARCH_DATA_SUCCESS,
	GET_SEARCH_DATA_FAIL,
} from "../Constants/showsConstant";

export const showsReducer = (
	state = {
		shows: [],
		loading: false,
		showDetails: null,
		error: null,
		results: [],
	},
	action
) => {
	switch (action.type) {
		case LOAD_ALL_SHOWS_REQUEST:
			return { ...state, loading: true, shows: [] };

		case LOAD_ALL_SHOWS_SUCCESS:
			return { ...state, loading: false, shows: action.payload };

		case LOAD_ALL_SHOWS_FAIL:
			return { ...state, loading: false, error: action.payload };

		case GET_SHOW_DATA_REQUEST:
			return { ...state, loading: true };

		case GET_SHOW_DATA_SUCCESS:
			return { ...state, loading: false, showDetails: action.payload };

		case GET_SHOW_DATA_FAIL:
			return { ...state, loading: false, error: action.payload };

		case GET_SEARCH_DATA_REQUEST:
			return { ...state, loading: true };

		case GET_SEARCH_DATA_SUCCESS:
			return { ...state, loading: false, results: action.payload };

		case GET_SEARCH_DATA_FAIL:
			return { ...state, loading: false, error: action.payload };

		case CLEAR_ERRORS:
			return { ...state, loading: false, error: null };

		default:
			return state;
	}
};
