import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
	Avatar,
	Box,
	Button,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import { getUserData } from "../../../local";
import EditDetails from "./EditDetails";

const UserProfile = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Box
				ml={1}
				border={2}
				height="100%"
				borderRadius="0.75rem"
			>
				<Box
					sx={{
						overflow: "hidden",
						borderTopLeftRadius: "0.75rem",
						borderTopRightRadius: "0.75rem",
					}}
				>
					<img
						src={getUserData().pic}
						className="h-[15rem] w-full object-cover"
					></img>
				</Box>
				<Stack
					p={2}
					m={2}
					direction="row"
					alignItems="center"
				>
					<Avatar
						src={getUserData().pic}
						sx={{
							width: 200,
							height: 200,
							border: "5px solid white",
						}}
					/>
					<Box
						ml={3}
						width={"200%"}
					>
						<Typography
							variant="h4"
							sx={{ fontWeight: "bold" }}
						>
							{getUserData().name}
						</Typography>
						<Typography
							variant="body1"
							color="textSecondary"
						>
							{getUserData().email}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							width: "100%",
						}}
					>
						<Button
							variant="outlined"
							sx={{
								borderRadius: 2,
								color: "#45a29e",
								fontWeight: "bold",
							}}
							onClick={handleModalOpen}
						>
							<EditIcon />
							Edit Profile
						</Button>
					</Box>
					<EditDetails
						open={isModalOpen}
						handleClose={handleModalClose}
						userData={getUserData()}
					/>
				</Stack>

				{/* <Tabs
					value={tabIndex}
					onChange={handleTabChange}
					sx={{ marginTop: 2 }}
					centered
				>
					<Tab label="Posts" />
					<Tab label="Nodes" />
					<Tab label="About" />
				</Tabs> */}
			</Box>
		</>
	);
};

export default UserProfile;
