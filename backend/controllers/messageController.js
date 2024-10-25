const asyncHandler = require("express-async-handler");
const message = require("../models/messageModel");
const user = require("../models/userModel");
const chat = require("../models/nodeModel");
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = "merichabhi0merichabhi0merichabhi";
const iv = crypto.randomBytes(16);

// Encryption function
function encrypt(text) {
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	let encrypted = cipher.update(text, "utf-8", "hex");
	encrypted += cipher.final("hex");
	return { iv: iv.toString("hex"), encryptedData: encrypted };
}

// Decryption function
function decrypt(text) {
	const decipher = crypto.createDecipheriv(
		algorithm,
		key,
		Buffer.from(text.iv, "hex")
	);
	let decrypted = decipher.update(text.encryptedData, "hex", "utf-8");
	decrypted += decipher.final("utf-8");
	return decrypted;
}

const allMessages = asyncHandler(async (req, res) => {
	try {
		let Messages = await message
			.find({ node: req.params.chatId })
			.populate("sender", "name pic email")
			.populate("node");

		// Decrypt each message content by parsing JSON and decrypting
		Messages = Messages.map((msg) => {
			const encryptedContent = JSON.parse(msg.content);
			const decryptedContent = decrypt(encryptedContent);
			return { ...msg.toObject(), content: decryptedContent };
		});

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

	// Encrypt content before saving and convert it to a JSON string
	const encryptedContent = JSON.stringify(encrypt(content));

	const newMessage = {
		sender: req.User._id,
		content: encryptedContent, // Save as JSON string
		node: chatId,
	};

	try {
		let Message = await message.create(newMessage);

		Message = await Message.populate("sender", "name pic");
		Message = await Message.populate("node");
		Message = await user.populate(Message, {
			path: "node.users",
			select: "name pic email",
		});

		await chat.findByIdAndUpdate(req.body.chatId, { latestMessage: Message });

		const encryptedContent = JSON.parse(Message.content);
		const decryptedContent = decrypt(encryptedContent);
		Message.content = decryptedContent;
		res.json(Message);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

module.exports = { sendMessage, allMessages };
