const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
		banner: {
			type: "String",
			default:
				"https://as1.ftcdn.net/v2/jpg/02/95/38/06/1000_F_295380677_lgebFC9qKtBSu7Fe4aVULhAfwQ89b6MC.jpg",
		},
		gender: { type: "String", required: true },
		bio: { type: "string" },
	},
	{
		timestamps: true,
	}
);

userModel.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
	if (!this.isModified) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const user = mongoose.model("user", userModel);

module.exports = user;
