import React from "react";
import {
	Avatar,
	Typography,
	Box,
	IconButton,
	Modal,
	Stack,
	Divider,
} from "@mui/material";
import ClusterMembers from "../ClusterMembers";
import { faker } from "@faker-js/faker";
import { getUserData } from "../../../local";

const UserCard = ({ userCard, setUserCard, chats, checkUser }) => {
	const hideUserCard = () => {
		setUserCard(false);
	};
	return (
		<Modal
			open={userCard}
			onClose={hideUserCard}
		>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					bgcolor: "#0b0c10",
					border: "2px solid #45a29e",
					borderRadius: "10px",
					boxShadow: 24,
					p: 4,
					zIndex: 100,
				}}
			>
				<IconButton
					onClick={hideUserCard}
					sx={{ position: "absolute", top: 8, right: 8 }}
				>
					<i className="fa-solid fa-times text-white"></i>
				</IconButton>
				<Stack
					direction={"row"}
					alignItems={"center"}
				>
					<Avatar
						sx={{ width: 156, height: 156, marginRight: 2 }}
						alt={chats[0]?.chatName || checkUser()?.name}
						src={(chats[0]?.isCluster && chats[0]?.icon) || checkUser()?.pic}
					/>
					<Box>
						<Typography variant="h4">
							{chats[0]?.chatName.localeCompare("sender")
								? chats[0]?.chatName
								: checkUser()?.name}
						</Typography>
						{!chats[0].isCluster && (
							<Typography>@{checkUser().username}</Typography>
						)}
					</Box>
				</Stack>
				{!chats[0].isCluster && (
					<Typography p={1}>{checkUser().email}</Typography>
				)}

				<Typography p={1}>{faker.person.bio()}</Typography>

				<ClusterMembers chats={chats} />
			</Box>
		</Modal>
	);
};

export default UserCard;
