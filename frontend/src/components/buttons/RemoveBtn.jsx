import { Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import config from "../../../config";

const RemoveBtn = ({ placeholder, chatId, userId }) => {
	const removeMember = async () => {
		const user = { chatId, userId };
		await config.put("/api/cht/groupremove", user);
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
			onClick={removeMember}
		>
			<DeleteIcon />
		</Button>
	);
};

export default RemoveBtn;
