const express = require("express");
const { registerUser, authUser } = require("../controllers/userController");

const router = express.Router();

//router.route("/").get(protect, allUsers);
router.route("/signup").post(registerUser);
router.post("/login", authUser);

module.exports = router;
