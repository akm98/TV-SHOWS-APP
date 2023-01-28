import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_ERRORS,
} from "../Constants/loginSignupConstant";

export const loginSignupReducer = (
	state = {
		user: [],
		loading: false,
		error: null,
	},
	action
) => {
	switch (action.type) {
		case REGISTER_REQUEST:
			return { ...state, loading: true, shows: [] };

		case REGISTER_SUCCESS:
			return { ...state, loading: false, user: action.payload };

		case REGISTER_FAIL:
			return { ...state, loading: false, error: action.payload };

		case LOGIN_REQUEST:
			return { ...state, loading: true };

		case LOGIN_SUCCESS:
			return { ...state, loading: false, user: action.payload };

		case LOGIN_FAIL:
			return { ...state, loading: false, error: action.payload };
		case CLEAR_ERRORS:
			return { ...state, loading: false, error: null };

		default:
			return state;
	}
};
