import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../Redux/Actions/loginSignupActions";
import { clearErrors } from "../../Redux/Actions/showsActions";
import Loader from "../Loader/Loader";

const SignUp = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const alert = useAlert();

	const { user, loading, error } = useSelector((state) => state.loginSignup);
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [confrimPassword, setConfrimPassword] = useState("");

	const [formErrors, setFormErrors] = useState({
		username: "",
		password: "",
		confrimPassword: "",
	});

	const formIsValid = () => {
		const formErrors = {
			username: "",
			password: "",
			confrimPassword: "",
		};

		const nameRegex = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;

		let isValid = true;

		if (userName.length < 3) {
			formErrors.username = "UserName must be at least 3 characters";
			isValid = false;
		}

		if (nameRegex.test(userName)) {
			formErrors.username = "UserName should not contain special characters";
			isValid = false;
		}

		if (password === "") {
			formErrors.password = "Password is required";
			isValid = false;
		}
		if (password !== confrimPassword) {
			formErrors.confrimPassword = "Password should be same";
			isValid = false;
		}

		setFormErrors(formErrors);
		return isValid;
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
		dispatch(register(userName.trim(), password));
	};
	return loading ? (
		<Loader />
	) : (
		<div className='flex flex-col items-center justify-center my-10 border mx-96'>
			<p className='mt-4 text-2xl font-medium'>Create a new Account</p>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className='flex flex-col items-start justify-start'>
					<div className='flex items-center justify-between w-full p-2 m-2'>
						Username:
						<div>
							<input
								type='text'
								placeholder='UserName'
								className='p-2 border w-80'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								required
							/>{" "}
							{formErrors.username && (
								<div className='flex items-center justify-start w-full text-red-500'>
									{formErrors.username}
								</div>
							)}
						</div>
					</div>
					<div className='flex items-center justify-between w-full p-2 m-2'>
						Password:
						<div>
							<input
								type='password'
								id='password'
								placeholder='Password'
								className='p-2 border w-80'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							{formErrors.password && (
								<div className='flex items-center justify-center w-full text-red-500'>
									{formErrors.password}
								</div>
							)}
						</div>
					</div>

					<div className='flex items-center justify-between w-full p-2 m-2'>
						Confirm Password:
						<div>
							<input
								type='password'
								id='confirmPassword'
								placeholder='Confirm Password'
								className='p-2 border w-80'
								value={confrimPassword}
								onChange={(e) => setConfrimPassword(e.target.value)}
								required
							/>
							{formErrors.confrimPassword && (
								<div className='flex items-center justify-start w-full text-red-500'>
									{" "}
									{formErrors.confrimPassword}
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='flex items-center justify-center p-2 m-2'>
					<input
						type='submit'
						className='px-8 py-1 text-white bg-green-500 rounded-md cursor-pointer'
						value='SignUp'
					/>
				</div>
			</form>
			<div className='mb-4'>
				<p>
					Have an account?{" "}
					<Link to='/login' className='text-blue-600'>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignUp;
