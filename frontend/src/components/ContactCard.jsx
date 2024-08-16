const ContactCard = ({ chatDetails }) => {
	return (
		<>
			<div className="flex items-center">
				<div className="m-2 rounded-full">
					<img
						src={chatDetails?.pic || chatDetails?.icon}
						className="size-[3rem] rounded-full"
					></img>
				</div>
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
