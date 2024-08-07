import React from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Conversation from "./Conversation";

const Chats = () => {
	return (
		<Stack
			maxHeight={"91vh"}
			width={"auto"}
		>
			<Header />
			<Box
				width={"100%"}
				sx={{
					flexGrow: 1,
					backgroundColor: "#0B0C10",
					overflowY: "scroll",
				}}
			>
				<Conversation />
			</Box>
			<Footer />
		</Stack>
	);
};

export default Chats;
