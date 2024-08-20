import React, { useEffect, useState, useContext } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Conversation from "./Conversation";
import { useOutletContext } from "react-router-dom";

import { getUserData } from "../../../local";
import { useParams } from "react-router-dom";
// export const Chatlog = React.createContext();
// export const SocketConnected = React.createContext();
export const SocketConnectedContext = React.createContext();

import { ENDPOINT } from "../../../config";
import io from "socket.io-client";
import ChatContext from "./ChatContext";
const socket = io(ENDPOINT);
// const [online, setonline] = useState(true);

const Chats = () => {
	const { closeMenu } = useOutletContext();

	const { chatId } = useParams();

	const [socketConnected, setSocketConnected] = useState(false);

	//initiating connection
	useEffect(() => {
		socket.emit("setup", getUserData());
		socket.on("connected", () => setSocketConnected(true));
	}, []);

	//join selected chat room
	useEffect(() => {
		socket.emit("join chat", chatId);
	}, [chatId]);

	return (
		<ChatContext>
			<SocketConnectedContext.Provider
				value={[socketConnected, setSocketConnected]}
			>
				<Stack
					maxHeight={"91vh"}
					width={"auto"}
				>
					<Header socket={socket} />
					<Box
						width={"100%"}
						height={"45em"}
						sx={{
							flexGrow: 1,
							backgroundColor: "#0B0C10",
							overflowY: "auto",
							scrollbarWidth: "thin",
							scrollbarColor: "#fff #000",
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
			</SocketConnectedContext.Provider>
		</ChatContext>
	);
};

export default Chats;
