import { useEffect, useState } from "react";
import {
	Avatar,
	Badge,
	Box,
	IconButton,
	Stack,
	styled,
	Typography,
} from "@mui/material";
import config from "../../../config";
import { useParams } from "react-router-dom";
import { getUserData } from "../../../local";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
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

const Header = () => {
	const [chats, setChats] = useState([]);
	const { chatId } = useParams();
	useEffect(() => {
		fetchChats();

		// console.log(chats[0]);
		// console.log(chats[0].chatName);
	}, [chatId]);

	const fetchChats = async () => {
		try {
			const { data } = await config.get(`/api/cht/${chatId}`);
			// console.log(data);
			setChats(data);
		} catch (error) {
			console.error(error);
		}
	};
	const checkUser = () => {
		try {
			return chats[0]?.users[0]._id == getUserData()._id
				? chats[0]?.users[1]
				: chats[0]?.users[0];
		} catch (error) {
			console.error(error);
		}
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
				>
					<Box>
						<StyledBadge
							overlap="circular"
							anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
							variant="dot"
						>
							<Avatar
								alt={chats[0]?.chatName || checkUser()?.name}
								src={
									(chats[0]?.isCluster && chats[0]?.icon) || checkUser()?.pic
								}
							></Avatar>
						</StyledBadge>
					</Box>
					<Stack spacing={0.2}>
						<Typography variant="subtitle">
							{chats[0]?.chatName.localeCompare("sender")
								? chats[0]?.chatName
								: checkUser()?.name}
						</Typography>
						<Typography variant="caption">Online</Typography>
					</Stack>
				</Stack>
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
