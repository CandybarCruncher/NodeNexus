import {
	Box,
	IconButton,
	Stack,
	Modal,
	Typography,
	Chip,
	CircularProgress,
	Avatar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import SubmitBtn from "./SubmitBtn";
import config from "../../../config";
import AddUserBtn from "./AddUserBtn";
import { getUserData } from "../../../local";

const CreateCluster = () => {
	const [name, setName] = useState("");
	const [icon, setIcon] = useState(null);
	const [users, setUsers] = useState([]);
	const [grpCr, setGrpCr] = useState(false);
	const [loading, setLoading] = useState(false);

	const addUserToCluster = (userId) => {
		if (!users.includes(userId)) {
			setUsers([...users, userId]);
		}
	};

	const removeUserFromCluster = (userId) => {
		setUsers(users.filter((user) => user !== userId));
	};

	const clusterHandler = async (e) => {
		e.preventDefault();
		const cluData = { users, name, icon: icon };
		await config.post("api/cht/group", cluData);
		setGrpCr(false);
		setName("");
	};

	const handleClose = () => {
		setGrpCr(false);
	};

	const uploadImage = async (icon) => {
		setLoading(true);

		const formData = new FormData();
		formData.append("file", icon);
		formData.append("upload_preset", "NodeNexus");

		const response = await config.post(
			"https://api.cloudinary.com/v1_1/dwkgrubve/image/upload",
			formData,
			{
				baseURL: "",
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		setLoading(false);

		return response.data.secure_url;
	};

	const [chats, setChats] = useState([]);

	useEffect(() => {
		fetchChats();
	}, []);

	const fetchChats = async () => {
		try {
			const { data } = await config.get("/api/cht");
			setChats(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Box
				sx={{
					borderRadius: "55px",
					bgcolor: "#000",
					height: "65px",
					width: "65px",
					position: "absolute",
					bottom: 20,
					right: 30,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<IconButton onClick={() => setGrpCr(true)}>
					<i className="fa-solid fa-plus text-white"></i>
				</IconButton>
			</Box>
			{grpCr && (
				<Modal
					open={grpCr}
					onClose={handleClose}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "500px",
							bgcolor: "#0b0c10",
							border: "2px solid #45a29e",
							borderRadius: "10px",
							boxShadow: 24,
							p: 4,
							zIndex: 10,
						}}
					>
						<IconButton
							onClick={handleClose}
							sx={{ position: "absolute", top: 8, right: 8 }}
						>
							<i className="fa-solid fa-times text-white"></i>
						</IconButton>

						<Typography
							id="modal-title"
							variant="h6"
							component="h2"
							sx={{ mb: 2, textAlign: "center", color: "#45a29e" }}
						>
							CREATE YOUR CLUSTER
						</Typography>
						<form onSubmit={clusterHandler}>
							<Stack spacing={2}>
								<InputField
									value={name}
									placeholder={"Group name"}
									onChange={(e) => setName(e.target.value)}
								/>
								<Stack
									direction="row"
									alignItems="center"
								>
									<Box sx={{ flexGrow: 1 }}>
										<InputField
											name="pic"
											type="file"
											onChange={async (event) => {
												const selectedFile = event.target.files[0];
												setIcon(selectedFile);
												setIcon(await uploadImage(selectedFile));
											}}
										/>
									</Box>
									{loading && (
										<Box sx={{ marginLeft: "15px" }}>
											<CircularProgress />
										</Box>
									)}
								</Stack>
								<Box
									width="100%"
									height="10em"
									alignItems="center"
									p={0.5}
									sx={{
										flexGrow: 1,
										overflowY: "auto",
										scrollbarWidth: "thin",
										scrollbarColor: "#fff #000",
										border: 1,
										borderRadius: 1,
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{chats.map((chat) => {
										const userIdToCheck =
											chat?.users[0]._id === getUserData()._id
												? chat.users[1]?._id
												: chat.users[0]?._id;

										const isUserAdded = users.includes(userIdToCheck);

										return (
											!chat.isCluster && (
												<Stack
													direction="row"
													alignItems={"center"}
													justifyContent={"space-between"}
													key={chat._id}
													p={1}
												>
													<Stack
														direction="row"
														alignItems="center"
													>
														<Avatar
															src={
																chat.users[0]._id === getUserData()._id
																	? chat.users[1].pic
																	: chat.users[0].pic
															}
														></Avatar>
														<Typography
															fontWeight={600}
															variant="h6"
															ml={2}
														>
															{chat.users[0]._id === getUserData()._id
																? chat.users[1].name
																: chat.users[0].name}
														</Typography>
													</Stack>

													{isUserAdded ? (
														<Chip
															onDelete={() =>
																removeUserFromCluster(userIdToCheck)
															}
														/>
													) : (
														<AddUserBtn
															addUser={() => addUserToCluster(userIdToCheck)}
															userId={userIdToCheck}
														/>
													)}
												</Stack>
											)
										);
									})}
								</Box>
								<SubmitBtn Placeholder={"Create"} />
							</Stack>
						</form>
					</Box>
				</Modal>
			)}
		</>
	);
};

export default CreateCluster;
