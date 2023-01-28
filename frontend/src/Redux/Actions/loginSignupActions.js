import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
} from "../Constants/loginSignupConstant";
import axios from "axios";

const config = { headers: { "Content-Type": "application/json" } };

export const register = (name, password) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_REQUEST });
		const response = await axios.post(
			"https://tv-shows-backend.vercel.app/api/user/register",
			{ name, password },
			config
		);

		dispatch({ type: REGISTER_SUCCESS, payload: response.data });
	} catch (err) {
		dispatch({
			type: REGISTER_FAIL,
			payload: err.response.data.error,
		});
	}
};

export const login = (name, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_REQUEST });

		const response = await axios.post(
			"https://tv-shows-backend.vercel.app/api/user/login",
			{ name, password },
			config
		);

		dispatch({ type: LOGIN_SUCCESS, payload: response.data });
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
			payload: err.response.data.error,
		});
	}
};
