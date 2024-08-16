import { Button } from "@mui/material";
import React from "react";
import config from "../../../config";
import { getUserData } from "../../../local";

const AddUserBtn = ({ userId }) => {
	const addNewNode = async () => {
		const currentUser = { userId };
		await config.post("/api/cht", currentUser);
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
			onClick={addNewNode}
		>
			Add me
		</Button>
	);
};

export default AddUserBtn;
