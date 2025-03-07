const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
	accessChat,
	fetchChats,
	createGroupChat,
	renameGroup,
	removeFromGroup,
	addToGroup,
	chatDetails,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/:chatId").get(protect, chatDetails);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
