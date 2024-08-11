import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";
import { Box, Tab, Tabs } from "@mui/material";
import config from "../../config";
import { getUserData } from "../../local";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 1 }}>{children}</Box>}
		</div>
	);
}

const SideBar = () => {
	const navigate = useNavigate();
	const [chats, setChats] = useState([]);
	const [value, setValue] = useState(0);

	const clickHandler = (chatId) => {
		navigate(`/chat/${chatId}`);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		fetchChats();
	}, [value]);

	const fetchChats = async () => {
		try {
			const { data } = await config.get("/api/cht");
			console.log(data);
			setChats(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden backdrop-blur-sm bg-white/5 relative p-3 m-2 rounded-2xl lg:w-[25rem] ">
			<Box
				sx={{
					borderBottom: 1,
					borderColor: "divider",
				}}
			>
				<Tabs
					id="pp"
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Nodes" />
					<Tab label="Clusters" />
				</Tabs>
			</Box>

			{chats.map((chat) => (
				<Box key={chat._id}>
					{!chat.isCluster && (
						<CustomTabPanel
							value={value}
							index={0}
						>
							<button onClick={() => clickHandler(chat._id)}>
								<ContactCard
									chatDetails={
										chat.users[0]._id == getUserData()._id
											? chat.users[1]
											: chat.users[0]
									}
								/>
							</button>
						</CustomTabPanel>
					)}
					{chat.isCluster && (
						<CustomTabPanel
							value={value}
							index={1}
						>
							<button onClick={() => clickHandler(chat._id)}>
								<ContactCard chatDetails={chat} />
							</button>
						</CustomTabPanel>
					)}
				</Box>
			))}
		</div>
	);
};

export default SideBar;
