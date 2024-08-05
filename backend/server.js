const express = require("express");
const chat = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const message = require("./models/messageModel");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

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

app.use("/api/usr", userRoutes);
app.use("/api/cht", chatRoutes);
app.use("/api/msg", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4242;
app.listen(6969, console.log(` Unga Bunga ${PORT}`));
