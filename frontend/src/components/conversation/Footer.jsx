import {
	Box,
	FormControl,
	IconButton,
	Stack,
	styled,
	TextField,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import config from "../../../config";
import { useParams } from "react-router-dom";
import { Chatlog } from "../conversation/Chats";
import EmojiPicker from "emoji-picker-react";

const StyledInput = styled(TextField)(({ theme }) => ({
	"& .MuiInputBase-input": {
		paddingTop: "12px",
		paddingBottom: "12px",
		color: theme.palette.background.paper,
	},
}));

const Footer = ({ socket, closeMenu }) => {
	const [chatlog, setChatlog] = useContext(Chatlog);
	//chatlog is not being used but removing it breaks the submitHandler

	const [content, setContent] = useState("");
	const { chatId } = useParams();
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [oeb, setOeb] = useState(false);
	const emojiPickerRef = useRef(null);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (!content.trimEnd()) return;
		const message = { content, chatId };
		const { data } = await config.post("/api/msg", message);
		setChatlog((prevChatlog) => [...prevChatlog, data]);
		socket.emit("new message", data);
		setContent("");
		setShowEmojiPicker(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			submitHandler(e);
		}
	};

	const handleEmojiClick = (emojiObject) => {
		setContent((prevContent) => prevContent + emojiObject.emoji);
	};

	const handleOutsideClick = (event) => {
		// Close emoji picker if clicked outside
		if (!emojiPickerRef.current.contains(event.target)) {
			setShowEmojiPicker(false);
			setOeb(true);
		}
	};

	useEffect(() => {
		// Add event listener for clicks outside the emoji picker
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	return (
		<FormControl
			onSubmit={submitHandler}
			onClick={closeMenu}
		>
			<Box
				p={1}
				sx={{
					width: "100%",
					backgroundColor: "#1f2833",
					boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
				}}
			>
				<Stack
					direction="row"
					alignItems={"center"}
					spacing={1}
				>
					<StyledInput
						fullWidth
						size="small"
						sx={{ backgroundColor: "#fff", borderRadius: 4 }}
						placeholder="Write a message..."
						variant="filled"
						multiline
						maxRows={4}
						InputProps={{
							style: {
								padding: "1px 14px",
							},
							disableUnderline: true,
							startAdornment: (
								<IconButton sx={{ mr: "0.5rem" }}>
									<i className="fa-solid fa-link"></i>
								</IconButton>
							),
							endAdornment: (
								<>
									<IconButton
										onClick={() => {
											if (oeb) {
												// setShowEmojiPicker(false);
												setOeb(false);
											} else {
												setShowEmojiPicker(!showEmojiPicker);
											}
										}}
									>
										<i className="fa-regular fa-face-smile"></i>
									</IconButton>
									{showEmojiPicker && (
										<Box
											ref={emojiPickerRef}
											sx={{ position: "absolute", bottom: 60, right: 10 }}
										>
											<EmojiPicker onEmojiClick={handleEmojiClick} />
										</Box>
									)}
								</>
							),
						}}
						value={content}
						onChange={(event) => setContent(event.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<Box
						sx={{
							height: 50,
							width: 50,
							backgroundColor: "#45a29e",
							borderRadius: 4,
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
