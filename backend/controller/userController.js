const User = require("../model/userModel");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");

const handleError = (res, status, message) => {
	return res.status(status).json({
		success: false,
		error: message,
	});
};

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, password } = req.body;
	const userExist = await User.findOne({ name });
	if (userExist) {
		return next(handleError(res, 401, "Username already Exists"));
	}
	const user = await User.create({
		name,
		password,
	});

	res.status(200).json({
		success: true,
		data: user,
	});
});

exports.userLogin = catchAsyncErrors(async (req, res, next) => {
	const { name, password } = req.body;
	if (!name || !password) {
		return next(handleError(res, 401, "Please enter name or password"));
	}
	//finding by only name and selecting password because password has select false property
	const user = await User.findOne({ name }).select("+password");

	if (!user) {
		return next(handleError(res, 401, "Please enter correct name or password"));
	}

	if (user.password !== password) {
		return next(handleError(res, 401, "Please enter correct name or password"));
	}

	res.status(200).json({
		success: true,
		data: user,
	});
});
