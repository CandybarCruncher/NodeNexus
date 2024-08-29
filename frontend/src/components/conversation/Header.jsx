import { useContext, useEffect, useState } from "react";
import {
	Avatar,
	Badge,
	Box,
	IconButton,
	Modal,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import { getUserData } from "../../../local";
import { IsTypingContext, NodeContext, TypingContext } from "./ChatContext";
import UserCard from "../profile/UserCard";
import { socket } from "./Chats";
import { useParams } from "react-router-dom";

const Header = () => {
	const StyledBadge = styled(Badge)(({ theme }) => ({
		"& .MuiBadge-badge": {
			backgroundColor: online ? "#44b700" : "red",
			color: online ? "#44b700" : "red",
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			"&::after": {
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				borderRadius: "50%",
				animation: "ripple 1.2s infinite ease-in-out",
				border: "1px solid currentColor",
				content: '""',
			},
		},
		"@keyframes ripple": {
			"0%": {
				transform: "scale(.8)",
				opacity: 1,
			},
			"100%": {
				transform: "scale(2.4)",
				opacity: 0,
			},
		},
	}));

	const [node, setNode] = useContext(NodeContext);
	const [typing, setTyping] = useContext(TypingContext); //self
	const [isTyping, setIsTyping] = useContext(IsTypingContext); //other
	const [online, setOnline] = useState(false);
	const [userCard, setUserCard] = useState(false);
	const { nodeId } = useParams();
	const checkUser = () => {
		try {
			return node[0]?.users[0]._id == getUserData()._id
				? node[0]?.users[1]
				: node[0]?.users[0];
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		socket.emit("checkRoom", checkUser()?._id, (exists) => {
			if (exists) {
				setOnline(true);
				// console.log("Room exists!");
			} else {
				setOnline(false);
				// console.log("Room does not exist.");
			}
		});
		socket.on("typing", () => {
			setIsTyping(true);
		});
		socket.on("stop typing", () => {
			setIsTyping(false);
		});
	});

	const showUserCard = () => {
		setUserCard(true);
	};

	return (
		<Box
			p={2}
			sx={{
				width: "100%",
				backgroundColor: "#1F2833",
				borderTopRightRadius: "15px",
				borderTopLeftRadius: "15px",
			}}
		>
			<Stack
				alignItems={"center"}
				direction={"row"}
				justifyContent={"space-between"}
				sx={{ height: "100%", width: "100%" }}
			>
				<Stack
					direction={"row"}
					spacing={2}
					onClick={showUserCard}
					sx={{
						":hover": {
							cursor: "pointer",
						},
					}}
				>
					<Box>
						{node[0]?.isCluster ? (
							<Avatar
								alt={node[0]?.chatName || checkUser()?.name}
								src={(node[0]?.isCluster && node[0]?.icon) || checkUser()?.pic}
							></Avatar>
						) : (
							<StyledBadge
								overlap="circular"
								anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
								variant="dot"
							>
								<Avatar
									alt={node[0]?.chatName || checkUser()?.name}
									src={
										(node[0]?.isCluster && node[0]?.icon) || checkUser()?.pic
									}
								></Avatar>
							</StyledBadge>
						)}
					</Box>
					<Stack spacing={0.2}>
						<Typography variant="subtitle">
							{node[0]?.chatName.localeCompare("sender")
								? node[0]?.chatName
								: checkUser()?.name}
						</Typography>
						{node[0]?.isCluster ? null : (
							<Typography variant="caption">
								{!typing && isTyping && online ? <div>typing...</div> : <></>}
							</Typography>
						)}
					</Stack>
				</Stack>
				{userCard && (
					<UserCard
						userCard={userCard}
						setUserCard={setUserCard}
						checkUser={checkUser}
						chats={node}
					/>
				)}
				<Stack
					direction={"row"}
					spacing={3}
				>
					<IconButton>
						<i className="fa-solid fa-video"></i>
					</IconButton>
					<IconButton>
						<i className="fa-solid fa-phone"></i>
					</IconButton>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Header;
