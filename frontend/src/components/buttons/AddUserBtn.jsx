import { Button } from "@mui/material";
import React from "react";
import config from "../../../config";
import ErrorHandler from "../ErrorHandler";

const AddUserBtn = ({ userId, addUser }) => {
	const addNewNode = async () => {
		try {
			const currentUser = { userId };
			await config.post("/api/cht", currentUser);
		} catch (error) {
			ErrorHandler(error);
		}
	};

	return (
		<Button
			variant="outlined"
			sx={{
				width: "6rem",
				borderRadius: 2,
				color: "#45a29e",
				fontWeight: "bold",
				height: "2rem",
			}}
			onClick={addUser ? addUser : addNewNode}
		>
			Add me
		</Button>
	);
};

export default AddUserBtn;
