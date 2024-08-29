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
import { socket } from "./Chats";
import {
	ChatlogContext,
	TypingContext,
	IsTypingContext,
	SocketConnectedContext,
} from "./ChatContext";
import EmojiPicker from "emoji-picker-react";
import ErrorHandler from "../ErrorHandler";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";

const StyledInput = styled(TextField)(({ theme }) => ({
	"& .MuiInputBase-input": {
		paddingTop: "12px",
		paddingBottom: "12px",
		color: theme.palette.background.paper,
	},
}));

const Footer = ({ closeMenu }) => {
	const [chatlog, setChatlog] = useContext(ChatlogContext);
	//chatlog is not being used but removing it breaks the submitHandler
	const [socketConnected, setSocketConnected] = useContext(
		SocketConnectedContext
	);
	const [typing, setTyping] = useContext(TypingContext); //self
	const [isTyping, setIsTyping] = useContext(IsTypingContext); //other

	const [content, setContent] = useState("");
	const { nodeId } = useParams();

	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [oeb, setOeb] = useState(false);
	const emojiPickerRef = useRef(null);
	const [lastTypingTime, setLastTypingTime] = useState("");

	var timerLength = 1500;

	useEffect(() => {
		setTimeout(() => {
			var timeNow = new Date().getTime();
			var timeDiff = timeNow - lastTypingTime;
			if (timeDiff >= timerLength && typing) {
				socket.emit("stop typing", nodeId);
				setTyping(false);
			}
		}, timerLength);
	});

	useEffect(() => {
		setContent("");
	}, [nodeId]);

	const submitHandler = async (e) => {
		try {
			e.preventDefault();
			if (!content.trimEnd()) return;
			const message = { content, nodeId };
			const { data } = await config.post("/api/msg", message);
			setChatlog((prevChatlog) => [...prevChatlog, data]);
			socket.emit("new message", data);
			setContent("");
			setShowEmojiPicker(false);
		} catch (error) {
			ErrorHandler(error);
		}
	};

	const handleKeyDown = (e) => {
		if (!socketConnected) return;
		if (!typing) setTyping(true);
		socket.emit("typing", nodeId);
		setLastTypingTime(new Date().getTime());

		if (e.key === "Enter" && !e.shiftKey) {
			socket.emit("stop typing", nodeId);
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
		if (emojiPickerRef.current) {
			document.addEventListener("mousedown", handleOutsideClick);
			return () => {
				document.removeEventListener("mousedown", handleOutsideClick);
			};
		}
	});

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
								padding: "1px 10px",
							},
							disableUnderline: true,
							startAdornment: (
								<IconButton>
									<AttachFileIcon sx={{ fontSize: "1.8rem" }} />
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
										<InsertEmoticonIcon sx={{ fontSize: "1.8rem" }} />
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
								<SendIcon sx={{ fontSize: "2rem" }} />
							</IconButton>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</FormControl>
	);
};

export default Footer;
