import {
	Box,
	IconButton,
	InputAdornment,
	Stack,
	styled,
	TextField,
} from "@mui/material";
import React from "react";

const StyledInput = styled(TextField)(({ theme }) => ({
	"& .MuiInputBase-input": {
		paddingTop: "12px",
		paddingBottom: "12px",
		color: theme.palette.background.paper,
	},
}));

const Footer = () => {
	return (
		<Box
			p={2}
			sx={{
				width: "100%",
				backgroundColor: "#1F2833",
				boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
			}}
		>
			<Stack
				direction="row"
				alignItems={"center"}
				spacing={2}
			>
				<StyledInput
					fullWidth
					placeholder="Write a message..."
					variant="filled"
					InputProps={{
						disableUnderline: true,
						startAdornment: (
							<IconButton>
								<i className="fa-solid fa-link"></i>
							</IconButton>
						),
						endAdornment: (
							<IconButton>
								<i className="fa-regular fa-face-smile"></i>
							</IconButton>
						),
					}}
				/>
				<Box
					sx={{
						height: 45,
						width: 45,
						backgroundColor: "#45a29e",
						borderRadius: 1.5,
					}}
				>
					<Stack
						sx={{ height: "100%", width: "100%" }}
						alignItems="center"
						justifyContent="center"
					>
						<IconButton>
							<i className="fa-solid fa-paper-plane"></i>
						</IconButton>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
};

export default Footer;
