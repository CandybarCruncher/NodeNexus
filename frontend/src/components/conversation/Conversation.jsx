import { Box, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";
import config from "../../../config";
import { useParams } from "react-router-dom";

const Conversation = ({ refreshTrigger }) => {
	const [chats, setChats] = useState([]);
	const { chatId } = useParams();
	const lastMessageRef = useRef(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetchChats();
	}, [chatId, refreshTrigger]);

	useEffect(() => {
		// Scroll to the last message whenever chats are updated
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chats]);

	const fetchChats = async () => {
		try {
			const { data } = await config.get(`/api/msg/${chatId}`);
			console.log(data);
			setChats(data);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box p={3}>
			<Stack spacing={3}>
				{loading
					? Array.from(new Array(10)).map((_, i) => (
							<Box
								key={_}
								sx={{ m: 2 }}
							>
								<Stack
									direction="row"
									justifyContent={i % 2 == 0 ? "start" : "end"}
								>
									<Skeleton
										variant="rectangular"
										height={40}
										width={100}
										sx={{ borderRadius: 2 }}
									/>
								</Stack>
							</Box>
					  ))
					: chats.map((msg, index) => {
							// if (msg._id == JSON.parse(localStorage.getItem("ct"))) {
							// 	console.log(msg._id);
							// }
							switch ("msg") {
								case "divider":
									return (
										<TimeLine
											key={msg._id}
											msg={msg}
										/>
									);
								case "msg":
									switch ("cxe") {
										case "img":
											return (
												<MediaMsg
													key={msg._id}
													msg={msg}
												/>
											);
										case "doc":
											break;
										case "link":
											return (
												<LinkMsg
													key={msg._id}
													msg={msg}
												/>
											);
										case "reply":
											return (
												<ReplyMsg
													key={msg._id}
													msg={msg}
												/>
											);
										default:
											return (
												<TextMsg
													key={msg._id}
													msg={msg}
													ref={
														index === chats.length - 1 ? lastMessageRef : null
													}
												/>
											);
									}
									break;
								default:
									break;
							}
					  })}
			</Stack>
		</Box>
	);
};

export default Conversation;
