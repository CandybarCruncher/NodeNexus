const mongoose = require("mongoose");

const userModel = mongoose.Schema(
	{
		name: { type: "String", required: true },
		email: { type: "String", unique: true, required: true, unique: true },
		password: { type: "String", required: true },
		pic: {
			type: "String",
			default: "https://icon-library.com/images/icon-user/icon-user-15.jpg",
		},
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
