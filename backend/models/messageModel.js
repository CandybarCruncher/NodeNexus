const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    node: { type: mongoose.Schema.Types.ObjectId, ref: "node" },
  },
  {
    timestamps: true
  }
);
const message = mongoose.model("message", messageModel);

module.exports = message;