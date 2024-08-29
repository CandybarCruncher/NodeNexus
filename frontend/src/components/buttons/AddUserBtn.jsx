import { Button } from "@mui/material";
import React, { useContext } from "react";
import config from "../../../config";
import ErrorHandler from "../ErrorHandler";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { NodeListContext } from "../conversation/ChatContext";

const AddUserBtn = ({ userId, addUser, placeholder }) => {
	const [nodeListContext, setNodeListContext] = useContext(NodeListContext);
	const addNewNode = async () => {
		try {
			const userToAdd = { userId };
			const data = await config.post("/api/cht", userToAdd);
			setNodeListContext((prevList) => [...prevList, data.data]);
			// console.log(nodeListContext);
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
