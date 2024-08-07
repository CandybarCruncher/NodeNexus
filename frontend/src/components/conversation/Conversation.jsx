import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../data";
import { LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";

const Conversation = () => {
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
