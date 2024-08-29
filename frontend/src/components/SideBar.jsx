import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";
import { Box, Skeleton, Stack, Tab, Tabs } from "@mui/material";
import config from "../../config";
import { getUserData } from "../../local";
export const RoomsContext = React.createContext();
import CreateCluster from "./buttons/CreateCluster";
import ErrorHandler from "./ErrorHandler";
import {
	ClusterListContext,
	NodeListContext,
} from "./conversation/ChatContext";

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
	const [rooms, setRooms] = useState([]);
	const [value, setValue] = useState(0);
	const [loading, setLoading] = useState(true);
	const [nodeListContext, setNodeListContext] = useContext(NodeListContext);
	const [clusterListContext, setClusterListContext] =
		useContext(ClusterListContext);

	const clickHandler = (roomId) => {
		navigate(`/chat/${roomId}`);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		setLoading(true);
		fetchRooms();
	}, [value]);

	const fetchRooms = async () => {
		try {
			const { data } = await config.get("/api/cht");
			// console.log(data);
			setRooms(data);
			setLoading(false);
			const nodes = [];
			const clusters = [];

			data.forEach((room) => {
				if (room.isCluster) {
					clusters.push(room);
				} else {
					nodes.push(room);
				}
			});

			if (JSON.stringify(nodes) !== JSON.stringify(nodeListContext)) {
				setNodeListContext(nodes);
			}

			// Only update clusterListContext if the new data is different
			if (JSON.stringify(clusters) !== JSON.stringify(clusterListContext)) {
				setClusterListContext(clusters);
			}
		} catch (error) {
			ErrorHandler(error);
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
					value={value}
					onChange={handleChange}
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
					: value === 0
					? nodeListContext.map((room) => (
							<Box
								key={room._id}
								sx={{
									":hover": {
										bgcolor: "#45a29e",
										borderRadius: "20px",
										cursor: "pointer",
									},
								}}
								onClick={() => {
									clickHandler(room._id);
									closeSideBar ? closeSideBar() : null;
								}}
							>
								<CustomTabPanel
									value={value}
									index={0}
								>
									<ContactCard
										chatDetails={
											room.users[0]._id == getUserData()._id
												? room.users[1]
												: room.users[0]
										}
									/>
								</CustomTabPanel>
							</Box>
					  ))
					: clusterListContext.map((room) => (
							<Box
								key={room._id}
								sx={{
									":hover": {
										bgcolor: "#45a29e",
										borderRadius: "20px",
										cursor: "pointer",
									},
								}}
								onClick={() => {
									clickHandler(room._id);
									closeSideBar ? closeSideBar() : null;
								}}
							>
								<CustomTabPanel
									value={value}
									index={1}
								>
									<ContactCard chatDetails={room} />
								</CustomTabPanel>
							</Box>
					  ))}

				<CreateCluster />
			</Box>
		</div>
	);
};

export default SideBar;
