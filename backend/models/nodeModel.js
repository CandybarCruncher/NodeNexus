const mongoose = require("mongoose");

const nodeModel = mongoose.Schema(
	{
		chatName: { type: String, trim: true },
		isCluster: { type: Boolean, default: false },
		icon: {
			type: "String",
			default:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUBH6WMMQkmCLRdJ0KRMOr9wD9quL3zwPw4OV94u-VRzHoDfw4&s",
		},
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "user",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "message",
		},
		clusterAdmin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{
		timestamps: true,
	}
);

const node = mongoose.model("node", nodeModel);

module.exports = node;
