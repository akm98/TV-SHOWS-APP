const moongoose = require("mongoose");

const validateName = (name) => {
	const nameRegex = /[a-zA-Z0-9&_\.-]/;
	return nameRegex.test(name);
};

const userSchema = new moongoose.Schema({
	name: {
		type: String,
		maxLength: [30, "Username is too big please use a shortform"],
		minLenght: [3, "Username is too short"],
		unique: [true, "Username already exists"],
		validate: [validateName, "Username should not contain special characters"],
		required: true,
	},

	password: {
		type: String,
		required: [true, "Please enter password"],
		select: false,
		minLength: [3, "Please enter password more than 3 characters"],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = moongoose.model("User", userSchema);
