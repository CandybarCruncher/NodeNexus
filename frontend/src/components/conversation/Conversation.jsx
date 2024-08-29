import { Box, Skeleton, Stack } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";
import { useParams } from "react-router-dom";
import { ChatlogContext, LoadingContext } from "./ChatContext";
import { socket } from "./Chats";

const Conversation = ({ closeMenu }) => {
	const [chatlog, setChatlog] = useContext(ChatlogContext);

	const { nodeId } = useParams();
	const lastMessageRef = useRef(null);
	const [loading, setLoading] = useContext(LoadingContext);

	useEffect(() => {
		// Scroll to the last message whenever chats are updated
		if (lastMessageRef.current) {
			lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatlog]);

	//login user recieving a msg anywhere
	useEffect(() => {
		socket.on("message recieved", (newMessageRecieved) => {
			if (nodeId !== newMessageRecieved.node._id) {
				//   send notif
			} else {
				setChatlog([...chatlog, newMessageRecieved]);
				// console.log("context ----" + chatlog[0]);
			}
		});
	});

	return (
		<Box
			p={3}
			onClick={closeMenu}
		>
			<Stack spacing={3}>
				{loading
					? Array.from(new Array(10)).map((_, i) => (
							<Box
								key={i}
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
					: chatlog.map((msg, index) => {
							// if (msg._id == JSON.parse(localStorage.getItem("ct"))) {
							// 	console.log(msg._id);
							// }
							// msgtype
							// switch ("msg") {
							// 	case "divider":
							// 		return (
							// 			<TimeLine
							// 				key={msg._id}
							// 				msg={msg}
							// 			/>
							// 		);
							// 	case "msg":
							// 		switch ("cxe") {
							// 			case "img":
							// 				return (
							// 					<MediaMsg
							// 						key={msg._id}
							// 						msg={msg}
							// 					/>
							// 				);
							// 			case "doc":
							// 				break;
							// 			case "link":
							// 				return (
							// 					<LinkMsg
							// 						key={msg._id}
							// 						msg={msg}
							// 					/>
							// 				);
							// 			case "reply":
							// 				return (
							// 					<ReplyMsg
							// 						key={msg._id}
							// 						msg={msg}
							// 					/>
							// 				);
							// 			default:
							return (
								<TextMsg
									key={msg._id}
									msg={msg}
									ref={index === chatlog.length - 1 ? lastMessageRef : null}
								/>
							);
							// 	}
							// 	break;
							// default:
							// 	break;
							// }
					  })}
			</Stack>
		</Box>
	);
};

export default Conversation;
