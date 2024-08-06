const asyncHandler = require("express-async-handler");
const message = require("../models/messageModel");
const user = require("../models/userModel");
const chat = require("../models/nodeModel");

const allMessages = asyncHandler(async (req, res) => {
	console.log(req.body);
	try {
		const Messages = await message
			.find({ node: req.params.chatId })
			.populate("sender", "name pic email")
			.populate("node");
		res.json(Messages);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

const sendMessage = asyncHandler(async (req, res) => {
	const { content, chatId } = req.body;

	if (!content || !chatId) {
		console.log("Invalid data passed into request");
		return res.sendStatus(400);
	}

	var newMessage = {
		sender: req.User._id,
		content: content,
		node: chatId,
	};

	try {
		var Message = await message.create(newMessage);
		console.log(Message);

		Message = await Message.populate("sender", "name pic");
		Message = await Message.populate("node");
		Message = await user.populate(Message, {
			path: "node.users",
			select: "name pic email",
		});

		await chat.findByIdAndUpdate(req.body.chatId, { latestMessage: Message });

		res.json(Message);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

module.exports = { sendMessage, allMessages };
