const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
	const { email, username, name, password, pic, gender } = req.body;

	if (!email || !username || !name || !password || !gender) {
		res.status(400);
		throw new Error("Please Enter all the Fields");
	}

	const userExists = await user.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const User = await user.create({
		email,
		username,
		name,
		password,
		pic,
		gender,
	});

	if (User) {
		res.status(201).json({
			_id: User._id,
			email: User.email,
			username: User.username,
			name: User.name,
			// isAdmin: user.isAdmin,
			pic: User.pic,
			banner: User.banner,
			gender: User.gender,
			bio: User.bio,
			token: generateToken(User._id),
		});
	} else {
		res.status(400);
		throw new Error("failed to create user");
	}
});

const userExists = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const userExists = await user.findOne({ email });
	if (userExists) {
		res.json({
			_id: userExists._id,
		});
	} else {
		// res.status(203);
		throw new Error("mail not registered");
	}
});

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const userExists = await user.findOne({ email });

	if (userExists && (await userExists.matchPassword(password))) {
		res.json({
			_id: userExists._id,
			name: userExists.name,
			email: userExists.email,
			username: userExists.username,
			// isAdmin: userExists.isAdmin,
			pic: userExists.pic,
			banner: userExists.banner,
			gender: userExists.gender,
			bio: userExists.bio,
			token: generateToken(userExists._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid Email or Password");
	}
});

const allUsers = asyncHandler(async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [
					{ name: { $regex: req.query.search, $options: "i" } },
					{ email: { $regex: req.query.search, $options: "i" } },
				],
		  }
		: null;
	const Users =
		keyword && (await user.find(keyword).find({ _id: { $ne: req.User._id } }));
	res.send(Users);
});

const editUserDetails = asyncHandler(async (req, res) => {
	try {
		const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedUser) {
			return res.status(404).send({ message: "User not found" });
		}
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			username: updatedUser.username,
			pic: updatedUser.pic,
			token: generateToken(updatedUser._id), // Return new token
		});
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

module.exports = {
	allUsers,
	registerUser,
	authUser,
	userExists,
	editUserDetails,
};
