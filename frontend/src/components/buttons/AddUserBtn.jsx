import { Button } from "@mui/material";
import React from "react";
import config from "../../../config";
import ErrorHandler from "../ErrorHandler";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const AddUserBtn = ({ userId, addUser, onAddUser, placeholder }) => {
	const addNewNode = async () => {
		try {
			const currentUser = { userId };
			await config.post("/api/cht", currentUser);
			onAddUser(userId);
		} catch (error) {
			ErrorHandler(error);
		}
	};

	return (
		<Button
			variant="outlined"
			sx={{
				width: "auto",
				borderRadius: 2,
				color: "#45a29e",
				fontWeight: "bold",
				height: "2rem",
			}}
			onClick={addUser ? addUser : addNewNode}
		>
			<PersonAddAltIcon />
			{placeholder}
		</Button>
	);
};

export default AddUserBtn;
