import { Box, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import InputField from "../InputField";
import ContactCard from "../ContactCard";
import AddUserBtn from "./AddUserBtn";
import SearchBox from "../SearchBox";
import { getUserData } from "../../../local";

const CreateCluster = () => {
	const [name, setName] = useState("");
	const [icon, setIcon] = useState(null);
	const [users, setUsers] = useState([]);
	const [grpCr, setGrpCr] = useState(false);

	const clusterHandler = (e) => {
		e.preventDefault();
		const cluData = { users, name, icon };
	};

	const show = () => {
		setGrpCr(true);
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
				<IconButton onClick={show}>
					<i className="fa-solid fa-plus text-white"></i>
				</IconButton>
			</Box>
			{grpCr && (
				<form onSubmit={clusterHandler}>
					<Box
						sx={{
							top: "100%",
							left: 0,
							width: "100%",
							bgcolor: "#0b0c10",
							border: "1px solid #45a29e",
							borderRadius: "10px",
							mt: 1,
							zIndex: 10,
							maxHeight: "20rem",
							overflowY: "auto",
							scrollbarWidth: "thin",
						}}
					>
						<Box
							sx={{
								padding: "8px",
							}}
						>
							<Stack>
								<InputField
									value={name}
									placeholder={"Group name"}
									onChange={(e) => {
										setName(e.target.value);
									}}
								/>
								<InputField
									type={"file"}
									onChange={(e) => {
										setIcon(e.target.value);
									}}
								/>
								<SearchBox users={users} />
							</Stack>
						</Box>
					</Box>
				</form>
			)}
		</>
	);
};

export default CreateCluster;
