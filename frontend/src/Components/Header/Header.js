import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
	const [keyword, setKeyword] = useState("");
	const { user } = useSelector((state) => state.loginSignup);
	const navigate = useNavigate();

	const handleInput = (value) => {
		setKeyword(value);
	};

	const searchKeyword = () => {
		if (keyword.trim()) {
			navigate(`/results/${keyword}`);
		}
	};

	return (
		<div className='flex items-center justify-between p-8 border-b-2 border-black header'>
			<Link className='text-3xl font-bold' to='/'>
				TV Maze
			</Link>
			<div className='flex items-center text-xl search-bar'>
				<span
					className='px-4 py-1 text-white bg-green-500 rounded-lg cursor-pointer'
					onClick={() => searchKeyword()}
				>
					Search
					<i className='m-2 text-black bx bx-search-alt-2 bx-rotate-90'></i>
				</span>
				<input
					type='text'
					placeholder=' '
					className='px-2 py-1 m-2 text-xl border-2 border-black'
					onChange={(e) => handleInput(e.target.value)}
				/>
				<div className='login'>
					{user && user.success ? (
						<p>{`Welcome ${user.data.name}!`}</p>
					) : (
						<Link
							className='px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer'
							to='/login'
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
