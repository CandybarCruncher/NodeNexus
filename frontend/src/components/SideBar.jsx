import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";
import { Box, IconButton, Skeleton, Stack, Tab, Tabs } from "@mui/material";
import config from "../../config";
import { getUserData } from "../../local";
import CreateCluster from "./buttons/CreateCluster";

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

const SideBar = ({ closeSideBar }) => {
	const navigate = useNavigate();
	const [chats, setChats] = useState([]);
	const [value, setValue] = useState(0);
	const [loading, setLoading] = useState(true);

	const clickHandler = (chatId) => {
		navigate(`/chat/${chatId}`);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		setLoading(true);
		fetchChats();
	}, [value]);

	const fetchChats = async () => {
		try {
			const { data } = await config.get("/api/cht");
			// console.log(data);
			setChats(data);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col h-[calc(100vh-85px)] overflow-hidden bg-[#1f2833] relative p-3 m-2 rounded-2xl lg:w-[25rem] ">
			<Box
				sx={{
					borderBottom: 1,
					borderColor: "divider",
					marginBottom: 1,
				}}
			>
				<Tabs
					id="pp"
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab
						label="Nodes"
						sx={{ width: "50%" }}
					/>
					<Tab
						label="Clusters"
						sx={{ width: "50%" }}
					/>
				</Tabs>
			</Box>
			<Box
				sx={{
					overflowY: "auto",
					scrollbarWidth: "thin",
					scrollbarColor: "grey #1f2833",
				}}
			>
				{loading
					? Array.from(new Array(10)).map((_, i) => (
							<Box
								key={i}
								sx={{
									m: 2,
								}}
							>
								<Stack
									direction="row"
									spacing={2}
									sx={{ alignItems: "center" }}
								>
									<Skeleton
										variant="circular"
										height={55}
										width={55}
									/>
									<Skeleton
										variant="rectangular"
										height={50}
										width={250}
										sx={{ borderRadius: 5 }}
									/>
								</Stack>
							</Box>
					  ))
					: chats.map((chat) => (
							<Box
								key={chat._id}
								sx={{
									":hover": {
										bgcolor: "#45a29e",
										borderRadius: "20px",
										cursor: "pointer",
									},
								}}
								onClick={() => {
									clickHandler(chat._id);
									closeSideBar ? closeSideBar() : null;
								}}
							>
								{!chat.isCluster && (
									<CustomTabPanel
										value={value}
										index={0}
									>
										<ContactCard
											chatDetails={
												chat.users[0]._id == getUserData()._id
													? chat.users[1]
													: chat.users[0]
											}
										/>
									</CustomTabPanel>
								)}
								{chat.isCluster && (
									<CustomTabPanel
										value={value}
										index={1}
									>
										<ContactCard chatDetails={chat} />
									</CustomTabPanel>
								)}
							</Box>
					  ))}
				<CreateCluster />
			</Box>
		</div>
	);
};

export default SideBar;
