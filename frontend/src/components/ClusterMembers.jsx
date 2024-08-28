import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import RemoveBtn from "./buttons/RemoveBtn";
import AddtoCluster from "./buttons/AddtoCluster";

const ClusterMembers = ({ chats }) => {
	const [showClusterMember, setShowClusterMember] = useState(true);
	return (
		<>
			{chats[0]?.isCluster && (
				<Stack
					direction="column"
					spacing={1}
					sx={{ mt: 2 }}
				>
					<AddtoCluster
						chats={chats}
						setShowClusterMember={setShowClusterMember}
					/>
					{showClusterMember && (
						<>
							<Divider>Cluster members</Divider>
							<Box
								border={1}
								borderRadius={2}
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
										<RemoveBtn
											placeholder={"Remove"}
											chatId={chats[0]._id}
											userId={user._id}
										/>
									</Stack>
								))}
							</Box>
						</>
					)}
				</Stack>
			)}
		</>
	);
};

export default ClusterMembers;
