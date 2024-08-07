const mongoose = require("mongoose");

const userModel = mongoose.Schema(
	{
		email: { type: "String", required: true, unique: true },
		username: { type: "String", required: true, unique: true },
		name: { type: "String", required: true },
		password: { type: "String", required: true },
		pic: {
			type: "String",
			default: "https://icon-library.com/images/icon-user/icon-user-15.jpg",
		},

		gender: { type: "String", required: true },
	},
	{
		timestamps: true,
	}
);

userModel.methods.matchPassword = async function (enteredPassword) {
	return await (enteredPassword === this.password);
};

const user = mongoose.model("user", userModel);

module.exports = user;
