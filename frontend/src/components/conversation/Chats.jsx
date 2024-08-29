import React, { useEffect, useState, useContext } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Conversation from "./Conversation";
import { useOutletContext } from "react-router-dom";

import { getUserData } from "../../../local";
import { useParams } from "react-router-dom";

import { ENDPOINT } from "../../../config";
import io from "socket.io-client";
import { SocketConnectedContext } from "./ChatContext";
export const socket = io(ENDPOINT);

const Chats = () => {
	const { closeMenu } = useOutletContext();

	const { nodeId } = useParams();

	const [socketConnected, setSocketConnected] = useContext(
		SocketConnectedContext
	);

	//initiating connection
	useEffect(() => {
		socket.emit("setup", getUserData());
		socket.on("connected", () => setSocketConnected(true));
	}, []);

	//join selected chat room
	useEffect(() => {
		socket.emit("join chat", nodeId);
	}, [nodeId]);

	return (
		<Stack
			maxHeight={"90vh"}
			width={"auto"}
		>
			<Header />
			<Box
				width={"100%"}
				height={"100vh"}
				sx={{
					flexGrow: 1,
					backgroundColor: "#0B0C10",
					overflowY: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "#fff #000",
				}}
			>
				<Conversation closeMenu={closeMenu} />
			</Box>
			<Footer closeMenu={closeMenu} />
		</Stack>
	);
};

export default Chats;
