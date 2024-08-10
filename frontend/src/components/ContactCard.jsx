import React from "react";
import { faker } from "@faker-js/faker";

const ContactCard = ({ chatname }) => {
	return (
		<>
			<div className="flex items-center">
				<div className="m-2 rounded-full">
					<img
						src={faker.image.avatar()}
						className="size-[3rem] rounded-full"
					></img>
				</div>
				<div>
					<strong className="ml-1 text-xl">{chatname}</strong>
				</div>
			</div>
		</>
	);
};

export default ContactCard;
