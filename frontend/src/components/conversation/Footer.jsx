import {
	Box,
	FormControl,
	IconButton,
	InputAdornment,
	Stack,
	styled,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import config from "../../../config";
import { useParams } from "react-router-dom";

const StyledInput = styled(TextField)(({ theme }) => ({
	"& .MuiInputBase-input": {
		paddingTop: "12px",
		paddingBottom: "12px",
		color: theme.palette.background.paper,
	},
}));

const Footer = () => {
	const [content, setContent] = useState("");
	const { chatId } = useParams();

	const submitHandler = async (e) => {
		e.preventDefault();
		const message = { content, chatId };
		await config.post("/api/msg", message);
		setContent("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			submitHandler(e);
		}
	};

	return (
		<FormControl onSubmit={submitHandler}>
			<Box
				p={2}
				sx={{
					width: "100%",
					backgroundColor: "#1F2833",
					boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
				}}
			>
				<Stack
					direction="row"
					alignItems={"center"}
					spacing={2}
				>
					<StyledInput
						fullWidth
						sx={{ backgroundColor: "#fff" }}
						placeholder="Write a message..."
						variant="filled"
						InputProps={{
							disableUnderline: true,
							startAdornment: (
								<IconButton>
									<i className="fa-solid fa-link"></i>
								</IconButton>
							),
							endAdornment: (
								<IconButton>
									<i className="fa-regular fa-face-smile"></i>
								</IconButton>
							),
						}}
						value={content}
						onChange={(event) => setContent(event.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<Box
						sx={{
							height: 45,
							width: 45,
							backgroundColor: "#45a29e",
							borderRadius: 1.5,
						}}
					>
						<Stack
							sx={{ height: "100%", width: "100%" }}
							alignItems="center"
							justifyContent="center"
						>
							<IconButton onClick={submitHandler}>
								<i className="fa-solid fa-paper-plane"></i>
							</IconButton>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</FormControl>
	);
};

export default Footer;
