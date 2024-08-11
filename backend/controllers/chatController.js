const asyncHandler = require("express-async-handler");
const chat = require("../models/nodeModel");
const user = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		console.log("UserId param not sent with request");
		return res.sendStatus(400);
	}
	console.log(`req.user._id: ${req.User._id}`);
	console.log(`userId: ${userId}`);
	var isChat = await chat
		.find({
			isCluster: false,
			$and: [
				{ users: { $elemMatch: { $eq: req.User._id } } },
				{ users: { $elemMatch: { $eq: userId } } },
			],
		})
		.populate("users", "-password")
		.populate("latestMessage");
	isChat = await user.populate(isChat, {
		path: "latestMessage.sender",
		select: "name pic email",
	});
	// console.log(req.User);

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		var chatData = {
			chatName: "sender",
			isCluster: false,
			users: [req.User._id, userId],
		};
	}

	try {
		const createdChat = await chat.create(chatData);
		const FullChat = await chat
			.findOne({ _id: createdChat._id })
			.populate("users", "-password");
		res.status(200).json(FullChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const fetchChats = asyncHandler(async (req, res) => {
	try {
		chat
			.find({ users: { $elemMatch: { $eq: req.User._id } } })
			.populate("users", "-password")
			.populate("clusterAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 })
			.then(async (results) => {
				results = await user.populate(results, {
					path: "latestMessage.sender",
					select: "name pic email",
				});
				res.status(200).send(results);
			});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const createGroupChat = asyncHandler(async (req, res) => {
	if (!req.body.users || !req.body.name) {
		return res.status(400).send({ message: "Please Fill all the fields" });
	}

	// var users = JSON.parse(req.body.users);
	const { users, name, icon } = req.body;

	if (users.length < 2) {
		return res
			.status(400)
			.send("More than 2 users are required to form a group chat");
	}
	users.push(req.User._id);

	try {
		const groupChat = await chat.create({
			chatName: name,
			users: users,
			isCluster: true,
			icon: icon,
			clusterAdmin: req.User._id,
		});

		const fullGroupChat = await chat
			.findOne({ _id: groupChat._id })
			.populate("users", "-password")
			.populate("clusterAdmin", "-password");

		res.status(200).json(fullGroupChat);
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

const renameGroup = asyncHandler(async (req, res) => {
	const { chatId, chatName } = req.body;

	const updatedChat = await chat
		.findByIdAndUpdate(
			chatId,
			{
				chatName: chatName,
			},
			{
				new: true,
			}
		)
		.populate("users", "-password")
		.populate("clusterAdmin", "-password");

	if (!updatedChat) {
		res.status(404);
		throw new Error("Chat Not Found");
	} else {
		res.json(updatedChat);
	}
});

const removeFromGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	// check if the requester is admin

	const removed = await chat
		.findByIdAndUpdate(
			chatId,
			{
				$pull: { users: userId },
			},
			{
				new: true,
			}
		)
		.populate("users", "-password")
		.populate("clusterAdmin", "-password");

	if (!removed) {
		//if statement not wokring
		res.status(404);
		throw new Error("Chat Not Found");
	} else {
		res.json(removed);
	}
});

const addToGroup = asyncHandler(async (req, res) => {
	const { chatId, userId } = req.body;

	const added = await chat
		.findByIdAndUpdate(
			chatId,
			{
				$push: { users: userId },
			},
			{
				new: true,
			}
		)
		.populate("users", "-password")
		.populate("clusterAdmin", "-password");

	if (!added) {
		//if statement not wokring
		res.status(404);
		throw new Error("Chat Not Found");
	} else {
		res.json(added);
	}
});

const chatDetails = asyncHandler(async (req, res) => {
	// console.log(req.body);
	try {
		const chatExsists = await chat
			.find({ _id: req.params.chatId })
			.populate("users", "-password");
		res.json(chatExsists);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

module.exports = {
	accessChat,
	fetchChats,
	createGroupChat,
	renameGroup,
	addToGroup,
	removeFromGroup,
	chatDetails,
};
