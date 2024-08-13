import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Conversation from "./Conversation";
import { useOutletContext } from "react-router-dom";

const Chats = () => {
	const { toggleMenu } = useOutletContext();

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
				<Conversation
					toggleMenu={toggleMenu}
					refreshTrigger={refreshTrigger}
				/>
			</Box>
			<Footer
				toggleMenu={toggleMenu}
				onMessageSent={handleMessageSent}
			/>
		</Stack>
	);
};

export default Chats;
