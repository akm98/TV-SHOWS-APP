import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { loginSignupReducer } from "./Reducers/loginSignupReducer";
import { showsReducer } from "./Reducers/showsReducers";

const reducer = combineReducers({
	shows: showsReducer,
	loginSignup: loginSignupReducer,
});

let initialState = {};

const store = configureStore({
	reducer,
	preloadedState: initialState,
});

export default store;
