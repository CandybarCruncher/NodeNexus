const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const message = require("./models/messageModel");
const cors = require("cors");

const app = express();
app.use(cors());
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
const server = app.listen(PORT, console.log(` Unga Bunga ${PORT}`));
const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:5173",
	},
});

io.on("connection", (socket) => {
	socket.on("setup", async (userData) => {
		try {
			socket.join(userData._id);
			console.log(userData.name + " is Online");
		} catch (error) {
			console.error("Error in setup event:", error);
			socket.emit("error", { message: "Failed to set up user connection." });
		}
	});

	socket.on("join chat", async (room) => {
		try {
			socket.join(room);
			console.log("welcome to " + room);
		} catch (error) {
			console.error("Error in join chat event:", error);
			socket.emit("error", { message: "Failed to join chat room." });
		}
	});

	socket.on("new message", async (newMessageRecieved) => {
		try {
			const chat = newMessageRecieved.node; // take chatId
			// Iterate through users
			chat.users.forEach((user) => {
				if (user._id == newMessageRecieved.sender._id) return;
				socket.in(user._id).emit("message recieved", newMessageRecieved);
			});
		} catch (error) {
			console.error("Error in new message event:", error);
			socket.emit("error", { message: "Failed to handle new message." });
		}
	});
});
