import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/Actions/loginSignupActions";
import { clearErrors } from "../../Redux/Actions/showsActions";
import Loader from "../Loader/Loader";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();

	const { loading, user, error } = useSelector((state) => state.loginSignup);

	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const formIsValid = () => {
		return true;
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
			return;
		}

		if (user && user.success) {
			navigate("/");
		}
	}, [dispatch, loading, user, error]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formIsValid()) return;
		dispatch(login(userName.trim(), password));
	};

	return loading ? (
		<Loader />
	) : (
		<div className='flex flex-col items-center justify-center my-10 border mx-96'>
			<p className='mt-4 text-2xl font-medium'>Login</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className='flex items-center justify-center p-4 m-4'>
					Username:
					<input
						type='text'
						placeholder='UserName'
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className='w-64 p-2 mx-4 border'
					/>
				</div>
				<div className='flex items-center justify-center p-4 m-2'>
					Password:
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-64 p-2 mx-4 border'
					/>
				</div>
				<div className='flex items-center justify-center p-4 m-2'>
					<input
						type='submit'
						className='px-8 py-1 text-white bg-green-500 rounded-md cursor-pointer'
						value='Login'
					/>
				</div>
			</form>
			<div className='mb-4'>
				<p>
					Dont have an account?{" "}
					<Link to='/signup' className='text-blue-600'>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
