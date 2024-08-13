import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Conversation from "./Conversation";
import { useOutletContext } from "react-router-dom";

import { getUserData } from "../../../local";
import { useParams } from "react-router-dom";
export const Chatlog = React.createContext();

const ENDPOINT = "http://localhost:6969";
import io from "socket.io-client";
const socket = io(ENDPOINT);

const Chats = () => {
	const { closeMenu } = useOutletContext();

	const [chatlog, setChatlog] = useState([]);
	const { chatId } = useParams();

	const [socketConnected, setSocketConnected] = useState(false);

	//initiating connection
	useEffect(() => {
		socket.emit("setup", getUserData());
		socket.on("connection", () => setSocketConnected(true));
	}, []);

	//join selected chat room
	useEffect(() => {
		socket?.emit("join chat", chatId);
	}, [chatId]);

	return (
		<Chatlog.Provider value={[chatlog, setChatlog]}>
			<Stack
				maxHeight={"91vh"}
				width={"auto"}
			>
				<Header
				// refreshTrigger={refreshTrigger} react online green dot
				/>
				<Box
					width={"100%"}
					sx={{
						flexGrow: 1,
						backgroundColor: "#0B0C10",
						overflowY: "auto",
					}}
				>
					<Conversation
						closeMenu={closeMenu}
						socket={socket}
					/>
				</Box>
				<Footer
					closeMenu={closeMenu}
					socket={socket}
				/>
			</Stack>
		</Chatlog.Provider>
	);
};

export default Chats;
