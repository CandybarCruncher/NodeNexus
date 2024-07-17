const express = require("express");
const chat = require("./data/data");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
	res.send(" API is running");
});

app.get("/node", (req, res) => {
	res.send(chat);
});

app.get("/node/:id", (req, res) => {
	const node = chat.node.find((c) => c._id === req.params.id);
	res.send(node);
});

const PORT = process.env.PORT || 4242;
app.listen(6969, console.log(` Unga Bunga ${PORT}`));
