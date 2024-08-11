import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";
import config from "../../../config";
import { useParams } from "react-router-dom";

const Conversation = () => {
	const [chats, setChats] = useState([]);
	const { chatId } = useParams();
	useEffect(() => {
		fetchChats();
	}, [chatId]);

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
				{chats.map((el) => {
					switch ("msg") {
						case "divider":
							return <TimeLine el={el} />;
						case "msg":
							switch ("cxe") {
								case "img":
									return <MediaMsg el={el} />;
								case "doc":
									break;
								case "link":
									return <LinkMsg el={el} />;
								case "reply":
									return <ReplyMsg el={el} />;
								default:
									return <TextMsg el={el} />;
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
