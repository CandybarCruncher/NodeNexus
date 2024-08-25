import { Avatar, Box, Button, Chip, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RemoveBtn from "./RemoveBtn";

const AddtoCluster = ({ chats, setShowClusterMember }) => {
	const [showList, setShowList] = useState(false);

	const openNodesList = () => {
		setShowList(true);
		setShowClusterMember(false);
	};
	return (
		<>
			<Button
				variant="outlined"
				sx={{
					width: "auto",
					borderRadius: 2,
					color: "#45a29e",
					fontWeight: "bold",
					height: "2rem",
				}}
				onClick={openNodesList}
			>
				<PersonAddIcon />
				Add member
			</Button>
			{showList && (
				<Stack
					direction="column"
					spacing={1}
					sx={{ mt: 2 }}
				>
					<Box
						border={1}
						borderRadius={2}
						width={"24rem"}
						height="11.11em"
						sx={{
							overflowY: "auto",
							scrollbarWidth: "thin",
							scrollbarColor: "#fff #000",
						}}
					>
						{chats[0].users.map((user) => (
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
								key={user._id}
								p={1}
							>
								<Stack
									direction="row"
									alignItems="center"
								>
									<Avatar src={user.pic} />
									<Typography
										fontWeight={600}
										variant="h6"
										ml={2}
									>
										{user.name}
									</Typography>
								</Stack>
								<Button
									variant="outlined"
									sx={{
										width: "auto",
										borderRadius: 2,
										color: "#45a29e",
										fontWeight: "bold",
										height: "2rem",
									}}
									onClick={openNodesList}
								>
									Add
								</Button>
							</Stack>
						))}
					</Box>
				</Stack>
			)}
		</>
	);
};

export default AddtoCluster;
