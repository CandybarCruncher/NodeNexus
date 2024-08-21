import { Avatar } from "@mui/material";

const ContactCard = ({ chatDetails }) => {
	return (
		<>
			<div className="flex items-center p-1">
				<Avatar
					sx={{ width: 56, height: 56 }}
					src={chatDetails?.pic || chatDetails?.icon}
				></Avatar>
				<div className="truncate">
					<strong className="ml-5 text-xl">
						{chatDetails?.name || chatDetails?.chatName}
					</strong>
				</div>
			</div>
		</>
	);
};

export default ContactCard;
