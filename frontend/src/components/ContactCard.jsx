const ContactCard = ({ chatDetails }) => {
	return (
		<>
			<div className="flex items-center">
				<div className="m-2 rounded-full">
					<img
						src={chatDetails?.pic}
						className="size-[3rem] rounded-full"
					></img>
				</div>
				<div>
					<strong className="ml-1 text-xl">{chatDetails?.name}</strong>
				</div>
			</div>
		</>
	);
};

export default ContactCard;
