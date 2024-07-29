const asyncHandler = require("express-async-handler");
const user = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
	console.log(req.body);
	const { name, email, password, pic } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please Enter all the Fields");
	}

	const userExists = await user.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const User = await user.create({
		name,
		email,
		password,
		pic,
	});
	if (User) {
		res.status(201).json({
			_id: User._id,
			name: User.name,
			email: User.email,
			// isAdmin: user.isAdmin,
			pic: User.pic,
			token: generateToken(User._id),
		});
	} else {
		res.status(400);
		throw new Error("failed to create user");
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
			// isAdmin: userExists.isAdmin,
			pic: userExists.pic,
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

module.exports = { allUsers, registerUser, authUser };
