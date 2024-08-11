import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { getUserData } from "../../../local";

const LinkMsg = ({ el }) => {
	return (
		<Stack
			direction="row"
			justifyContent={el.incoming ? "start" : "end"}
		>
			<Box
				p={0.5}
				sx={{
					backgroundColor: el.incoming ? "#45a29e" : "#454545",
					borderRadius: 1.5,
					width: "max-content",
				}}
			>
				<Stack spacing={2}>
					<Stack
						spacing={1}
						alignItems="start"
						sx={{ backgroundColor: "#45a29e", borderRadius: 1 }}
					>
						<img
							src={el.preview}
							alt={el.message}
							style={{ maxHeight: 210, borderRadius: "10px" }}
						></img>
						<Stack spacing={1}>
							<Typography
								variant="subtitle2"
								color="#000"
							>
								Title
							</Typography>
							<Typography
								variant="subtitle2"
								component={Link}
								to="//https//:www.youtube.com"
							>
								www.youtube.com
							</Typography>
						</Stack>
						<Typography
							variant="body2"
							color="#000"
						>
							{el.message}
						</Typography>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
};

const ReplyMsg = ({ el }) => {
	return (
		<Stack
			direction="row"
			justifyContent={el.incoming ? "start" : "end"}
		>
			<Box
				p={0.5}
				sx={{
					backgroundColor: el.incoming ? "#45a29e" : "#454545",
					borderRadius: 1.5,
					width: "max-content",
				}}
			>
				<Stack spacing={2}>
					<Stack
						p={2}
						direction="column"
						spacing={3}
						alignItems="center"
						sx={{ backgroundColor: "#45a29e", borderRadius: 1 }}
					>
						<Typography
							variant="body2"
							color={el.incoming ? "#fff" : "#000"}
						>
							{el.message}
						</Typography>
					</Stack>
					<Typography variant="body2">{el.reply}</Typography>
				</Stack>
			</Box>
		</Stack>
	);
};

const MediaMsg = ({ el }) => {
	return (
		<Stack
			direction="row"
			justifyContent={el.incoming ? "start" : "end"}
		>
			<Box
				p={0.5}
				sx={{
					backgroundColor: el.incoming ? "#45a29e" : "#454545",
					borderRadius: 1.5,
					width: "max-content",
				}}
			>
				<Stack spacing={1}>
					<img
						src={el.img}
						alt={el.message}
						style={{ maxHeight: 210, borderRadius: "10px" }}
					></img>
					<Typography
						variant="body2"
						color={el.incoming ? "#000" : "#fff"}
					>
						{el.message}
					</Typography>
				</Stack>
			</Box>
		</Stack>
	);
};

const TextMsg = ({ el }) => {
	return (
		<Stack
			direction="row"
			justifyContent={el.sender._id !== getUserData()._id ? "start" : "end"}
		>
			<Box
				p={1.5}
				sx={{
					backgroundColor:
						el.sender._id !== getUserData()._id ? "#45a29e" : "#454545",
					borderRadius: 1.5,
					width: "max-content",
				}}
			>
				<Typography
					variant="body2"
					color={el.sender._id !== getUserData()._id ? "#000" : "#fff"}
				>
					{el.content}
				</Typography>
			</Box>
		</Stack>
	);
};

const TimeLine = ({ el }) => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			justifyContent="space-between"
		>
			<Divider width="46%" />
			<Typography variant="caption">{el.text}</Typography>
			<Divider width="46%" />
		</Stack>
	);
};

export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg };
