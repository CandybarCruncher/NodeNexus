const express = require("express");
const {
	registerUser,
	authUser,
	allUsers,
	userExists,
	editUserDetails,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/users").get(protect, allUsers);
router.route("/signup").post(registerUser);
router.post("/login", authUser);
router.post("/email", userExists);
router.put("/edit/:id", editUserDetails);

module.exports = router;
