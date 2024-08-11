import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Conversation from "./Conversation";

const Chats = () => {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleMessageSent = () => {
		setRefreshTrigger((prev) => prev + 1); // Change the state to trigger refresh
	};
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
				<Conversation refreshTrigger={refreshTrigger} />
			</Box>
			<Footer onMessageSent={handleMessageSent} />
		</Stack>
	);
};

export default Chats;
