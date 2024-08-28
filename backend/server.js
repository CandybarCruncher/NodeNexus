const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const message = require("./models/messageModel");
const cors = require("cors");

const app = express();
app.use(cors());
dotenv.config();
connectDB();
app.use(express.json());

// Routes
app.use("/api/usr", userRoutes);
app.use("/api/cht", chatRoutes);
app.use("/api/msg", messageRoutes);

// Deployment
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname1, "/frontend/dist")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname1, "frontend", "dist", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running ...");
	});
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4242;
const server = app.listen(PORT, console.log(`Unga Bunga ${PORT}`));

const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		origin: "https://nodenexus-d11u.onrender.com/",
	},
});

io.on("connection", (socket) => {
	socket.on("setup", (userData) => {
		try {
			socket.join(userData._id);
			socket.emit("connected");
			// console.log(userData.name + " is Online");
		} catch (error) {
			console.error("Error in setup event:", error);
			socket.emit("error", { message: "Failed to set up user connection." });
		}
	});

	socket.on("join chat", (room) => {
		try {
			socket.join(room);
			// console.log("Welcome to " + room);
		} catch (error) {
			console.error("Error in join chat event:", error);
			socket.emit("error", { message: "Failed to join chat room." });
		}
	});

	socket.on("checkRoom", (room, callback) => {
		try {
			// console.log("room---" + room);
			const rooms = io.sockets.adapter.rooms;
			// console.log("room--" + rooms);
			const roomExists = rooms.has(room);
			// console.log(roomExists);

			callback(roomExists);
		} catch (error) {
			console.error("Error in checkRoom event:", error);
			socket.emit("error", { message: "Failed to check room existence." });
		}
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageRecieved) => {
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

	// socket.on("dC", () => {
	// 	try {
	// 		socket.in(socket.id).disconnectSockets(true);
	// 	} catch (error) {
	// 		console.error("Error on logout:", error);
	// 	}
	// });

	socket.on("disconnect", () => {
		try {
			// socket.emit("dis");
			// console.log("USER DISCONNECTED " + socket.id);
			// Handle user disconnection logic here if needed
		} catch (error) {
			console.error("Error in disconnect event:", error);
		}
	});
});
