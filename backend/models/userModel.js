const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default: "https://icon-library.com/images/icon-user/icon-user-15.jpg",
    }

},
{
    timestamps: true
});

const user = mongoose.model("user", userModel);

module.exports = user;