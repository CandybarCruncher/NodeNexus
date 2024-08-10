import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Chat_History } from "../data";
import { LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";
import config from "../../../config";

const Conversation = () => {
	const [chats, setChats] = useState("");
	useEffect(() => {
		fetchChats();
	}, []);

	const fetchChats = async () => {
		try {
			const { data } = await config.get("/api/cht/:chatId");
			console.log(data);
			setChats(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box p={3}>
			<Stack spacing={3}>
				{Chat_History.map((el) => {
					switch (el.type) {
						case "divider":
							return <TimeLine el={el} />;
						case "msg":
							switch (el.subtype) {
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
