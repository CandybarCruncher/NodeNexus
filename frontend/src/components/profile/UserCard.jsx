import React, { useState } from "react";
import {
	Avatar,
	Typography,
	Box,
	IconButton,
	Modal,
	Stack,
	Button,
	TextField,
} from "@mui/material";
import ClusterMembers from "../ClusterMembers";
import { faker } from "@faker-js/faker";
import EditIcon from "@mui/icons-material/Edit";
import { validate } from "../../../validatePattern";
import ErrorHandler from "../ErrorHandler";
import config from "../../../config";

const UserCard = ({ userCard, setUserCard, chats, checkUser }) => {
	const [showEdit, setShowEdit] = useState(false);
	const [formData, setFormData] = useState({
		chatName: chats[0]?.chatName,
		chatId: chats[0]?._id,
	});
	console.log(chats);
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		console.log(formData);
	};

	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requiredFields = ["chatname"];
		const validationErrors = validate(formData, requiredFields);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		try {
			const updatedChatname = await config.put("/api/cht/rename", formData);
			setErrors({});
			setShowEdit(false);
		} catch (error) {
			ErrorHandler(error);
		}
	};

	const handleClick = () => {
		setShowEdit(!showEdit);
	};

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
						<Stack
							direction={"row"}
							alignItems={"center"}
						>
							{!showEdit ? (
								<Typography
									variant="h4"
									sx={{ fontWeight: "bold" }}
								>
									{chats[0]?.chatName.localeCompare("sender")
										? chats[0]?.chatName
										: checkUser()?.name}
								</Typography>
							) : (
								<TextField
									name="chatName"
									variant="standard"
									error={Boolean(errors.name)}
									helperText={errors.name}
									onChange={handleChange}
									value={formData.chatName}
								/>
							)}
							{!showEdit ? (
								chats[0].isCluster && (
									<Button
										sx={{ borderRadius: "50px" }}
										onClick={handleClick}
									>
										<EditIcon />
									</Button>
								)
							) : (
								<Button
									sx={{ borderRadius: "50px" }}
									onClick={handleSubmit}
								>
									Save
								</Button>
							)}
						</Stack>

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
