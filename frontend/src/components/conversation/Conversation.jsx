import { Box, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";
import config from "../../../config";
import { useParams } from "react-router-dom";

const Conversation = ({ refreshTrigger }) => {
	const [chats, setChats] = useState([]);
	const { chatId } = useParams();
	const lastMessageRef = useRef(null);

	useEffect(() => {
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
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box p={3}>
			<Stack spacing={3}>
				{chats.map((msg, index) => {
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
											ref={index === chats.length - 1 ? lastMessageRef : null}
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
